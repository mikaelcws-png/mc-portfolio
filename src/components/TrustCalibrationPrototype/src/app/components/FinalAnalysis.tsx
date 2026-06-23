import { AlertCircle, AlertTriangle, CheckCircle2, FileText, Download } from "lucide-react";
import type { ContextData } from "../types";

interface FinalAnalysisProps {
  files: string[];
  context?: ContextData;
}

type Risk = "high" | "medium" | "low";

interface DocumentSection {
  docType: string;
  findings: { label: string; value: string; risk: Risk; detail: string }[];
}

const DOCUMENTS: DocumentSection[] = [
  {
    docType: "Business Credit Report — Experian Business",
    findings: [
      {
        label: "Business credit score",
        value: "42 / 100",
        risk: "high",
        detail:
          "Score of 42 is significantly below the preferred threshold of 80. Scores below 50 indicate a pattern of late or missed payments and materially elevate non-payment risk.",
      },
      {
        label: "Payment history",
        value: "5 late payments, 1 sent to collections (past 18 months)",
        risk: "high",
        detail:
          "Five late payments and one account sent to collections within the past 18 months. This is a strong indicator of payment unreliability and directly raises equipment recovery risk.",
      },
      {
        label: "Outstanding derogatory marks",
        value: "1 collection, $1,840 unresolved",
        risk: "high",
        detail:
          "An unresolved collection of $1,840 is on file. Active collections are disqualifying under Deli Rentals' standard lending criteria.",
      },
    ],
  },
  {
    docType: "Business License — Province of Ontario",
    findings: [
      {
        label: "License status",
        value: "Active",
        risk: "low",
        detail:
          "Business license is current and valid through June 2025. The business is legally registered to operate in Ontario.",
      },
      {
        label: "Business age",
        value: "8 months",
        risk: "high",
        detail:
          "Business was incorporated 8 months ago and does not meet the 2-year minimum operating history required for equipment lending. Newer businesses represent significantly higher risk of closure before the rental period ends.",
      },
      {
        label: "Business type",
        value: "LLC — Food service",
        risk: "low",
        detail: "Registered food service LLC with a fixed physical address on file.",
      },
    ],
  },
  {
    docType: "Bank Statements — Q3 2024 (3 months)",
    findings: [
      {
        label: "Average monthly balance",
        value: "$3,200",
        risk: "high",
        detail:
          "Average ending balance of $3,200 is well below the recommended $10,000 minimum for equipment valued at $18,000. The balance does not provide adequate buffer for rental obligations.",
      },
      {
        label: "Monthly revenue trend",
        value: "Declining — $18,400 → $11,200 → $9,600",
        risk: "high",
        detail:
          "Revenue has declined 48% over the three-month period. A consistent downward trend at this pace raises serious concerns about the business's ability to sustain payment obligations.",
      },
      {
        label: "Overdraft incidents",
        value: "4 in 3 months",
        risk: "high",
        detail:
          "Four overdraft events across July–September indicate chronic cash flow insufficiency, not isolated incidents.",
      },
    ],
  },
  {
    docType: "Financial Statements — FY 2023",
    findings: [
      {
        label: "Net profit / loss",
        value: "Net loss of $14,600",
        risk: "high",
        detail:
          "The business operated at a net loss of $14,600 in its most recent full fiscal year. Lending equipment to a loss-making business with declining revenue materially increases non-payment risk.",
      },
      {
        label: "Total liabilities vs. assets",
        value: "Liabilities exceed assets by $8,200",
        risk: "high",
        detail:
          "Negative net equity indicates the business owes more than it owns. This significantly reduces the likelihood of recovering losses in a default scenario.",
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

function DocSection({ doc }: { doc: DocumentSection }) {
  return (
    <div className="rounded-md overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <FileText size={14} className="text-gray-400 shrink-0" />
        <p className="text-sm text-gray-700" style={{ fontWeight: 500 }}>
          {doc.docType}
        </p>
      </div>
      <div className="divide-y divide-gray-100">
        {doc.findings.map((f, i) => (
          <div key={i} className="px-4 py-3 flex items-start gap-3">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1" style={{ fontWeight: 600 }}>
                {f.label}
              </p>
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
    </div>
  );
}

export function FinalAnalysis({ files, context }: FinalAnalysisProps) {
  const allFindings = DOCUMENTS.flatMap((d) => d.findings);
  const highCount = allFindings.filter((f) => f.risk === "high").length;
  const docName = files[0] ?? "Harbor_Kitchen_Business_Credit_Report.pdf";
  const applicantName = "Harbor Kitchen LLC";

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-10 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1" style={{ fontWeight: 600 }}>
              Assessment complete
            </p>
            <h2 className="text-gray-900" style={{ fontSize: 20, fontWeight: 500 }}>
              {applicantName}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {DOCUMENTS.length} documents reviewed ·{" "}
              {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <Download size={13} />
            Export
          </button>
        </div>

        {/* Verdict banner */}
        <div
          className="flex items-center justify-between p-4 rounded-md mb-8"
          style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}
        >
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5" style={{ fontWeight: 600 }}>
              Assessment
            </p>
            <p className="text-base text-gray-900" style={{ fontWeight: 500 }}>
              Do not approve
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {highCount} high-risk findings across {DOCUMENTS.length} documents — multiple disqualifying factors present
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs shrink-0 ml-4"
            style={{ backgroundColor: "#FEE2E2", color: "#EF4444", fontWeight: 500 }}
          >
            <AlertCircle size={12} />
            Decline
          </div>
        </div>

        {/* Document-by-document findings */}
        <div style={{ maxWidth: 640 }}>
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-4" style={{ fontWeight: 600 }}>
            Findings by document — {allFindings.length} data points
          </p>

          <div className="space-y-4 mb-8">
            {DOCUMENTS.map((doc) => (
              <DocSection key={doc.docType} doc={doc} />
            ))}
          </div>

          {/* Summary */}
          <div
            className="p-5 rounded-md mb-6"
            style={{ backgroundColor: "#FAFAFA", border: "1px solid #E5E7EB" }}
          >
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-3" style={{ fontWeight: 600 }}>
              Summary
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              This application does not meet the minimum criteria for equipment
              lending. The applicant has an active collection on their credit
              file, a business operating history of under one year, rapidly
              declining revenue, negative net equity, and a monthly cash balance
              that does not cover the value of the equipment at risk.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Any one of these factors would warrant additional scrutiny. The
              presence of all five represents unacceptable exposure for Deli
              Rentals.
            </p>
          </div>

          {/* Recommended action */}
          <div
            className="p-4 rounded-md mb-4"
            style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}
          >
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2" style={{ fontWeight: 600 }}>
              Recommended action
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Decline this application. If the applicant wishes to reapply,
              they should resolve the outstanding collection, demonstrate 12+
              months of positive operating history, and provide updated
              financials showing net positive cash flow.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-5">
            <CheckCircle2 size={14} style={{ color: "#1D9E75" }} />
            <p className="text-xs text-gray-500">
              Assessment complete. This output is for your internal review only.
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className="w-72 shrink-0 border-l border-gray-200 overflow-y-auto px-6 py-7"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-4" style={{ fontWeight: 600 }}>
          Assessment complete
        </p>
        <div className="flex items-center gap-2 mb-5">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs"
            style={{ backgroundColor: "#FEE2E2", color: "#EF4444", fontWeight: 500 }}
          >
            <AlertCircle size={11} />
            Decline
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1" style={{ fontWeight: 600 }}>
              Applicant
            </p>
            <p className="text-sm text-gray-700">{applicantName}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1" style={{ fontWeight: 600 }}>
              Documents reviewed
            </p>
            <p className="text-sm text-gray-700">{DOCUMENTS.length}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1" style={{ fontWeight: 600 }}>
              High-risk findings
            </p>
            <p className="text-sm text-gray-700">{highCount} of {allFindings.length} data points</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1" style={{ fontWeight: 600 }}>
              Disqualifying factors
            </p>
            <div className="space-y-1.5 mt-1">
              {[
                "Active collection on credit file",
                "Under 1 year operating history",
                "Declining revenue trend",
                "Negative net equity",
              ].map((item) => (
                <div key={item} className="flex items-start gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <p className="text-sm text-gray-500 leading-relaxed">
            To run another application, go back and upload new documents.
            Your calibration carries over.
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
