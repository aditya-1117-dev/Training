import {ChangeEvent, useState} from "react";

export function useFormInputBox(initialValue : number | string ) {
    const [value, setValue] = useState<string | number>(initialValue);

    function handleChange(e : ChangeEvent<HTMLInputElement> ) {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    };
}