import { useState, useRef, useEffect } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import type { ContextData } from "../types";

interface Screen1Props {
  onNext: (data: ContextData) => void;
}

const QUESTIONS = [
  {
    id: "role" as keyof ContextData,
    label: "Your role",
    question: "What is your role?",
    hint: "Your title or function — helps me calibrate the level of detail and framing I use.",
    placeholder: "e.g. Risk Manager, Operations Lead, Senior Analyst",
    multiline: false,
  },
  {
    id: "goal" as keyof ContextData,
    label: "Today's task",
    question: "What are you trying to decide or complete today?",
    hint: "Describe the task or outcome you're working toward in this session.",
    placeholder:
      "e.g. Review supplier contracts and flag terms that deviate from our standard agreement...",
    multiline: true,
  },
  {
    id: "documents" as keyof ContextData,
    label: "Document types",
    question: "What kinds of documents will you be working with?",
    hint: "List the document types I should expect. I'll use this to interpret structure and extract the right information.",
    placeholder: "e.g. contracts, internal reports, spreadsheets, scanned forms",
    multiline: false,
  },
  {
    id: "approvers" as keyof ContextData,
    label: "Approvers",
    question: "Who needs to see or approve your output?",
    hint: "This tells me what level of formality, precision, and traceability to apply.",
    placeholder: "e.g. my manager, the legal team, an external regulator",
    multiline: false,
  },
];

function AgentTag() {
  return (
    <div className="flex items-center gap-1.5 mb-2">
      <div
        className="w-4 h-4 rounded flex items-center justify-center"
        style={{ backgroundColor: "#1D9E75" }}
      >
        <span className="text-white" style={{ fontSize: 9, fontWeight: 600 }}>N</span>
      </div>
      <span
        className="text-xs uppercase tracking-wider"
        style={{ color: "#1D9E75", fontWeight: 600 }}
      >
        North
      </span>
    </div>
  );
}

export function Screen1({ onNext }: Screen1Props) {
  const [step, setStep] = useState(0); // 0–3: question, 4: review
  const [answers, setAnswers] = useState<ContextData>({
    role: "",
    goal: "",
    documents: "",
    approvers: "",
  });
  const [currentValue, setCurrentValue] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (step < 4) {
      const q = QUESTIONS[step];
      setCurrentValue(answers[q.id] || "");
      const timer = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const saveAndAdvance = () => {
    if (!currentValue.trim()) return;
    const q = QUESTIONS[step];
    setAnswers((prev) => ({ ...prev, [q.id]: currentValue.trim() }));
    setCurrentValue("");
    setStep(step + 1);
  };

  const goBack = () => {
    if (step === 0) return;
    const q = QUESTIONS[step];
    setAnswers((prev) => ({ ...prev, [q.id]: currentValue }));
    setStep(step - 1);
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.currentTarget.style.borderColor = "#1D9E75";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(29,158,117,0.12)";
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.boxShadow = "none";
  };

  // ── Question view ──────────────────────────────────────────────────────────
  if (step < 4) {
    const q = QUESTIONS[step];
    const canAdvance = currentValue.trim().length > 0;

    return (
      <div className="flex flex-1 overflow-hidden">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-10 pt-10 pb-10 flex flex-col">
          {/* Back / spacer */}
          <div className="mb-10 h-6">
            {step > 0 && (
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft size={14} />
                Back
              </button>
            )}
          </div>

          {/* Welcome + Question block */}
          <div style={{ maxWidth: 500 }}>
            {step === 0 && (
              <div className="mb-8">
                <p className="text-gray-900 mb-1" style={{ fontSize: 22, fontWeight: 500 }}>
                  Welcome, Anna!
                </p>
                <p className="text-gray-400" style={{ fontSize: 15 }}>
                  What can I help you do today?
                </p>
              </div>
            )}

            <p
              className="text-xs text-gray-400 mb-5 tabular-nums"
              style={{ letterSpacing: "0.04em" }}
            >
              {step + 1} of 4
            </p>

            <h2
              className="text-gray-900 mb-2"
              style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.4 }}
            >
              {q.question}
            </h2>
            <p className="text-sm text-gray-400 mb-7 leading-relaxed">
              {q.hint}
            </p>

            {q.multiline ? (
              <textarea
                key={q.id}
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                placeholder={q.placeholder}
                rows={4}
                className="w-full border rounded-md px-3 py-2.5 text-sm bg-white text-gray-900 placeholder-gray-400 outline-none resize-none transition-colors"
                style={{ borderColor: "#e5e7eb" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    saveAndAdvance();
                  }
                }}
              />
            ) : (
              <input
                key={q.id}
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                placeholder={q.placeholder}
                className="w-full border rounded-md px-3 py-2.5 text-sm bg-white text-gray-900 placeholder-gray-400 outline-none transition-colors"
                style={{ borderColor: "#e5e7eb" }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={(e) => e.key === "Enter" && saveAndAdvance()}
              />
            )}

            <div className="flex items-center gap-4 mt-5">
              <button
                onClick={saveAndAdvance}
                disabled={!canAdvance}
                className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm transition-colors"
                style={{
                  backgroundColor: canAdvance ? "#1D9E75" : "#e5e7eb",
                  color: canAdvance ? "#fff" : "#374151",
                  fontWeight: 500,
                  cursor: canAdvance ? "pointer" : "not-allowed",
                }}
              >
                {step < 3 ? "Continue" : "Review answers"}
                <ChevronRight size={14} />
              </button>
              {canAdvance && (
                <span className="text-xs text-gray-400">
                  {q.multiline ? "Shift+Enter for new line · Enter to continue" : "or press Enter"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className="w-72 shrink-0 border-l border-gray-200 overflow-y-auto px-6 py-7"
          style={{ backgroundColor: "#FAFAFA" }}
        >
          <p
            className="text-xs uppercase tracking-wider text-gray-400 mb-5"
            style={{ fontWeight: 600 }}
          >
            Your answers so far
          </p>

          {step === 0 ? (
            <p className="text-sm text-gray-400 leading-relaxed">
              Your answers will appear here as you go.
            </p>
          ) : (
            <div className="space-y-5">
              {QUESTIONS.slice(0, step).map((prev) => (
                <div key={prev.id}>
                  <p
                    className="text-xs uppercase tracking-wider text-gray-400 mb-1"
                    style={{ fontWeight: 600 }}
                  >
                    {prev.label}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {answers[prev.id]}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-gray-200 pt-5 mt-8">
            <p
              className="text-xs uppercase tracking-wider text-gray-400 mb-3"
              style={{ fontWeight: 600 }}
            >
              Step 1 of 5
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Context · Scope · Review · Exceptions · Confirm
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Review view (step === 4) ───────────────────────────────────────────────
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
            Here's what you told me. Check that everything looks right—these
            answers set my working parameters for the whole session.
          </p>
        </div>

        {/* Answers list */}
        <div className="space-y-7 mb-9" style={{ maxWidth: 500 }}>
          {QUESTIONS.map((q, i) => (
            <div key={q.id} className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs uppercase tracking-wider text-gray-400 mb-1.5"
                  style={{ fontWeight: 600 }}
                >
                  {q.label}
                </p>
                <p className="text-sm text-gray-900 leading-relaxed">
                  {answers[q.id]}
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentValue(answers[q.id]);
                  setStep(i);
                }}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors shrink-0 mt-0.5"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8">
          <button
            onClick={() => onNext(answers)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm"
            style={{
              backgroundColor: "#1D9E75",
              color: "#fff",
              fontWeight: 500,
            }}
          >
            Set context and continue
            <ChevronRight size={15} />
          </button>
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
          Context captured
        </p>
        <div className="flex items-center gap-2 mb-5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#1D9E75" }}
          />
          <span className="text-sm text-gray-600">Ready to proceed</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          I'll use these answers to set my working parameters. The next steps
          define how I operate within that context.
        </p>

        <div className="border-t border-gray-200 pt-5 mt-8">
          <p
            className="text-xs uppercase tracking-wider text-gray-400 mb-3"
            style={{ fontWeight: 600 }}
          >
            Step 1 of 5
          </p>
          <p className="text-xs text-gray-400 leading-relaxed">
            <span style={{ color: "#1D9E75", fontWeight: 500 }}>Context</span>{" "}
            · Scope · Review · Exceptions · Confirm
          </p>
        </div>
      </div>
    </div>
  );
}
