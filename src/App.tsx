import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import Solution from "./dataStructure/Solution";

const App = () => {
  const [solution, setSolution] = useState<Solution | undefined>(undefined);

  useEffect(() => {
    fetch('http://localhost:8000/solutions')
      .then(res => res.json())
      .then(json => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution);
      });
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle (DreamBig)</h1>
      {
        solution &&
        <Wordle solution={ solution } />
      }
    </div>
  );
}

export default App;
