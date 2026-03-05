import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "1";
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settingsData = await import("@/data/settings.json");
  return NextResponse.json(settingsData.default);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settingsData = await req.json();

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    return NextResponse.json({ error: "GitHub nicht konfiguriert" }, { status: 500 });
  }

  const filePath = "src/data/settings.json";
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  const currentFile = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!currentFile.ok) {
    return NextResponse.json({ error: "Datei nicht gefunden" }, { status: 500 });
  }

  const { sha } = await currentFile.json();
  const content = Buffer.from(JSON.stringify(settingsData, null, 2)).toString("base64");

  const commitRes = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "chore: update settings via admin",
      content,
      sha,
    }),
  });

  if (!commitRes.ok) {
    const err = await commitRes.json();
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
