import { useState, useEffect } from "react";

function App() {
  const [n, setN] = useState(10);
  const [step, setStep] = useState(0);
  const [prev, setPrev] = useState(0);
  const [curr, setCurr] = useState(1);
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [loading, setLoading] = useState(true);

  const MOD = 1000000;

  useEffect(() => {
    async function fetchExercise() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/exercises/1`
        );
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setAlgorithm(data.algorithm);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch exercise:", err);
      }
    }

    fetchExercise();
  }, []);

  const reset = () => {
    setStep(0);
    setPrev(0);
    setCurr(1);
    setLog([]);
    setDone(false);
  };

  const nextStep = () => {
    if (done) return;

    if (step === 0 && n === 0) {
      setDone(true);
      setLog(["F(0) = 0"]);
      return;
    }
    if (step === 1 && n === 1) {
      setDone(true);
      setLog(["F(1) = 1"]);
      return;
    }

    const next = (prev + curr) % MOD;
    setLog((l) => [...l, `Step ${step}: ${prev} + ${curr} = ${next}`]);
    setPrev(curr);
    setCurr(next);
    setStep((s) => s + 1);

    if (step + 2 >= n) {
      setDone(true);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading exercise...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{title}</h1>

        <div className="mb-6 text-sm bg-white p-4 rounded-lg shadow-sm">
          <p>{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Visualization */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Visualization</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <label htmlFor="nValue" className="text-sm font-medium text-gray-700">
                  N:
                </label>
                <input
                  id="nValue"
                  type="number"
                  value={n}
                  min="0"
                  onChange={(e) => setN(Number(e.target.value))}
                  className="border rounded-md p-2 w-24 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={nextStep}
                  disabled={done}
                  className={`px-4 py-2 rounded-md text-white font-medium transition-colors
                    ${done ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                  Next Step
                </button>
                <button
                  onClick={reset}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">Step</div>
                  <div className="text-lg font-semibold text-gray-700">{step}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">Previous</div>
                  <div className="text-lg font-semibold text-gray-700">{prev}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">Current</div>
                  <div className="text-lg font-semibold text-gray-700">{curr}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md max-h-48 overflow-y-auto">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Execution Log</h3>
                <div className="space-y-1">
                  {log.map((line, idx) => (
                    <div key={idx} className="text-sm text-gray-600">{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Algorithm */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Algorithm</h2>
            <pre className="text-sm bg-gray-50 p-4 rounded-md overflow-auto font-mono">
              {algorithm}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
