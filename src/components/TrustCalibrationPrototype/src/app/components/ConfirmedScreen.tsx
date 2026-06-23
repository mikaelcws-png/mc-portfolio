import { CheckCircle2, ArrowRight } from "lucide-react";

export function ConfirmedScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="text-center" style={{ maxWidth: 400 }}>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "#E8F7F2" }}
        >
          <CheckCircle2 size={24} style={{ color: "#1D9E75" }} />
        </div>
        <h2 className="text-gray-900 mb-2" style={{ fontWeight: 500 }}>
          North is calibrated
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Your trust settings are saved. North will work within the parameters
          you've defined throughout this audit. You can recalibrate at any time
          from Settings → Agent behavior.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Run calibration again
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm"
            style={{ backgroundColor: "#1D9E75", color: "#fff", fontWeight: 500 }}
          >
            Go to audit
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
