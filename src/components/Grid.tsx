import Guess from "../dataStructure/Guess";
import Row from "./Row";

interface Props {
    currentGuess : string,
    guesses : Guess[][],
    turn : number,
}

const Grid = ({ currentGuess, guesses, turn } : Props) => {
    return (
        <div>
            {
                guesses.map((g, i) => {
                    if (turn === i) {
                        return (
                            <Row key={ i } guess={ null } currentGuess={ currentGuess } />
                        );
                    }
                    return (
                        <Row key={ i } guess={ g } currentGuess={ null } />
                    );
                })
            }    
        </div>
    );
}

export default Grid;