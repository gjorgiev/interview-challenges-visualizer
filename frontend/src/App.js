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

  if (loading) return <div>Loading exercise...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      <div className="mb-4 text-sm bg-gray-50 p-3 rounded">
        <p>{description}</p>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="nValue" className="text-sm font-medium">
          N:
        </label>
        <input
          id="nValue"
          type="number"
          value={n}
          min="0"
          onChange={(e) => setN(Number(e.target.value))}
          className="border rounded p-1 w-20 text-center"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={nextStep}
          disabled={done}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next Step
        </button>
        <button
          onClick={reset}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="text-sm mb-2">Step: {step}</div>
      <div className="text-sm mb-2">Prev: {prev}</div>
      <div className="text-sm mb-2">Curr: {curr}</div>

      <div className="bg-gray-100 p-2 rounded max-h-48 overflow-y-auto text-sm">
        {log.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>

      <div className="bg-white border rounded-xl p-4 shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-2">Algorithm</h2>
        <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto">
          {algorithm}
        </pre>
      </div>
    </div>
  );
}

export default App;
