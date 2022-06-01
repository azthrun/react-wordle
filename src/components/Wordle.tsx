import { useState } from "react";
import { useEffect } from "react";

import Solution from "../dataStructure/Solution";
import "../dataStructure/Solution.ts";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

interface Props {
    solution: Solution,
}

const Wordle = ({ solution } : Props) => {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);

        if (isCorrect) {
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener('keyup', handleKeyup);
        }

        if (turn > 5) {
            setTimeout(() => setShowModal(true), 2000);
            window.removeEventListener('keyup', handleKeyup);
        }

        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup, isCorrect]);

    return (
        <>
            <div>solution - { solution.word }</div>
            <Grid currentGuess={ currentGuess } guesses={ guesses } turn={ turn } />
            <Keypad usedKeys={ usedKeys } />
            {
                showModal &&
                <Modal isCorrect={ isCorrect } turn={ turn } solution={ solution } />
            }
        </>
    );
}

export default Wordle;