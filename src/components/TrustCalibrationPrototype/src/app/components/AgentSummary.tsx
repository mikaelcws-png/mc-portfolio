import { ChevronRight, ChevronLeft, FileText, Target, ShieldCheck } from "lucide-react";
import type { ContextData } from "../types";

interface AgentSummaryProps {
  data: ContextData;
  onNext: () => void;
  onBack: () => void;
}

function AgentTag() {
  return (
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
  );
}

function UnderstandingCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-md"
      style={{ border: "1px solid #E5E7EB", backgroundColor: "#fff" }}
    >
      <div
        className="w-7 h-7 rounded flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: "#F0FAF6" }}
      >
        <span style={{ color: "#1D9E75" }}>{icon}</span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-1" style={{ fontWeight: 600 }}>
          {label}
        </p>
        <p className="text-sm text-gray-800 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

export function AgentSummary({ data, onNext, onBack }: AgentSummaryProps) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-10 py-8">
        {/* Agent message */}
        <div
          className="mb-8 p-4 rounded-md"
          style={{ backgroundColor: "#F0FAF6", borderLeft: "3px solid #1D9E75" }}
        >
          <AgentTag />
          <p className="text-sm text-gray-700 leading-relaxed">
            Got it. Here's what I understood from what you told me, and what
            I'll produce. Confirm this before we run the trial.
          </p>
        </div>

        <div style={{ maxWidth: 560 }}>
          {/* What I understood */}
          <p
            className="text-xs uppercase tracking-wider text-gray-400 mb-4"
            style={{ fontWeight: 600 }}
          >
            What I understood
          </p>
          <div className="space-y-3 mb-8">
            <UnderstandingCard
              icon={<Target size={14} />}
              label="Your task"
              value={data.goal}
            />
            <UnderstandingCard
              icon={<FileText size={14} />}
              label="Documents you'll submit"
              value={data.documents}
            />
            <UnderstandingCard
              icon={<ShieldCheck size={14} />}
              label="Who reviews the output"
              value={data.approvers}
            />
          </div>

          {/* What I'll produce */}
          <p
            className="text-xs uppercase tracking-wider text-gray-400 mb-1"
            style={{ fontWeight: 600 }}
          >
            What I'll produce
          </p>
          <p className="text-xs text-gray-400 mb-4">
            For each application I review, my output will include:
          </p>

          <div
            className="rounded-md p-5 mb-8"
            style={{ border: "1px solid #E5E7EB", backgroundColor: "#fff" }}
          >
            <div className="space-y-4">
              {[
                {
                  n: "1",
                  label: "Trustworthiness assessment",
                  desc: "A clear verdict — Approve, Conditional, or Decline — based on the documents submitted.",
                },
                {
                  n: "2",
                  label: "Risk factors by document",
                  desc: "Each document reviewed separately, with flagged items and their severity (Low / Medium / High).",
                },
                {
                  n: "3",
                  label: "Supporting evidence",
                  desc: "Specific data points from the documents that support each finding — no black-box reasoning.",
                },
                {
                  n: "4",
                  label: "Recommendation",
                  desc: "A recommended next step: approve as-is, approve with deposit, request additional documents, or decline.",
                },
              ].map((item) => (
                <div key={item.n} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "#F0FAF6" }}
                  >
                    <span className="text-xs" style={{ color: "#1D9E75", fontWeight: 600 }}>
                      {item.n}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900" style={{ fontWeight: 500 }}>
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                <span style={{ fontWeight: 500, color: "#374151" }}>
                  What I'm optimizing for:
                </span>{" "}
                protecting Deli Rentals from equipment loss and non-payment,
                while giving legitimate businesses a fair assessment.
              </p>
            </div>
          </div>

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
              onClick={onNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm"
              style={{ backgroundColor: "#1D9E75", color: "#fff", fontWeight: 500 }}
            >
              This looks right — run trial
              <ChevronRight size={15} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Next: I'll analyze a sample application so you can verify my approach before going live.
          </p>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className="w-72 shrink-0 border-l border-gray-200 overflow-y-auto px-6 py-7"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <p
          className="text-xs uppercase tracking-wider text-gray-400 mb-4"
          style={{ fontWeight: 600 }}
        >
          Why confirm first?
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          Before I analyze any real application, you should agree on what
          "good output" looks like. This is that agreement.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          If this doesn't match what you expected, go back and adjust your
          answers. My output format is derived directly from what you told me.
        </p>

        <div className="border-t border-gray-200 pt-5 mt-6">
          <p
            className="text-xs uppercase tracking-wider text-gray-400 mb-3"
            style={{ fontWeight: 600 }}
          >
            Phase 1 — Context
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Context ·{" "}
            <span style={{ color: "#1D9E75", fontWeight: 500 }}>Trial run</span>{" "}
            · Analysis
          </p>
        </div>
      </div>
    </div>
  );
}
