import {ChangeEvent, useState} from "react";

export function useFormInputBox(initialValue : string ) {
    const [value , setValue] = useState<string>(initialValue);

    function handleChange(e : ChangeEvent<HTMLInputElement> ) {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    };
}