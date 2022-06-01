import { useState } from "react"

import Solution from "../dataStructure/Solution";
import Guess from "../dataStructure/Guess";

const useWordle = (solution : Solution) => {
    const [turn, setTurn] = useState<number>(0);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [guesses, setGuesses] = useState<Guess[][]>([...Array(6)]);
    const [history, setHistory] = useState<string[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [usedKeys, setUsedKeys] = useState<{ [char : string] : string }>({});

    const formatGuess = () : Guess[] => {
        let solutionArray : (string | null)[] = [...solution.word];
        let formattedGuess = [...currentGuess].map(l => {
            return {
                key: l,
                color: 'gray'
            };
        });

        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = null;
            }
        });

        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        });

        return formattedGuess;
    }

    const addNewGuess = (formattedGuess : Guess[]) => {
        if (currentGuess === solution.word) {
            setIsCorrect(true);
        }

        setGuesses(prevGuesses => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });

        setHistory(prevHistory => [...prevHistory, currentGuess]);
        setTurn(prevTurn => prevTurn + 1);
        setUsedKeys(prevUsedKeys => {
            let newKeys = {...prevUsedKeys};

            formattedGuess.forEach(l => {
                const currentColor = newKeys[l.key];

                if (l.color === 'green') {
                    newKeys[l.key] = 'green';
                    return;
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    newKeys[l.key] = 'yellow';
                    return;
                }
                if (l.color === 'gray' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[l.key] = 'gray';
                    return;
                }
            });

            return newKeys;
        })
        setCurrentGuess('');
    }

    const handleKeyup = ({ key } : KeyboardEvent) => {
        if (key === 'Enter') {
            addGuess();
        }

        if (key === 'Backspace') {
            backspaceGuess();
            return;
        }

        if (/^[a-zA-Z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key);
            }
        }
    }

    const handleKeypadClick = ({ target } : React.MouseEvent<HTMLDivElement>) => {
        const divElement = target as HTMLDivElement;

        if (divElement.innerHTML === 'Enter') {
            addGuess();
        }

        if (divElement.innerHTML === 'Back') {
            backspaceGuess();
            return;
        }

        if (/^[a-zA-Z]$/.test(divElement.innerHTML)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + divElement.innerHTML);
            }
        }
    }

    const addGuess = () => {
        if (turn > 5) {
            alert('all guesses are used. (MAX: 5)');
            return;
        }

        if (history.includes(currentGuess)) {
            alert('you have tried that word');
            return;
        }

        if (currentGuess.length !== 5) {
            alert('word must have 5 characters');
            return;
        }

        const formatted = formatGuess();
        addNewGuess(formatted);
    }

    const backspaceGuess = () => {
        setCurrentGuess(prev => prev.slice(0, -1));
    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, handleKeypadClick };
}

export default useWordle;