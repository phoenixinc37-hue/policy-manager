"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";

const recordsDir = path.join(process.cwd(), "data", "imports");

export async function uploadImportAction(formData: FormData) {
  const file = formData.get("file");

  if (!file || typeof file !== "object" || !("name" in file) || !("size" in file)) {
    throw new Error("Please choose a file to upload.");
  }

  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const originalName = String(file.name || "uploaded-file");
  const ext = path.extname(originalName).toLowerCase();
  const size = Number(file.size || 0);

  if (size === 0) {
    throw new Error("Please choose a file to upload.");
  }

  if (!allowedExtensions.includes(ext)) {
    throw new Error("Only PDF, DOC, and DOCX files are allowed.");
  }

  await mkdir(recordsDir, { recursive: true });

  const id = randomUUID();
  const titleGuess = originalName.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim();

  const record = {
    id,
    originalName,
    storedName: null,
    storedPath: null,
    size,
    uploadedAt: new Date().toISOString(),
    status: "Imported / Needs Review",
    title: titleGuess || "Imported document",
    documentType: "Policy",
    team: "Unassigned",
    effectiveDate: "",
    importMode: "metadata-only-stage1",
  };

  await writeFile(path.join(recordsDir, `${id}.json`), JSON.stringify(record, null, 2));

  redirect(`/import-existing/review?id=${id}`);
}
