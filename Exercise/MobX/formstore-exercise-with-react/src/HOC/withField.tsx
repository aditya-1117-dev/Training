import Field from "../Components/Field.tsx";
import {ChangeEvent, useContext} from "react";
import {FormStoreContext, IProductData} from "../Context/FormContext.tsx";
import {FormStore} from "../Stores/formStore.tsx";

interface IBaseField {
    name: keyof IProductData;
    required?: boolean;
    disabled?: boolean;
    onChange?: any;
}

export interface IWithFieldProps extends IBaseField {
    options?: { value: string, label: string }[];
    min?: number;
    max?: number;
    index?: number;
    label?: string;
    store?: FormStore<IProductData>;
}

function withField<T extends IWithFieldProps>(WrappedComponent: (props: T) => JSX.Element) {
    return (props: T) => {
        const store = useContext(FormStoreContext) || props?.store;
        if (!store.hasKey(props.name) ) return <>"Error"</>;
        return (
            <Field label={props.label} store={store} name={props.name} required={props.required} index={props.index}
                   onChange={props?.onChange}
                   inputFieldComponent={ (inputProps : { name: keyof T["store"], required: boolean }, handleChange : (e: ChangeEvent<HTMLInputElement>) => void ) => (
                       <WrappedComponent {...props} store={store} {...inputProps} disabled={store.isSubmitted} value={typeof props?.index ==="number" ? store.getValue(props.name, props.index) : store.getValue(props.name) } onChange={handleChange} />
                   )}
            />
        )
    }
}

export default withField;