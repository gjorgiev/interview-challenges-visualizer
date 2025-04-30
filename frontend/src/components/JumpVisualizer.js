import { useState, useEffect } from "react";

function JumpVisualizer() {
  const [array, setArray] = useState([2,3,-1,1,3]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jumps, setJumps] = useState(0);
  const [visited, setVisited] = useState([]);
  const [done, setDone] = useState(false);
  const [log, setLog] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [algorithm, setAlgorithm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExercise() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/exercises/2`
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
    setCurrentIndex(0);
    setJumps(0);
    setVisited(new Array(array.length).fill(false));
    setDone(false);
    setLog([]);
  };

  const nextStep = () => {
    if (done || !array.length) return;
    if (visited[currentIndex]) {
      setLog((l) => [...l, `Cycle detected at index ${currentIndex}`]);
      setDone(true);
      return;
    }

    const nextIndex = currentIndex + array[currentIndex];
    const outOfBounds = nextIndex < 0 || nextIndex >= array.length;

    setVisited((v) => {
      const newVisited = [...v];
      newVisited[currentIndex] = true;
      return newVisited;
    });

    setLog((l) => [...l, `Jump from ${currentIndex} to ${nextIndex}`]);
    setJumps((j) => j + 1);

    if (outOfBounds) {
      setLog((l) => [...l, `Pawn jumped out of bounds! ✅`]);
      setDone(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleArrayChange = (e) => {
    const input = e.target.value;
    const parsedArray = input.split(',').map(Number);
    setArray(parsedArray);
    setVisited(new Array(parsedArray.length).fill(false));
    reset();
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading exercise...</div>;


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{title}</h1>

        <div className="mb-6 text-sm bg-white p-4">
          {description.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-2">{paragraph}</p>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Explanation */}
          <div className="bg-white p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Explanation</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">How it works</h3>
                <p className="text-sm text-blue-700">
                  The Jump Visualizer simulates a sequence of jumps based on an array of integers.
                  Each element in the array represents a relative jump to another index.
                  Starting at the first element, the pawn jumps according to the value at its current position.
                  The goal is to determine how many jumps it takes for the pawn to jump out of the array.
                  If the pawn revisits an index, indicating a loop, the sequence is considered infinite and returns -1.
                  Add numbers in the field (separated by commas) and then click "Next Step" to see each jump in the sequence.
                </p>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <label htmlFor="arrayInput" className="text-sm font-medium text-gray-700">
                  Array:
                </label>
                <input
                  id="arrayInput"
                  type="text"
                  placeholder="e.g., 2,3,-1,1"
                  defaultValue="2,3,-1,1,3"
                  onChange={handleArrayChange}
                  className="border rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {array.map((val, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 flex flex-col items-center justify-center border rounded-xl p-2 shadow-md ${
                      currentIndex === idx ? "bg-blue-200" : visited[idx] ? "bg-gray-200" : "bg-white"
                    }`}
                  >
                    <div className="text-xs text-gray-500">{idx}</div>
                    <div className="font-semibold text-lg">{val}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mb-4">
                <button onClick={nextStep} disabled={done} className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${done ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>Next Step</button>
                <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors">Reset</button>
              </div>

              <div className="text-sm mb-2">Current Index: {currentIndex}</div>
              <div className="text-sm mb-2">Jumps: {jumps}</div>
              <div className="text-sm mb-4">Visited: [{visited.map((v) => (v ? 1 : 0)).join(", ")}]</div>

              <div className="bg-gray-100 p-2 rounded max-h-48 overflow-y-auto text-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Execution Log</h3>
                <div className="space-y-1">
                  {log.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Algorithm */}
          <div className="bg-white p-6 ">
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

export default JumpVisualizer; 