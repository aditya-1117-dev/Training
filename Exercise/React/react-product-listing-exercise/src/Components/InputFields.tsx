import withField from "../HOC/withField.tsx";
import Checkbox from "./InputFields/CheckboxInput.tsx";
import JSONInput from "./InputFields/JSONInput.tsx";
import RadioInput from "./InputFields/RadioInput.tsx";
import SelectInput from "./InputFields/SelectInput.tsx";
import NumberInput from "./InputFields/NumberInput.tsx";
import StringInput from "./InputFields/StringInput.tsx";

export const StringField = withField((props : any ) => (<StringInput {...props} />));
export const NumberField = withField((props : any ) => (<NumberInput {...props} />));
export const SelectField = withField((props: any ) => <SelectInput {...props} />);
export const CheckField = withField((props: any ) => <Checkbox {...props} />);
export const RadioField = withField((props: any ) => <RadioInput {...props} />);
export const JSONField = withField((props: any ) => <JSONInput {...props} />)