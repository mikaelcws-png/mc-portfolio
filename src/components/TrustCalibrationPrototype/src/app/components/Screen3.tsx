import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import type { Cadence, ReviewData } from "../types";

interface Screen3Props {
  onNext: (data: ReviewData) => void;
  onBack: () => void;
}

const CADENCE_OPTIONS: {
  value: Cadence;
  label: string;
  description: string;
  touchpoints: string;
}[] = [
  {
    value: "every-task",
    label: "After every task",
    description: "You review each individual action I take before I proceed to the next.",
    touchpoints: "~12–20 review prompts per loan file",
  },
  {
    value: "every-file",
    label: "After each loan file",
    description: "You review my complete findings for a file before I move to the next one.",
    touchpoints: "1 review prompt per loan file",
  },
  {
    value: "milestone",
    label: "At milestone checkpoints",
    description: "You review at defined stages: after sampling, after gap analysis, before draft.",
    touchpoints: "3 review prompts per audit phase",
  },
  {
    value: "exception-only",
    label: "Exceptions only",
    description: "I work until I hit something that meets your exception criteria, then stop.",
    touchpoints: "Varies based on your exception rules",
  },
];

const ALWAYS_REVIEW = [
  "Output is going to an approver or external audience",
  "My conclusion contradicts a prior decision",
  "A key input is missing or ambiguous",
  "The task involves significant financial or legal consequences",
  "An anomalous pattern appears across a significant portion of inputs",
];

function RadioRow({
  option,
  selected,
  onSelect,
}: {
  option: (typeof CADENCE_OPTIONS)[0];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-md cursor-pointer transition-colors"
      style={{
        border: `1.5px solid ${selected ? "#1D9E75" : "#E5E7EB"}`,
        backgroundColor: selected ? "#F0FAF6" : "#fff",
      }}
      onClick={onSelect}
    >
      <div
        className="mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
        style={{
          borderColor: selected ? "#1D9E75" : "#D1D5DB",
        }}
      >
        {selected && (
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#1D9E75" }}
          />
        )}
      </div>
      <div className="flex-1">
        <p
          className="text-sm text-gray-900"
          style={{ fontWeight: selected ? 500 : 400 }}
        >
          {option.label}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
          {option.description}
        </p>
        <p
          className="text-xs mt-1.5"
          style={{ color: selected ? "#1D9E75" : "#9CA3AF" }}
        >
          {option.touchpoints}
        </p>
      </div>
    </div>
  );
}

export function Screen3({ onNext, onBack }: Screen3Props) {
  const [cadence, setCadence] = useState<Cadence>("milestone");
  const [alwaysReview, setAlwaysReview] = useState<string[]>([
    "Output is going to an approver or external audience",
    "My conclusion contradicts a prior decision",
  ]);
  const [customTrigger, setCustomTrigger] = useState("");

  const toggleReview = (v: string) =>
    setAlwaysReview((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );

  const selected = CADENCE_OPTIONS.find((o) => o.value === cadence)!;

  return (
    <div className="flex flex-1 overflow-hidden">
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
            I have your task scope and authority settings. Now tell me how
            often you want to see my work before I move forward—more
            touchpoints means more control, but slower throughput.
          </p>
        </div>

        <div className="mb-5">
          <h2 className="text-base text-gray-900 mb-1" style={{ fontWeight: 500 }}>
            When do you want to see my work?
          </h2>
          <p className="text-sm text-gray-500">
            Choose how often I pause and surface output for your review.
          </p>
        </div>

        <div className="space-y-2.5 mb-8" style={{ maxWidth: 540 }}>
          {CADENCE_OPTIONS.map((opt) => (
            <RadioRow
              key={opt.value}
              option={opt}
              selected={cadence === opt.value}
              onSelect={() => setCadence(opt.value)}
            />
          ))}
        </div>

        {/* Always review section */}
        <div className="mb-8" style={{ maxWidth: 540 }}>
          <h3 className="text-sm text-gray-900 mb-1" style={{ fontWeight: 500 }}>
            Always require my review for
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            These conditions trigger a review prompt regardless of the cadence
            setting above.
          </p>
          <div className="space-y-2.5">
            {ALWAYS_REVIEW.map((item) => {
              const checked = alwaysReview.includes(item);
              return (
                <label
                  key={item}
                  className="flex items-start gap-2.5 cursor-pointer"
                  onClick={() => toggleReview(item)}
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
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-4">
            <input
              type="text"
              value={customTrigger}
              onChange={(e) => setCustomTrigger(e.target.value)}
              placeholder="Add a custom review trigger..."
              className="w-full border rounded-md px-3 py-2 text-sm bg-white text-gray-900 placeholder-gray-400 outline-none"
              style={{ borderColor: "#e5e7eb" }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#1D9E75";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(29,158,117,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
                if (customTrigger.trim()) {
                  setAlwaysReview((prev) => [...prev, customTrigger.trim()]);
                  setCustomTrigger("");
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && customTrigger.trim()) {
                  setAlwaysReview((prev) => [...prev, customTrigger.trim()]);
                  setCustomTrigger("");
                }
              }}
            />
            <p className="text-xs text-gray-400 mt-1">Press Enter to add</p>
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
            onClick={() =>
              onNext({
                cadence,
                cadenceLabel: CADENCE_OPTIONS.find((o) => o.value === cadence)!.label,
                alwaysReview,
              })
            }
            className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm"
            style={{ backgroundColor: "#1D9E75", color: "#fff", fontWeight: 500 }}
          >
            Save review settings
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
          Review estimate
        </p>

        <div
          className="p-4 rounded-md mb-5"
          style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB" }}
        >
          <p className="text-sm text-gray-900" style={{ fontWeight: 500 }}>
            {selected.label}
          </p>
          <p
            className="text-sm mt-1.5"
            style={{ color: "#1D9E75", fontWeight: 500 }}
          >
            {selected.touchpoints}
          </p>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Plus {alwaysReview.length} exception{alwaysReview.length !== 1 ? "s" : ""} that always trigger a review, regardless of cadence.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-5">
          <p className="text-sm text-gray-600 leading-relaxed">
            Exception triggers override this setting. If I hit one of your
            always-review conditions, I'll stop even if I'm set to
            exceptions-only.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-5 mt-5">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3" style={{ fontWeight: 600 }}>
            Step 3 of 5
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Context · Scope ·{" "}
            <span style={{ color: "#1D9E75", fontWeight: 500 }}>Review</span> ·
            Exceptions · Confirm
          </p>
        </div>
      </div>
    </div>
  );
}
