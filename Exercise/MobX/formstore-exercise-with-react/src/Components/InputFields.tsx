import withField from "../HOC/withField.tsx";
import RadioInput from "./InputFields/RadioInput.tsx";
import Checkbox from "./InputFields/Checkbox.tsx";
import SelectInput from "./InputFields/SelectInput.tsx";
import NumberInput from "./InputFields/NumberInput.tsx";
import StringInput from "./InputFields/StringInput.tsx";

export const StringField = withField( ({name, value, onChange, disabled, required}: any) => (<StringInput disabled={disabled} required={required} onChange={onChange} name={name} value={value} />) );

export const NumberField = withField( ({name, value, onChange, disabled, required}: any) => (<NumberInput disabled={disabled} required={required} onChange={onChange} name={name} value={value} />) );

export const SelectField = withField( ({options, name, value, required, onChange, disabled}: any) => <SelectInput disabled={disabled} value={value} required={required} name={name} options={options} onChange={onChange} />);

export const CheckField = withField( ({options, name, disabled}: any) => <Checkbox disabled={disabled} name={name} options={options} />);

export const RadioField = withField(  ({options, name, disabled}: any) => <RadioInput disabled={disabled} name={name} options={options} /> );