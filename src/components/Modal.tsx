import Solution from "../dataStructure/Solution";

interface Props {
    isCorrect : boolean,
    turn : number,
    solution : Solution,
}

const Modal = ({ isCorrect, turn, solution } : Props) => {
    return (
        <div className="modal">
            <div>
                <h1>
                    { isCorrect ? 'You Got It!' : 'Meh..' }
                </h1>
                <p className="solution">{ solution.word }</p>
                <p>
                    { isCorrect ? `You made it in ${turn} guesses :)` : 'Better luck next time :)' }
                </p>
                <small>Refresh page for another game</small>
            </div>
        </div>
    );
}

export default Modal;