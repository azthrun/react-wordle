import React, { useState, useEffect } from "react";
import Key from "../dataStructure/Key";
import useKeypad from "../hooks/useKeypad";

interface Props {
    usedKeys : { [char : string] : string },
    keyClick : (event : React.MouseEvent<HTMLDivElement>) => void,
}

const Keypad = ({ usedKeys, keyClick } : Props) => {
    // const letters = [
    //     { key: 'a' },
    //     { key: 'b' },
    //     { key: 'c' },
    //     { key: 'd' },
    //     { key: 'e' },
    //     { key: 'f' },
    //     { key: 'g' },
    //     { key: 'h' },
    //     { key: 'i' },
    //     { key: 'j' },
    //     { key: 'k' },
    //     { key: 'l' },
    //     { key: 'm' },
    //     { key: 'n' },
    //     { key: 'o' },
    //     { key: 'p' },
    //     { key: 'q' },
    //     { key: 'r' },
    //     { key: 's' },
    //     { key: 't' },
    //     { key: 'u' },
    //     { key: 'v' },
    //     { key: 'w' },
    //     { key: 'x' },
    //     { key: 'y' },
    //     { key: 'z' }
    // ]
    const { getKeys } = useKeypad();
    const letters = getKeys();

    return (
        <div className="keypad-container">
            <div className="keypad">
                {
                    letters &&
                    letters.map((l) => {
                        const color = usedKeys[l.key];
                        return (
                            <div key={ l.key } className={ color } onClick={ keyClick }>
                                { l.key }
                            </div>
                        );
                    })
                }
            </div>
            <div className="key-controls enter" onClick={ keyClick }>
                Enter
            </div>
            <div className="key-controls backspace" onClick={ keyClick }>
                Back
            </div>
        </div>
    );
}

export default Keypad;