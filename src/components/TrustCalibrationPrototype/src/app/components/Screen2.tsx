import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import type { Authority, ScopeData } from "../types";

interface Screen2Props {
  onNext: (data: ScopeData) => void;
  onBack: () => void;
}

interface TaskRow {
  id: string;
  task: string;
  description: string;
  default: Authority;
}

const TASKS: TaskRow[] = [
  {
    id: "doc-review",
    task: "Reading and summarizing source documents",
    description: "Extracting key fields and producing structured summaries from your inputs.",
    default: "independent",
  },
  {
    id: "gap-id",
    task: "Identifying gaps or missing information",
    description: "Flagging where required content, data, or context is absent.",
    default: "independent",
  },
  {
    id: "cross-ref",
    task: "Cross-referencing across multiple sources",
    description: "Comparing content across documents or datasets to surface inconsistencies.",
    default: "flag",
  },
  {
    id: "patterns",
    task: "Detecting patterns or anomalies",
    description: "Surfacing statistical outliers or recurring issues across a set of inputs.",
    default: "flag",
  },
  {
    id: "drafting",
    task: "Drafting written output",
    description: "Producing findings, summaries, or recommendations for your review.",
    default: "escalate",
  },
  {
    id: "decisions",
    task: "Making a judgment or recommendation",
    description: "Interpreting ambiguous inputs and arriving at a conclusion on your behalf.",
    default: "escalate",
  },
  {
    id: "follow-up",
    task: "Identifying what's needed to proceed",
    description: "Noting gaps that require your action or additional input before I can continue.",
    default: "flag",
  },
];

const OPTIONS: { value: Authority; label: string; description: string }[] = [
  {
    value: "independent",
    label: "Act independently",
    description: "I handle this without prompting you.",
  },
  {
    value: "flag",
    label: "Flag first",
    description: "I surface findings before acting.",
  },
  {
    value: "escalate",
    label: "Always escalate",
    description: "I stop and wait for your direction.",
  },
];

function AuthorityPicker({
  value,
  onChange,
}: {
  value: Authority;
  onChange: (v: Authority) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          title={opt.description}
          className="px-3 py-1.5 rounded text-xs transition-colors"
          style={{
            backgroundColor:
              value === opt.value ? "#1D9E75" : "#F3F4F6",
            color: value === opt.value ? "#fff" : "#6b7280",
            fontWeight: value === opt.value ? 500 : 400,
            border: "none",
            cursor: "pointer",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function Screen2({ onNext, onBack }: Screen2Props) {
  const [authorities, setAuthorities] = useState<Record<string, Authority>>(
    Object.fromEntries(TASKS.map((t) => [t.id, t.default]))
  );

  const setCounts = {
    independent: Object.values(authorities).filter((v) => v === "independent").length,
    flag: Object.values(authorities).filter((v) => v === "flag").length,
    escalate: Object.values(authorities).filter((v) => v === "escalate").length,
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-10 py-8">
        {/* Agent message */}
        <div
          className="mb-8 p-4 rounded-md"
          style={{
            backgroundColor: "#F0FAF6",
            borderLeft: "3px solid #1D9E75",
          }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{ backgroundColor: "#1D9E75" }}
            >
              <span className="text-white" style={{ fontSize: 9, fontWeight: 600 }}>N</span>
            </div>
            <span className="text-xs uppercase tracking-wider" style={{ color: "#1D9E75", fontWeight: 600 }}>North</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            I have your role and what you're trying to complete. Now tell me
            how much I should handle on my own versus check with you first—I
            default to doing less until you say otherwise.
          </p>
        </div>

        <div className="mb-5">
          <h2 className="text-base text-gray-900 mb-1" style={{ fontWeight: 500 }}>
            What am I authorized to do without checking with you?
          </h2>
          <p className="text-sm text-gray-500">
            Set authority level for each task category below.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mb-5 pb-4 border-b border-gray-100">
          {OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    opt.value === "independent"
                      ? "#1D9E75"
                      : opt.value === "flag"
                      ? "#F59E0B"
                      : "#EF4444",
                }}
              />
              <span className="text-xs text-gray-500">{opt.label}</span>
            </div>
          ))}
        </div>

        {/* Task rows */}
        <div className="space-y-1">
          {TASKS.map((task, i) => (
            <div
              key={task.id}
              className="flex items-center justify-between py-3.5 px-4 rounded-md gap-4"
              style={{
                backgroundColor: i % 2 === 0 ? "#FAFAFA" : "#fff",
                border: "1px solid #F3F4F6",
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900" style={{ fontWeight: 500 }}>
                  {task.task}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{task.description}</p>
              </div>
              <div className="shrink-0">
                <AuthorityPicker
                  value={authorities[task.id]}
                  onChange={(v) =>
                    setAuthorities((prev) => ({ ...prev, [task.id]: v }))
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            style={{ fontWeight: 400 }}
          >
            <ChevronLeft size={14} />
            Back
          </button>
          <button
            onClick={() =>
              onNext({
                authorities,
                tasks: TASKS.map((t) => ({
                  id: t.id,
                  task: t.task,
                  authority: authorities[t.id],
                })),
              })
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm transition-opacity"
            style={{
              backgroundColor: "#1D9E75",
              color: "#fff",
              fontWeight: 500,
            }}
          >
            Confirm authority settings
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Right sidebar */}
      <div
        className="w-72 shrink-0 border-l border-gray-200 overflow-y-auto px-6 py-7"
        style={{ backgroundColor: "#FAFAFA" }}
      >
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-4" style={{ fontWeight: 600 }}>
          Current configuration
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1D9E75" }} />
              <span className="text-sm text-gray-600">Act independently</span>
            </div>
            <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>
              {setCounts.independent} tasks
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm text-gray-600">Flag first</span>
            </div>
            <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>
              {setCounts.flag} tasks
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-sm text-gray-600">Always escalate</span>
            </div>
            <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>
              {setCounts.escalate} tasks
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <p className="text-sm text-gray-600 leading-relaxed">
            These settings define my default behavior across the audit. You can
            override individual decisions at any point during a session.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-5 mt-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3" style={{ fontWeight: 600 }}>
            Step 2 of 5
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Context · <span style={{ color: "#1D9E75", fontWeight: 500 }}>Scope</span> · Review · Exceptions · Confirm
          </p>
        </div>
      </div>
    </div>
  );
}
