import { useEffect } from "react";
import { useState } from "react";
import Key from "../dataStructure/Key";

interface Props {
    usedKeys : { [char : string] : string }
}

const Keypad = ({ usedKeys } : Props) => {
    const [letters, setLetters] = useState<Key[] | undefined>(undefined);

    useEffect(() => {
        fetch('http://localhost:8000/letters')
            .then(res => res.json())
            .then(json => {
                setLetters(json);
            });
    }, []);

    return (
        <div className="keypad">
            {
                letters &&
                letters.map((l) => {
                    const color = usedKeys[l.key];
                    return (
                        <div key={ l.key } className={ color } >
                            { l.key }
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Keypad;