import withField from "../HOC/withField.tsx";
import RadioInput, {IRadioInput} from "./InputFields/RadioInput.tsx";
import Checkbox, {ICheckbox} from "./InputFields/Checkbox.tsx";
import SelectInput, {ISelectInput} from "./InputFields/SelectInput.tsx";
import NumberInput, {INumberInput} from "./InputFields/NumberInput.tsx";
import StringInput, {IStringInput} from "./InputFields/StringInput.tsx";

export const StringField = withField<IStringInput>( (props:IStringInput) =>(<StringInput {...props} />));
export const NumberField = withField<INumberInput>( (props:INumberInput) =>(<NumberInput {...props} />));
export const SelectField = withField<ISelectInput>( (props:ISelectInput) =><SelectInput {...props} />);
export const CheckField = withField<ICheckbox>( (props:ICheckbox) =><Checkbox {...props} />);
export const RadioField = withField<IRadioInput>( (props:IRadioInput) =><RadioInput {...props} />);

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

export const JSONField = ( params : { props : object[] | number[] | string[]} ) : JSX.Element | JSX.Element[] =>{
    const {props} = params;
    if (Array.isArray(props) && props.length > 0) {
        const firstItem = props[0];
        if (typeof firstItem === "string") {
            return props.map((item, index) => {
                return <StringField key={index} name={item} index={index} label={item.toString()} required={false} />;
            });
        } else if (typeof firstItem === "number") {
            return props.map((item, index) => {
                return <NumberField key={index} index={index} name={item.toString()} label={item.toString()} required={false} />;
            });
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

// export const renderField = (type: string, props: any) => {
//     const Component = FieldComponents[type];
//     return Component ? <Component {...props} /> : null;
// };
{/*{(renderField("string", {name:"firstName", label:"First Name", required:true }))}*/}
{/*{(renderField("number", {name:"age", label:"Your Age", required:false, min:2, max:5} ))}*/}
{/*{(renderField("select", {label:"Select Input :", name:"select", required:true, options:[{value: 'null', label: 'Select the Value'},{value: 'abc', label: 'abc'}, {value: 'bcd', label: 'bcd'}, {value: 'efg', label: 'efg'}] }))}*/}
{/*{(renderField("checkbox", {label:"country", name:"country", required:true, options:[{value: 'IND', label: 'IND'}, {value: 'UK', label: 'UK'} ] }))}*/}
{/*{(renderField("radio", {label:"Gender", name:"gender", required:true, options:[{value: 'Male', label: 'Male'}, {value: 'Female', label: 'Female'} ] }))}*/}