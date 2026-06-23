import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import type { AnalysisData, AnalysisDepth, OutputFormat } from "../types";

interface Screen4Props {
  onNext: (data: AnalysisData) => void;
  onBack: () => void;
}

const DEPTH_OPTIONS: {
  value: AnalysisDepth;
  label: string;
  description: string;
}[] = [
  {
    value: "quick",
    label: "Quick scan",
    description:
      "Surface only clear, high-confidence deviations. Faster, fewer items flagged.",
  },
  {
    value: "standard",
    label: "Standard",
    description:
      "Flag anything that meaningfully deviates from what's typical. Most issues surfaced.",
  },
  {
    value: "thorough",
    label: "Thorough",
    description:
      "Flag everything worth noting, including low-risk items and edge cases. Most comprehensive.",
  },
];

const FOCUS_AREAS = [
  "Financial terms and payment obligations",
  "Liability and indemnification clauses",
  "Term length and renewal conditions",
  "Termination rights and penalties",
  "Maintenance and responsibility allocation",
  "Compliance and regulatory requirements",
  "Dispute resolution mechanisms",
  "Intellectual property and ownership",
];

const FORMAT_OPTIONS: {
  value: OutputFormat;
  label: string;
  description: string;
}[] = [
  {
    value: "brief",
    label: "Brief flag",
    description: "One-line note per issue. Fast to scan.",
  },
  {
    value: "standard",
    label: "Full explanation",
    description: "What the issue is, why it matters, and the relevant clause.",
  },
  {
    value: "detailed",
    label: "With recommendation",
    description:
      "Full explanation plus a suggested action or question to raise.",
  },
];

function RadioCard({
  selected,
  onSelect,
  label,
  description,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  description: string;
}) {
  return (
    <div
      className="flex items-start gap-3 p-4 rounded-md cursor-pointer transition-colors"
      style={{
        border: `1.5px solid ${selected ? "#1D9E75" : "#E5E7EB"}`,
        backgroundColor: selected ? "#F0FAF6" : "#fff",
      }}
      onClick={onSelect}
    >
      <div
        className="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
        style={{ borderColor: selected ? "#1D9E75" : "#D1D5DB" }}
      >
        {selected && (
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1D9E75" }} />
        )}
      </div>
      <div>
        <p className="text-sm text-gray-900" style={{ fontWeight: selected ? 500 : 400 }}>
          {label}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export function Screen4({ onNext, onBack }: Screen4Props) {
  const [depth, setDepth] = useState<AnalysisDepth>("standard");
  const [focusAreas, setFocusAreas] = useState<string[]>([
    "Financial terms and payment obligations",
    "Liability and indemnification clauses",
    "Termination rights and penalties",
  ]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("standard");

  const toggleArea = (area: string) =>
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );

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
            I have your review cadence. These settings tell me how detailed to
            make my analysis and what to prioritize. My output is for your use
            only — nothing here will be shared externally.
          </p>
        </div>

        <div style={{ maxWidth: 540 }}>
          {/* Section 1: Depth */}
          <div className="mb-8">
            <h3 className="text-sm text-gray-900 mb-1" style={{ fontWeight: 500 }}>
              How thorough should my analysis be?
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              This controls how many items I flag and how much I explain each one.
            </p>
            <div className="space-y-2.5">
              {DEPTH_OPTIONS.map((opt) => (
                <RadioCard
                  key={opt.value}
                  selected={depth === opt.value}
                  onSelect={() => setDepth(opt.value)}
                  label={opt.label}
                  description={opt.description}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Focus areas */}
          <div className="mb-8">
            <h3 className="text-sm text-gray-900 mb-1" style={{ fontWeight: 500 }}>
              What's most important to surface?
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              I'll prioritize these areas. Anything outside this list will still
              be flagged if it's clearly significant.
            </p>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {FOCUS_AREAS.map((area) => {
                const checked = focusAreas.includes(area);
                return (
                  <label
                    key={area}
                    className="flex items-start gap-2.5 cursor-pointer"
                    onClick={() => toggleArea(area)}
                  >
                    <div
                      className="mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0"
                      style={{
                        borderColor: checked ? "#1D9E75" : "#d1d5db",
                        backgroundColor: checked ? "#1D9E75" : "#fff",
                      }}
                    >
                      {checked && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path
                            d="M1 3.5L3.5 6L8 1"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-gray-700 leading-snug">{area}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 3: Output format */}
          <div className="mb-8">
            <h3 className="text-sm text-gray-900 mb-1" style={{ fontWeight: 500 }}>
              How should I present each issue?
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              This applies to every finding I surface.
            </p>
            <div className="space-y-2.5">
              {FORMAT_OPTIONS.map((opt) => (
                <RadioCard
                  key={opt.value}
                  selected={outputFormat === opt.value}
                  onSelect={() => setOutputFormat(opt.value)}
                  label={opt.label}
                  description={opt.description}
                />
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div
            className="p-4 rounded-md mb-8"
            style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
          >
            <p className="text-xs text-gray-500 leading-relaxed">
              <span style={{ fontWeight: 500, color: "#374151" }}>
                This output is for your internal use only.
              </span>{" "}
              These settings help me calibrate the depth and format of my
              analysis. Nothing I produce will be shared externally — this is
              all for your review.
            </p>
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
              onClick={() => onNext({ depth, focusAreas, outputFormat })}
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm"
              style={{ backgroundColor: "#1D9E75", color: "#fff", fontWeight: 500 }}
            >
              Save analysis settings
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
        <p
          className="text-xs uppercase tracking-wider text-gray-400 mb-4"
          style={{ fontWeight: 600 }}
        >
          Current settings
        </p>
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1" style={{ fontWeight: 600 }}>
              Depth
            </p>
            <p className="text-sm text-gray-700" style={{ fontWeight: 500 }}>
              {DEPTH_OPTIONS.find((o) => o.value === depth)?.label}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1" style={{ fontWeight: 600 }}>
              Priority areas
            </p>
            <p className="text-sm text-gray-700">{focusAreas.length} selected</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1" style={{ fontWeight: 600 }}>
              Output format
            </p>
            <p className="text-sm text-gray-700">
              {FORMAT_OPTIONS.find((o) => o.value === outputFormat)?.label}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-5">
          <p className="text-sm text-gray-500 leading-relaxed">
            These settings apply to every document I analyze. You can adjust
            them between sessions.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-5 mt-5">
          <p
            className="text-xs uppercase tracking-wider text-gray-400 mb-3"
            style={{ fontWeight: 600 }}
          >
            Phase 2 — Calibration
          </p>
          <p className="text-xs text-gray-400">
            Context · <span style={{ color: "#1D9E75", fontWeight: 500 }}>Calibration</span> · Trial run · Analysis
          </p>
        </div>
      </div>
    </div>
  );
}
