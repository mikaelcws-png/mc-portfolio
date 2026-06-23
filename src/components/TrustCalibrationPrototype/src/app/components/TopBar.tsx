import { Check } from "lucide-react";

const PHASES = [
  { label: "Context", screens: [1, 2] },
  { label: "Trial run", screens: [3, 4] },
  { label: "Analysis", screens: [5, 6] },
];

interface TopBarProps {
  currentScreen: number;
}

export function TopBar({ currentScreen }: TopBarProps) {
  const currentPhaseIdx = PHASES.findIndex((p) =>
    p.screens.includes(currentScreen)
  );

  return (
    <div className="h-14 border-b border-gray-200 flex items-center px-8 justify-between bg-white shrink-0">
      <div className="flex items-center gap-2.5">
        <div
          className="w-6 h-6 rounded flex items-center justify-center"
          style={{ backgroundColor: "#1D9E75" }}
        >
          <span className="text-white text-xs" style={{ fontWeight: 600 }}>N</span>
        </div>
        <span className="text-sm text-gray-900" style={{ fontWeight: 500 }}>North</span>
        <span className="text-gray-300 mx-1">·</span>
        <span className="text-sm text-gray-500">Deli Rentals</span>
      </div>

      <div className="flex items-center gap-0">
        {PHASES.map((phase, i) => {
          const done = i < currentPhaseIdx;
          const active = i === currentPhaseIdx;
          return (
            <div key={phase.label} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: done || active ? "#1D9E75" : "#F0F0F2",
                    color: done || active ? "#fff" : "#9ca3af",
                  }}
                >
                  {done ? (
                    <Check size={12} strokeWidth={2.5} />
                  ) : (
                    <span style={{ fontSize: 11, fontWeight: 500 }}>{i + 1}</span>
                  )}
                </div>
                <span
                  className="text-xs leading-none whitespace-nowrap"
                  style={{
                    color: active ? "#1D9E75" : done ? "#6b7280" : "#9ca3af",
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {phase.label}
                </span>
              </div>
              {i < PHASES.length - 1 && (
                <div
                  className="w-10 h-px mb-4 mx-1.5"
                  style={{ backgroundColor: done ? "#1D9E75" : "#e5e7eb" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
