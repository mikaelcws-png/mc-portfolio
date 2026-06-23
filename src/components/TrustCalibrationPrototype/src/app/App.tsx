import { useState } from "react";
import { TopBar } from "./components/TopBar";
import { Screen1 } from "./components/Screen1";
import { AgentSummary } from "./components/AgentSummary";
import { TrialUpload } from "./components/TrialUpload";
import { TrialAnalysis } from "./components/TrialAnalysis";
import { ActualCaseUpload } from "./components/ActualCaseUpload";
import { FinalAnalysis } from "./components/FinalAnalysis";
import type { CalibrationData } from "./types";

// Screen map:
// 1 — Context questions
// 2 — Agent summary + proposed output
// 3 — Trial upload
// 4 — Trial analysis (verify)
// 5 — Actual case upload
// 6 — Final analysis

export default function App() {
  const [screen, setScreen] = useState(1);
  const [calibration, setCalibration] = useState<CalibrationData>({});
  const [trialFiles, setTrialFiles] = useState<string[]>([]);
  const [caseFiles, setCaseFiles] = useState<string[]>([]);

  const go = (n: number) => setScreen(n);

  return (
    <div
      className="flex flex-col"
      style={{
        height: "100vh",
        backgroundColor: "#fff",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <TopBar currentScreen={screen} />

      <div className="flex flex-1 overflow-hidden">
        {screen === 1 && (
          <Screen1
            onNext={(data) => {
              setCalibration({ context: data });
              go(2);
            }}
          />
        )}

        {screen === 2 && calibration.context && (
          <AgentSummary
            data={calibration.context}
            onNext={() => go(3)}
            onBack={() => go(1)}
          />
        )}

        {screen === 3 && (
          <TrialUpload
            onNext={(files) => {
              setTrialFiles(files);
              go(4);
            }}
            onBack={() => go(2)}
          />
        )}

        {screen === 4 && (
          <TrialAnalysis
            files={trialFiles}
            onVerified={() => go(5)}
            onBack={() => go(3)}
          />
        )}

        {screen === 5 && (
          <ActualCaseUpload
            onNext={(files) => {
              setCaseFiles(files);
              go(6);
            }}
            onBack={() => go(4)}
          />
        )}

        {screen === 6 && (
          <FinalAnalysis
            files={caseFiles}
            context={calibration.context}
          />
        )}
      </div>
    </div>
  );
}
