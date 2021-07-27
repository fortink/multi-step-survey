import {useEffect, useState} from "react";
import {getInitialValue} from "../utils";

export const useInput = ({ label, initialValue, errors, handleValue }) => {
    const [value, setValue] = useState(getInitialValue({ label, initialValue}));

    useEffect(() => {
        handleValue({ label, value})
    }, [value])

    return {
        value,
        error: errors[label],
        handleSingleChange: (event) => setValue(event.target.value),
        // used for multi-select elements
        handleMultiChange: (event) => {
            const {checked, name } = event.target;
            if (checked) {
                setValue([...value, name])
            } else {
                setValue(value.filter((v) => v !==name))
            }
        },
    }
}
