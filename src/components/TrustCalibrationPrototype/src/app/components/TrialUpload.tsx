import { useState } from "react";
import { Upload, FileText, ChevronRight, ChevronLeft, X } from "lucide-react";

interface TrialUploadProps {
  onNext: (files: string[]) => void;
  onBack: () => void;
}

const DOCUMENT_TYPES = [
  { label: "Business credit report", example: "D&B, Experian Business, or Equifax Business" },
  { label: "Business license or registration", example: "State-issued license or articles of incorporation" },
  { label: "Bank statements", example: "3–6 months of business checking statements" },
  { label: "Financial statements", example: "P&L, balance sheet, or tax returns" },
  { label: "Trade references", example: "Letters or reports from existing vendors or suppliers" },
];

export function TrialUpload({ onNext, onBack }: TrialUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const addFiles = (names: string[]) =>
    setFiles((prev) => [...new Set([...prev, ...names])]);

  const removeFile = (name: string) =>
    setFiles((prev) => prev.filter((f) => f !== name));

  const handleClick = () => {
    const el = document.createElement("input");
    el.type = "file";
    el.multiple = true;
    el.accept = ".pdf,.docx,.xlsx,.png,.jpg";
    el.onchange = (e) => {
      const names = Array.from((e.target as HTMLInputElement).files || []).map(
        (f) => f.name
      );
      addFiles(names);
    };
    el.click();
  };

  const DEMO_FILES = [
    "Greenfield_Bistro_Business_Credit_Report.pdf",
    "Greenfield_Bistro_Business_License_2024.pdf",
    "Greenfield_Bistro_Bank_Statements_Q3_2024.pdf",
  ];

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-10 py-8">
        {/* Agent message */}
        <div
          className="mb-8 p-4 rounded-md"
          style={{ backgroundColor: "#F0FAF6", borderLeft: "3px solid #1D9E75" }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{ backgroundColor: "#1D9E75" }}
            >
              <span className="text-white" style={{ fontSize: 9, fontWeight: 600 }}>N</span>
            </div>
            <span className="text-xs uppercase tracking-wider" style={{ color: "#1D9E75", fontWeight: 600 }}>
              North
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Let's run a trial before I touch any live applications. Give me
            the documents from a past case you already know the outcome of —
            I'll assess the applicant and you can check whether my reasoning
            matches what you would have decided.
          </p>
        </div>

        <div style={{ maxWidth: 540 }}>
          <h2 className="text-base text-gray-900 mb-1" style={{ fontWeight: 500 }}>
            Upload documents for a past application
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            I'll review the documents you provide and assess whether the
            applicant's business is a safe fit for equipment lending. Upload
            as many document types as are available.
          </p>

          {/* Document type guide */}
          <div
            className="rounded-md p-4 mb-6"
            style={{ backgroundColor: "#FAFAFA", border: "1px solid #E5E7EB" }}
          >
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-3" style={{ fontWeight: 600 }}>
              Documents I can work with
            </p>
            <div className="space-y-2">
              {DOCUMENT_TYPES.map((doc) => (
                <div key={doc.label} className="flex items-start gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: "#1D9E75" }}
                  />
                  <div>
                    <span className="text-sm text-gray-700" style={{ fontWeight: 500 }}>
                      {doc.label}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">{doc.example}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload zone */}
          <div
            className="rounded-md p-7 flex flex-col items-center text-center cursor-pointer transition-colors mb-4"
            style={{
              border: `1.5px dashed ${dragging ? "#1D9E75" : "#d1d5db"}`,
              backgroundColor: dragging ? "#F0FAF6" : "transparent",
            }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(Array.from(e.dataTransfer.files).map((f) => f.name));
            }}
            onClick={handleClick}
          >
            <Upload size={18} className="text-gray-400 mb-2" />
            <p className="text-sm text-gray-600" style={{ fontWeight: 500 }}>
              Drop documents here or{" "}
              <span style={{ color: "#1D9E75" }}>browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PDF, DOCX, XLSX · Multiple files supported
            </p>
          </div>

          {/* Uploaded files */}
          {files.length > 0 && (
            <div className="space-y-1.5 mb-5">
              {files.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 px-3 py-2 rounded border border-gray-200 bg-white"
                >
                  <FileText size={13} className="text-gray-400 shrink-0" />
                  <span className="text-xs text-gray-600 flex-1">{f}</span>
                  <button
                    onClick={() => removeFile(f)}
                    className="text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Demo shortcut */}
          <p className="text-xs text-gray-400 mb-7">
            No past case on hand?{" "}
            <button
              onClick={() => addFiles(DEMO_FILES)}
              className="underline hover:text-gray-600 transition-colors"
            >
              Use a sample application instead
            </button>
          </p>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={14} />
              Back
            </button>
            <button
              onClick={() => onNext(files.length > 0 ? files : DEMO_FILES)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm"
              style={{ backgroundColor: "#1D9E75", color: "#fff", fontWeight: 500 }}
            >
              Run trial assessment
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className="w-72 shrink-0 border-l border-gray-200 overflow-y-auto px-6 py-7"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-4" style={{ fontWeight: 600 }}>
          Why a trial run?
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          A trial lets you verify my reasoning on a case you already know the
          answer to. You'll see exactly what I'd flag and why — before I touch
          any real applications.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          More documents give me more signal. A credit report plus bank
          statements gives a much more reliable assessment than either alone.
        </p>
        <div className="border-t border-gray-200 pt-5 mt-6">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3" style={{ fontWeight: 600 }}>
            Phase 2 — Trial run
          </p>
          <p className="text-xs text-gray-400">
            Context ·{" "}
            <span style={{ color: "#1D9E75", fontWeight: 500 }}>Trial run</span>{" "}
            · Analysis
          </p>
        </div>
      </div>
    </div>
  );
}
