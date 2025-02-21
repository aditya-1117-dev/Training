import { useContext} from "react";
import {IProductData} from "../Pages/AddNewProduct/ProductForm.tsx";
import {FormStore} from "../stores/formStore.tsx";
import {formStoreContext} from "../context/formContext.tsx";
import Field from "../Components/Field.tsx";

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
        const store = useContext(formStoreContext) || props?.store;
        if (!store.hasKey(props.name)) return <h6>Given field is not initialized</h6>;
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