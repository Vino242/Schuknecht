import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const menuData = await import("@/data/tageskarte.json");
  return NextResponse.json(menuData.default);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const menu = await req.json();

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    return NextResponse.json({ error: "GitHub nicht konfiguriert" }, { status: 500 });
  }

  const filePath = "src/data/tageskarte.json";
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
  const content = Buffer.from(JSON.stringify(menu, null, 2)).toString("base64");

  const commitRes = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "chore: update tageskarte via admin",
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
