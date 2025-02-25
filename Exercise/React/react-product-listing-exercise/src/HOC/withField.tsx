import { useContext} from "react";
import {FormStore} from "../stores/formStore.tsx";
import {formStoreContext} from "../context/formContext.tsx";
import Field from "../Components/Field.tsx";

interface IBaseField<T> {
    name: keyof T;
    required?: boolean;
    disabled?: boolean;
    onChange?: any;
}

export interface IWithFieldProps<T> extends IBaseField<T> {
    options?: { value: string, label: string }[];
    min?: number;
    max?: number;
    index?: number;
    label?: string;
    store?: FormStore<T>;
}

function withField<T extends IWithFieldProps<T>>(WrappedComponent: (props: T) => JSX.Element) {
    return (props: T) => {
        const store = useContext(formStoreContext) || props?.store;
        if (!store.hasKey(props.name)) {
            console.log('Given field is not initialized');
            return;
        }
        return (
            <Field label={props.label}
                   store={store} name={props.name} required={props.required}
                   index={props.index}
                   callBack={props?.onChange}
                   inputFieldComponent={(inputProps: { name: keyof T["store"], required: boolean },
                                         handleChange: (value : any) => void) => (
                       <WrappedComponent {...props} index={props.index}
                                         store={store} {...inputProps}
                                         disabled={store.isSubmitted}
                                         value={typeof props?.index === "number"
                                             ? store.getValue(props.name, props.index)
                                             : store.getValue(props.name)}
                                         onChange={handleChange}/>
                   )}
            />
        )
    }
}

export default withField;