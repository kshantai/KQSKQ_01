import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronUp,
  Download,
  Users,
  Sparkles,
  AlertCircle,
} from "lucide-react";

/* ======================================================
   PhoneFrame – visual container ONLY
====================================================== */
const PhoneFrame = ({ children, title, id, viewMode }) => {
  if (viewMode === "prototype") {
    return (
      <div className="w-full max-w-md h-[80vh] min-h-[640px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
        <div className="h-4 bg-white" />
        <div className="flex-1 flex flex-col">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <span className="text-xs font-mono text-gray-400 block">
          FRAME {id}
        </span>
        <h3 className="font-semibold text-gray-700">{title}</h3>
      </div>

      <div className="w-[320px] h-[640px] bg-white rounded-[36px] border border-gray-200 shadow-md flex flex-col overflow-hidden">
        <div className="h-6 opacity-30 flex justify-between px-6 pt-3">
          <div className="w-12 h-2 bg-gray-900 rounded-full" />
          <div className="flex gap-1">
            <div className="w-3 h-3 border border-gray-900 rounded-full" />
            <div className="w-3 h-3 bg-gray-900 rounded-sm" />
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">{children}</div>

        <div className="h-6 flex justify-center items-center pb-2">
          <div className="w-32 h-1 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

/* ======================================================
   ScreenRenderer – content logic
====================================================== */
const ScreenRenderer = ({
  screen,
  selections,
  setSelections,
  onNext,
  error,
}) => {
  return (
    <div className="flex flex-col h-full">
      {screen.type === "landing" && (
        <div
          onClick={onNext}
          className="flex flex-col justify-center items-center h-full cursor-pointer text-center"
        >
          <div className="w-24 h-24 border-2 border-gray-900 rounded-full flex items-center justify-center mb-6">
            <span className="text-xs font-mono tracking-widest">LOGO</span>
          </div>
          <h1 className="text-xl font-bold tracking-widest">KQSKQ</h1>
          <div className="mt-10 animate-bounce text-gray-400">
            <ChevronUp />
            <p className="text-xs uppercase mt-2">Tap to begin</p>
          </div>
        </div>
      )}

      {screen.type === "question" && (
        <>
          <h2 className="text-xl font-semibold mb-6">
            {screen.question}
          </h2>

          <div className="space-y-3 flex-1">
            {screen.options.map((opt) => (
              <button
                key={opt}
                onClick={() =>
                  setSelections({ ...selections, [screen.id]: opt })
                }
                className={`w-full p-4 rounded-lg border text-left ${
                  selections[screen.id] === opt
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-3 flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            onClick={onNext}
            className="mt-4 bg-gray-900 text-white py-4 rounded-lg"
          >
            Continue
          </button>
        </>
      )}

      {screen.type === "result" && (
        <div className="flex flex-col justify-center h-full">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Check />
          </div>
          <h2 className="text-2xl font-bold mb-3">
            Focus on clarity.
          </h2>
          <p className="text-gray-600 mb-6">
            Based on your responses, the best next step is to slow
            complexity and take one grounded action.
          </p>

          <button
            onClick={onNext}
            className="bg-gray-900 text-white py-4 rounded-lg"
          >
            See Options
          </button>
        </div>
      )}

      {screen.type === "options" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Ways to go deeper
          </h2>

          <div className="p-4 border rounded-lg flex justify-between">
            <div>
              <h3 className="font-medium">Workbook</h3>
              <p className="text-sm text-gray-500">
                Download a guided PDF
              </p>
            </div>
            <Download />
          </div>

          <div className="p-4 border rounded-lg flex justify-between">
            <div>
              <h3 className="font-medium">AI Guidance</h3>
              <p className="text-sm text-gray-500">
                Ask follow-up questions
              </p>
            </div>
            <Sparkles />
          </div>

          <div className="p-4 border rounded-lg flex justify-between">
            <div>
              <h3 className="font-medium">Events</h3>
              <p className="text-sm text-gray-500">
                Join live sessions
              </p>
            </div>
            <Users />
          </div>
        </div>
      )}
    </div>
  );
};

/* ======================================================
   MAIN APP
====================================================== */
export default function Wireframes() {
  const [viewMode, setViewMode] = useState("gallery");
  const [screenIndex, setScreenIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [error, setError] = useState("");

  const screens = [
    { id: "00", title: "Landing", type: "landing" },
    {
      id: "01",
      title: "Intent",
      type: "question",
      question: "What do you need right now?",
      options: [
        "Unstick a decision",
        "Validate an idea",
        "Find a starting point",
      ],
    },
    { id: "02", title: "Result", type: "result" },
    { id: "03", title: "Options", type: "options" },
  ];

  const current = screens[screenIndex];

  const handleNext = () => {
    if (
      current.type === "question" &&
      !selections[current.id]
    ) {
      setError("Please select one option.");
      return;
    }
    setError("");
    setScreenIndex((i) => Math.min(i + 1, screens.length - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b px-6 py-4 flex justify-between z-50">
        <h1 className="text-sm font-bold tracking-wider">
          KQSKQ <span className="text-gray-400">| MVP</span>
        </h1>

        <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
          <button
            onClick={() => setViewMode("gallery")}
            className={`px-3 py-1 rounded ${
              viewMode === "gallery" ? "bg-white" : ""
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => setViewMode("prototype")}
            className={`px-3 py-1 rounded ${
              viewMode === "prototype" ? "bg-white" : ""
            }`}
          >
            Prototype
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="pt-24 pb-12 px-6">
        {viewMode === "gallery" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {screens.map((s) => (
              <PhoneFrame
                key={s.id}
                id={s.id}
                title={s.title}
                viewMode="gallery"
              >
                <ScreenRenderer
                  screen={s}
                  selections={selections}
                  setSelections={setSelections}
                  onNext={handleNext}
                  error={error}
                />
              </PhoneFrame>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <PhoneFrame
              id={current.id}
              title={current.title}
              viewMode="prototype"
            >
              <ScreenRenderer
                screen={current}
                selections={selections}
                setSelections={setSelections}
                onNext={handleNext}
                error={error}
              />
            </PhoneFrame>
          </div>
        )}
      </main>
    </div>
  );
}
