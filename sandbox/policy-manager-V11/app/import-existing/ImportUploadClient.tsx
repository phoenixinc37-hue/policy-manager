"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ImportUploadClient() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setError("");

        const form = event.currentTarget;
        const input = form.elements.namedItem("file") as HTMLInputElement | null;
        const file = input?.files?.[0];

        if (!file) {
          setError("Please choose a file to upload.");
          return;
        }

        const allowedExtensions = [".pdf", ".doc", ".docx"];
        const lowerName = file.name.toLowerCase();
        const matched = allowedExtensions.some((ext) => lowerName.endsWith(ext));

        if (!matched) {
          setError("Only PDF, DOC, and DOCX files are allowed.");
          return;
        }

        setIsSubmitting(true);

        const titleGuess = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim() || "Imported document";
        const payload = {
          originalName: file.name,
          size: file.size,
          title: titleGuess,
          documentType: "Policy",
          team: "Unassigned",
          effectiveDate: "",
          status: "Imported / Needs Review",
          importMode: "client-stage1",
        };

        sessionStorage.setItem("policy-manager-import-record", JSON.stringify(payload));
        router.push("/import-existing/review?client=1");
      }}
      style={{ display: "grid", gap: 14 }}
    >
      <label style={uploadZone}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Choose a policy file</div>
        <div style={{ fontSize: 13, color: "#60766b", marginBottom: 14 }}>Accepted file types: PDF, DOC, DOCX</div>
        <input name="file" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style={{ width: "100%" }} />
      </label>
      {error ? <div style={{ color: "#9f1239", fontSize: 13, fontWeight: 700 }}>{error}</div> : null}
      <div>
        <button type="submit" style={whiteActionButton} disabled={isSubmitting}>{isSubmitting ? "Opening review..." : "Upload and review"}</button>
      </div>
    </form>
  );
}

const uploadZone = {
  border: "2px dashed #cfe1d2",
  borderRadius: 16,
  padding: 28,
  background: "#ffffff",
  textAlign: "center" as const,
};

const whiteActionButton = {
  background: "#ffffff",
  color: "#10221a",
  padding: "10px 14px",
  borderRadius: 10,
  fontWeight: 700,
  border: "1px solid #dbe7de",
  cursor: "pointer",
};
