import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import Wordle from "./components/Wordle";
import Solution from "./dataStructure/Solution";
import db from "./firebase";

const App = () => {
  const [solution, setSolution] = useState<Solution | undefined>(undefined);

  useEffect(() => {
    getSolutions().then(res => {
      const randomSolution = res[Math.floor(Math.random() * res.length)];
      setSolution(randomSolution);
    });
  }, [setSolution]);

  const getSolutions = async () => {
    const solutionCollection = collection(db, 'solutions');
    const solutionSnapshot = await getDocs(solutionCollection);
    return solutionSnapshot.docs.map<Solution>(doc => ({ id: doc.id, word: doc.data().word }));
  }

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
