import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("pdf") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Keine Datei" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    return NextResponse.json({ error: "GitHub nicht konfiguriert" }, { status: 500 });
  }

  const filePath = "public/speisekarte.pdf";
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

  // Check if file already exists to get SHA
  const currentFile = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  let sha: string | undefined;
  if (currentFile.ok) {
    const data = await currentFile.json();
    sha = data.sha;
  }

  const bytes = await file.arrayBuffer();
  const content = Buffer.from(bytes).toString("base64");

  const commitRes = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "chore: update speisekarte PDF via admin",
      content,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!commitRes.ok) {
    const err = await commitRes.json();
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
