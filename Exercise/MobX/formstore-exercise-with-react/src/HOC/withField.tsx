import Field, {IField} from "../Components/Field.tsx";
import {IFormStore} from "../App.tsx";
import {ChangeEvent, useContext} from "react";
import {FormStoreContext} from "../Context/FormContext.tsx";

interface IWithFieldProps extends IField {
    options?: any;
}

function withField(WrappedComponent: any, type : any ) {
    return (props : IWithFieldProps ) => {
        const store = useContext(FormStoreContext) || props?.store;
        return (
            <>
                {store.hasKey(props.name) &&
                    <Field label={props.label} store={store} name={props.name} required={props.required}
                           onChange={props?.onChange}
                           component={(inputProps : { name: keyof IFormStore, required: boolean }, handleChange : (e: ChangeEvent<HTMLInputElement>, key: keyof IFormStore) => void ) => (
                               <WrappedComponent {...inputProps} type={type} value={store.getValue(props.name)} onChange={handleChange} disabled={store.isSubmitted} options={props?.options}/>
                           )}
                    />
                }
            </>
        )
    }
}
export default withField;