import { ChevronLeft, CheckCircle2, Edit2 } from "lucide-react";
import type { CalibrationData } from "../types";

interface Screen5Props {
  data: CalibrationData;
  onBack: () => void;
  onConfirm: () => void;
  onEditStep: (step: 1 | 2 | 3 | 4) => void;
}

function SectionLabel({ step, title }: { step: number; title: string }) {
  return (
    <p
      className="text-xs uppercase tracking-wider text-gray-400"
      style={{ fontWeight: 600, letterSpacing: "0.08em" }}
    >
      Step {step} — {title}
    </p>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="text-xs uppercase tracking-wider text-gray-400 mb-1.5"
        style={{ fontWeight: 600, letterSpacing: "0.07em" }}
      >
        {label}
      </p>
      <p className="text-sm text-gray-900 leading-relaxed">{value}</p>
    </div>
  );
}

function Section({
  step,
  title,
  children,
  onEdit,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionLabel step={step} title={title} />
        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Edit2 size={11} />
          Edit
        </button>
      </div>
      <div className="h-px bg-gray-100 mb-6" />
      <div className="space-y-6">{children}</div>
    </div>
  );
}

const AUTHORITY_LABELS: Record<string, string> = {
  independent: "Act independently",
  flag: "Flag first",
  escalate: "Always escalate",
};

export function Screen5({ data, onBack, onConfirm, onEditStep }: Screen5Props) {
  const ctx = data.context;
  const scope = data.scope;
  const review = data.review;
  const exc = data.exceptions;

  const enabledRules = exc
    ? [...exc.rules, ...exc.customRules].filter((r) => r.enabled)
    : [];
  const stopRules = enabledRules.filter((r) => r.action === "stop");
  const flagRules = enabledRules.filter((r) => r.action === "flag");

  const scopeCounts = scope
    ? {
        independent: scope.tasks.filter((t) => t.authority === "independent").length,
        flag: scope.tasks.filter((t) => t.authority === "flag").length,
        escalate: scope.tasks.filter((t) => t.authority === "escalate").length,
      }
    : null;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Main */}
      <div className="flex-1 overflow-y-auto px-10 py-10">
        {/* Agent message */}
        <div
          className="mb-10 p-4 rounded-md"
          style={{ backgroundColor: "#F0FAF6", borderLeft: "3px solid #1D9E75" }}
        >
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
          <p className="text-sm text-gray-700 leading-relaxed">
            I have what I need. Review what I understood and edit anything
            before you confirm.
          </p>
        </div>

        <div style={{ maxWidth: 560 }}>
          {/* Section 1 — Context */}
          <Section step={1} title="Your context" onEdit={() => onEditStep(1)}>
            {ctx ? (
              <>
                <Field label="Role" value={ctx.role} />
                <Field label="Today's task" value={ctx.goal} />
                <Field label="Document types" value={ctx.documents} />
                <Field label="Approvers" value={ctx.approvers} />
              </>
            ) : (
              <p className="text-sm text-gray-400">Not completed.</p>
            )}
          </Section>

          <div className="my-10 h-px bg-gray-100" />

          {/* Section 2 — Scope */}
          <Section step={2} title="Agent authority" onEdit={() => onEditStep(2)}>
            {scope && scopeCounts ? (
              <>
                <div className="grid grid-cols-3 gap-4">
                  {(
                    [
                      ["independent", "Act independently"],
                      ["flag", "Flag first"],
                      ["escalate", "Always escalate"],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key}>
                      <p
                        className="text-xs uppercase tracking-wider text-gray-400 mb-1.5"
                        style={{ fontWeight: 600, letterSpacing: "0.07em" }}
                      >
                        {label}
                      </p>
                      <p className="text-sm text-gray-900">
                        {scopeCounts[key]}{" "}
                        <span className="text-gray-400">
                          {scopeCounts[key] === 1 ? "task" : "tasks"}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wider text-gray-400 mb-3"
                    style={{ fontWeight: 600 }}
                  >
                    Task breakdown
                  </p>
                  <div className="space-y-2">
                    {scope.tasks.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between"
                      >
                        <p className="text-sm text-gray-700">{t.task}</p>
                        <p
                          className="text-xs"
                          style={{
                            color:
                              t.authority === "independent"
                                ? "#1D9E75"
                                : t.authority === "flag"
                                ? "#D97706"
                                : "#EF4444",
                            fontWeight: 500,
                          }}
                        >
                          {AUTHORITY_LABELS[t.authority]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-400">Not completed.</p>
            )}
          </Section>

          <div className="my-10 h-px bg-gray-100" />

          {/* Section 3 — Review */}
          <Section step={3} title="Review cadence" onEdit={() => onEditStep(3)}>
            {review ? (
              <>
                <Field label="Cadence" value={review.cadenceLabel} />
                {review.alwaysReview.length > 0 && (
                  <div>
                    <p
                      className="text-xs uppercase tracking-wider text-gray-400 mb-3"
                      style={{ fontWeight: 600 }}
                    >
                      Always review when
                    </p>
                    <div className="space-y-2">
                      {review.alwaysReview.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: "#1D9E75" }}
                          />
                          <p className="text-sm text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-gray-400">Not completed.</p>
            )}
          </Section>

          <div className="my-10 h-px bg-gray-100" />

          {/* Section 4 — Exceptions */}
          <Section
            step={4}
            title="Exception rules"
            onEdit={() => onEditStep(4)}
          >
            {exc ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p
                      className="text-xs uppercase tracking-wider text-gray-400 mb-1.5"
                      style={{ fontWeight: 600 }}
                    >
                      Hard stops
                    </p>
                    <p className="text-sm text-gray-900">
                      {stopRules.length}{" "}
                      <span className="text-gray-400">
                        {stopRules.length === 1 ? "rule" : "rules"}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase tracking-wider text-gray-400 mb-1.5"
                      style={{ fontWeight: 600 }}
                    >
                      Flag and continue
                    </p>
                    <p className="text-sm text-gray-900">
                      {flagRules.length}{" "}
                      <span className="text-gray-400">
                        {flagRules.length === 1 ? "rule" : "rules"}
                      </span>
                    </p>
                  </div>
                </div>
                {enabledRules.length > 0 && (
                  <div>
                    <p
                      className="text-xs uppercase tracking-wider text-gray-400 mb-3"
                      style={{ fontWeight: 600 }}
                    >
                      Active conditions
                    </p>
                    <div className="space-y-2.5">
                      {enabledRules.map((r) => (
                        <div key={r.id} className="flex items-start gap-2.5">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{
                              backgroundColor:
                                r.action === "stop"
                                  ? "#EF4444"
                                  : r.action === "flag"
                                  ? "#F59E0B"
                                  : "#9CA3AF",
                            }}
                          />
                          <p className="text-sm text-gray-700">{r.trigger}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-gray-400">Not completed.</p>
            )}
          </Section>

          <div className="my-10 h-px bg-gray-100" />

          {/* CTA */}
          <div className="flex items-center gap-3 pb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={14} />
              Back
            </button>
            <button
              onClick={onConfirm}
              className="flex items-center gap-2 px-6 py-2.5 rounded-md text-sm"
              style={{ backgroundColor: "#1D9E75", color: "#fff", fontWeight: 500 }}
            >
              <CheckCircle2 size={15} />
              Confirm and begin
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
          Calibration summary
        </p>

        <div className="flex items-center gap-2 mb-6">
          <CheckCircle2 size={15} style={{ color: "#1D9E75" }} />
          <span className="text-sm text-gray-700" style={{ fontWeight: 500 }}>
            Ready to begin
          </span>
        </div>

        <div className="space-y-5">
          {ctx && (
            <div>
              <p
                className="text-xs uppercase tracking-wider text-gray-400 mb-1"
                style={{ fontWeight: 600 }}
              >
                Working on
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{ctx.goal}</p>
            </div>
          )}
          {scope && scopeCounts && (
            <div>
              <p
                className="text-xs uppercase tracking-wider text-gray-400 mb-1"
                style={{ fontWeight: 600 }}
              >
                Authority
              </p>
              <p className="text-sm text-gray-600">
                {scopeCounts.independent} independent · {scopeCounts.flag} flagged
                · {scopeCounts.escalate} escalated
              </p>
            </div>
          )}
          {review && (
            <div>
              <p
                className="text-xs uppercase tracking-wider text-gray-400 mb-1"
                style={{ fontWeight: 600 }}
              >
                Review
              </p>
              <p className="text-sm text-gray-600">{review.cadenceLabel}</p>
            </div>
          )}
          {exc && (
            <div>
              <p
                className="text-xs uppercase tracking-wider text-gray-400 mb-1"
                style={{ fontWeight: 600 }}
              >
                Exceptions
              </p>
              <p className="text-sm text-gray-600">
                {enabledRules.length} active rules · {stopRules.length} hard{" "}
                {stopRules.length === 1 ? "stop" : "stops"}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-5 mt-6">
          <p
            className="text-xs uppercase tracking-wider text-gray-400 mb-3"
            style={{ fontWeight: 600 }}
          >
            Step 5 of 5
          </p>
          <p className="text-xs text-gray-400">
            Context · Scope · Review · Exceptions ·{" "}
            <span style={{ color: "#1D9E75", fontWeight: 500 }}>Confirm</span>
          </p>
        </div>
      </div>
    </div>
  );
}
