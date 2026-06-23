import { useState } from "react";
import { Upload, FileText, ChevronRight, ChevronLeft, CheckCircle2, X } from "lucide-react";

interface ActualCaseUploadProps {
  onNext: (files: string[]) => void;
  onBack: () => void;
}

export function ActualCaseUpload({ onNext, onBack }: ActualCaseUploadProps) {
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
    "Harbor_Kitchen_Business_Credit_Report.pdf",
    "Harbor_Kitchen_Business_License_2024.pdf",
    "Harbor_Kitchen_Bank_Statements_Q3_2024.pdf",
    "Harbor_Kitchen_Financial_Statements_2023.pdf",
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
            The trial run checks out. Now give me the application you're
            actually working on. Upload whatever documents the applicant has
            submitted — I'll work with what's available and flag what's missing.
          </p>
        </div>

        <div style={{ maxWidth: 520 }}>
          {/* Trial confirmed */}
          <div
            className="flex items-center gap-2 mb-6 px-3 py-2 rounded-md"
            style={{ backgroundColor: "#F0FAF6", border: "1px solid #C3E9D9" }}
          >
            <CheckCircle2 size={14} style={{ color: "#1D9E75" }} />
            <p className="text-xs text-gray-600">
              Trial verified — ready for a live application
            </p>
          </div>

          <h2 className="text-base text-gray-900 mb-1" style={{ fontWeight: 500 }}>
            Upload the applicant's documents
          </h2>
          <p className="text-sm text-gray-500 mb-7 leading-relaxed">
            Upload the business documents submitted for this equipment rental
            application. More documents means a more complete assessment.
          </p>

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
              Credit report, license, bank statements, financial statements
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

          <p className="text-xs text-gray-400 mb-7">
            No documents on hand?{" "}
            <button
              onClick={() => addFiles(DEMO_FILES)}
              className="underline hover:text-gray-600 transition-colors"
            >
              Use a sample application for this demo
            </button>
          </p>

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
              Begin assessment
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
          What I'll assess
        </p>
        <div className="space-y-2.5 mb-6">
          {[
            "Business legitimacy and license status",
            "Credit history and payment reliability",
            "Financial stability and cash flow",
            "Operating history and continuity risk",
            "Equipment return and non-payment risk",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "#1D9E75" }} />
              <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-5">
          <p className="text-sm text-gray-500 leading-relaxed">
            Missing documents will be flagged in the assessment, not silently
            ignored.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-5 mt-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3" style={{ fontWeight: 600 }}>
            Phase 3 — Analysis
          </p>
          <p className="text-xs text-gray-400">
            Context · Trial run ·{" "}
            <span style={{ color: "#1D9E75", fontWeight: 500 }}>Analysis</span>
          </p>
        </div>
      </div>
    </div>
  );
}
