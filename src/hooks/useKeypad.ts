import Key from "../dataStructure/Key";

const useKeypad = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    const getKeys = () : Key[] => alphabet.split('').map<Key>(l => ({ key: l }));

    return { getKeys };
}

export default useKeypad;