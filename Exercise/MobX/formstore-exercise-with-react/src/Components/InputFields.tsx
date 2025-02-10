import withField, {IWithFieldProps} from "../HOC/withField.tsx";
import RadioInput, {IRadioInput} from "./InputFields/RadioInput.tsx";
import Checkbox, {ICheckbox} from "./InputFields/Checkbox.tsx";
import SelectInput, {ISelectInput} from "./InputFields/SelectInput.tsx";
import NumberInput, {INumberInput} from "./InputFields/NumberInput.tsx";
import StringInput, {IStringInput} from "./InputFields/StringInput.tsx";
import {Fragment} from "react";

export const StringField = withField<IStringInput & IWithFieldProps> ( (props:IStringInput) =>(<StringInput {...props} />));
export const NumberField = withField<IWithFieldProps & INumberInput>( (props:INumberInput) =>(<NumberInput {...props} />));
export const SelectField = withField<IWithFieldProps & ISelectInput>( (props:ISelectInput) =><SelectInput {...props} />);
export const CheckField = withField<IWithFieldProps & ICheckbox>( (props:ICheckbox) =><Checkbox {...props} />);
export const RadioField = withField<IWithFieldProps & IRadioInput>( (props:IRadioInput) =><RadioInput {...props} />);

interface IFieldComponents {
    [key : string]: (props: any) => JSX.Element;
}
export const FieldComponents : IFieldComponents  = {
    "string": StringField,
    "number": NumberField,
    "select": SelectField,
    "checkbox": CheckField,
    "radio": RadioField,
};

export const JSONField = ({props, renderField } : {  props : object[] | number[] | string[], renderField? : Function } ) : JSX.Element | JSX.Element[] =>{
    if (renderField){
        if (Array.isArray(props) && props.length > 0) {
            return props.map((item, index) => (
                <Fragment key={index}>{renderField(item, index)}</Fragment>
            ));
        }
    }
    return (
        <>
            {Array.isArray(props) &&
                props.map( (items : any, index : number)=> {
                    const type = items?.type;
                    switch ( type) {
                        case "string":
                        case "number":
                        case "select":
                        case "checkbox":
                        case "radio": {
                            const Component = FieldComponents[type];
                            return <Component index={index} key={items.name+index} {...items} />;
                        }
                            break;
                        default : <> Error </>
                    }
                })
            }
        </>
    )
};