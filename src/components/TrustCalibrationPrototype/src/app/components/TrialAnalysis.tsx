import { useState } from "react";
import { ChevronRight, ChevronLeft, AlertCircle, AlertTriangle, CheckCircle2, FileText } from "lucide-react";

interface TrialAnalysisProps {
  files: string[];
  onVerified: () => void;
  onBack: () => void;
}

type Risk = "high" | "medium" | "low";

interface DocumentSection {
  filename: string;
  docType: string;
  findings: { label: string; value: string; risk: Risk; detail: string }[];
}

const DOCUMENTS: DocumentSection[] = [
  {
    filename: "Greenfield_Bistro_Business_Credit_Report.pdf",
    docType: "Business Credit Report — Dun & Bradstreet",
    findings: [
      {
        label: "PAYDEX Score",
        value: "72 / 100",
        risk: "medium",
        detail:
          "Score of 72 indicates occasional late payments. Deli Rentals' preferred threshold is 80+. Applicant is below this but not critically so — suggests moderate payment reliability.",
      },
      {
        label: "Payment history",
        value: "2 late payments in past 12 months",
        risk: "medium",
        detail:
          "Two late payments recorded in the past year. Industry benchmark for low-risk lending is zero or one late payment. Slightly above acceptable range.",
      },
      {
        label: "Outstanding derogatory marks",
        value: "None",
        risk: "low",
        detail: "No collections, liens, or judgments on record. Clean derogatory history.",
      },
    ],
  },
  {
    filename: "Greenfield_Bistro_Business_License_2024.pdf",
    docType: "Business License — Province of Ontario",
    findings: [
      {
        label: "License status",
        value: "Active",
        risk: "low",
        detail: "License is current and valid through December 2025. Business is legally registered to operate.",
      },
      {
        label: "Business age",
        value: "3 years, 4 months",
        risk: "low",
        detail:
          "Established in March 2021. Meets the 2-year minimum operating history requirement for equipment lending.",
      },
      {
        label: "Business type",
        value: "LLC — Food service",
        risk: "low",
        detail: "Registered LLC in food service sector. Physical business with a fixed location.",
      },
    ],
  },
  {
    filename: "Greenfield_Bistro_Bank_Statements_Q3_2024.pdf",
    docType: "Bank Statements — Q3 2024 (3 months)",
    findings: [
      {
        label: "Average monthly balance",
        value: "$8,400",
        risk: "medium",
        detail:
          "Average ending balance across July–September 2024 is $8,400. Recommended minimum for equipment valued at $15,000 is $10,000. Applicant is 16% below the threshold.",
      },
      {
        label: "Monthly revenue trend",
        value: "Stable — avg. $24,600/mo",
        risk: "low",
        detail:
          "Revenue is consistent across the three-month period with no significant drops. $24,600 average monthly inflow indicates operational business activity.",
      },
      {
        label: "Overdraft incidents",
        value: "1 in 3 months",
        risk: "medium",
        detail:
          "One overdraft recorded in August. Isolated incident, but suggests occasional cash flow tightness that could affect payment reliability.",
      },
    ],
  },
];

const RISK_CFG: Record<Risk, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
  high: { color: "#EF4444", bg: "#FEF2F2", icon: <AlertCircle size={12} />, label: "High" },
  medium: { color: "#D97706", bg: "#FFFBEB", icon: <AlertTriangle size={12} />, label: "Medium" },
  low: { color: "#1D9E75", bg: "#F0FAF6", icon: <CheckCircle2 size={12} />, label: "Low" },
};

function RiskBadge({ risk }: { risk: Risk }) {
  const cfg = RISK_CFG[risk];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
      style={{ backgroundColor: cfg.bg, color: cfg.color, fontWeight: 500 }}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function DocSection({ doc, fileProvided }: { doc: DocumentSection; fileProvided: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-md overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        style={{ backgroundColor: "#FAFAFA" }}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2.5">
          <FileText size={14} className="text-gray-400 shrink-0" />
          <div>
            <p className="text-sm text-gray-700" style={{ fontWeight: 500 }}>
              {doc.docType}
            </p>
            <p className="text-xs text-gray-400">{fileProvided ? doc.filename : "Sample document"}</p>
          </div>
        </div>
        <button className="text-xs text-gray-400 shrink-0 ml-4">
          {open ? "Collapse" : "Expand"}
        </button>
      </div>

      {/* Findings */}
      {open && (
        <div className="divide-y divide-gray-100">
          {doc.findings.map((f, i) => (
            <div key={i} className="px-4 py-3 flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                    {f.label}
                  </p>
                </div>
                <p className="text-sm text-gray-900 mb-1" style={{ fontWeight: 500 }}>
                  {f.value}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.detail}</p>
              </div>
              <div className="shrink-0 mt-0.5">
                <RiskBadge risk={f.risk} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function TrialAnalysis({ files, onVerified, onBack }: TrialAnalysisProps) {
  const [verdict, setVerdict] = useState<"yes" | "partly" | null>(null);

  const provided = files.filter((f) => !f.startsWith("[demo]"));
  const allFindings = DOCUMENTS.flatMap((d) => d.findings);
  const highCount = allFindings.filter((f) => f.risk === "high").length;
  const medCount = allFindings.filter((f) => f.risk === "medium").length;

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
            I've reviewed {DOCUMENTS.length} documents for this applicant. Here's
            what I found. Check whether this matches what you already knew about
            this case.
          </p>
        </div>

        {/* Overall verdict */}
        <div
          className="flex items-center justify-between p-4 rounded-md mb-6"
          style={{ backgroundColor: "#FFFBEB", border: "1px solid #FCD34D" }}
        >
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5" style={{ fontWeight: 600 }}>
              Assessment
            </p>
            <p className="text-base text-gray-900" style={{ fontWeight: 500 }}>
              Greenfield Bistro LLC — Conditional approval
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Meets basic requirements; 4 moderate risk factors warrant a security deposit
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded text-xs shrink-0 ml-4"
            style={{ backgroundColor: "#FEF3C7", color: "#D97706", fontWeight: 500 }}
          >
            Conditional
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-3 mb-8" style={{ maxWidth: 620 }}>
          {DOCUMENTS.map((doc) => (
            <DocSection
              key={doc.docType}
              doc={doc}
              fileProvided={provided.some((f) =>
                f.toLowerCase().includes("greenfield")
              )}
            />
          ))}
        </div>

        {/* Recommendation */}
        <div
          className="p-4 rounded-md mb-8"
          style={{ backgroundColor: "#FAFAFA", border: "1px solid #E5E7EB", maxWidth: 620 }}
        >
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2" style={{ fontWeight: 600 }}>
            Recommended action
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Approve with a security deposit of{" "}
            <span style={{ fontWeight: 500 }}>one month's rental fee</span>.
            Business is legitimate and operational, but the PAYDEX score and
            bank balance are below preferred thresholds. A deposit mitigates
            the downside risk without rejecting an otherwise viable applicant.
          </p>
        </div>

        {/* Verdict prompt */}
        <div
          className="p-5 rounded-md mb-6"
          style={{ border: "1.5px solid #E5E7EB", maxWidth: 620 }}
        >
          <p className="text-sm text-gray-900 mb-4" style={{ fontWeight: 500 }}>
            Does this match what you already knew about this case?
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVerdict("yes")}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors"
              style={{
                backgroundColor: verdict === "yes" ? "#1D9E75" : "#F3F4F6",
                color: verdict === "yes" ? "#fff" : "#374151",
                fontWeight: verdict === "yes" ? 500 : 400,
              }}
            >
              {verdict === "yes" && <CheckCircle2 size={14} />}
              Yes, this is right
            </button>
            <button
              onClick={() => setVerdict("partly")}
              className="px-4 py-2 rounded-md text-sm transition-colors"
              style={{
                backgroundColor: verdict === "partly" ? "#FFFBEB" : "#F3F4F6",
                color: verdict === "partly" ? "#D97706" : "#374151",
                fontWeight: verdict === "partly" ? 500 : 400,
              }}
            >
              Mostly — a few things are off
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={14} />
            Back
          </button>
          <button
            onClick={() => verdict && onVerified()}
            disabled={!verdict}
            className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm transition-colors"
            style={{
              backgroundColor: verdict ? "#1D9E75" : "#e5e7eb",
              color: verdict ? "#fff" : "#9ca3af",
              fontWeight: 500,
              cursor: verdict ? "pointer" : "not-allowed",
            }}
          >
            {verdict === "partly" ? "Proceed — I'll adjust as we go" : "Looks right — give me a real case"}
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className="w-72 shrink-0 border-l border-gray-200 overflow-y-auto px-6 py-7"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-4" style={{ fontWeight: 600 }}>
          Trial summary
        </p>
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Documents reviewed</span>
            <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>{DOCUMENTS.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total data points</span>
            <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>{allFindings.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm text-gray-600">Medium risk</span>
            </div>
            <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>{medCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-sm text-gray-600">High risk</span>
            </div>
            <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>{highCount}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-5">
          <p className="text-sm text-gray-500 leading-relaxed">
            If my reasoning looks wrong, go back and try a different document
            set. If it looks right, we're ready for a live application.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-5 mt-5">
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
