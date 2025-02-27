import withField from "../HOC/withField.tsx";
import Checkbox, {ICheckbox} from "./InputFields/CheckboxInput.tsx";
import JSONInput, {IJSONField} from "./InputFields/JSONInput.tsx";
import RadioInput, {IRadioInput} from "./InputFields/RadioInput.tsx";
import SelectInput, {ISelectInput} from "./InputFields/SelectInput.tsx";
import NumberInput, {INumberInput} from "./InputFields/NumberInput.tsx";
import StringInput, {IStringInput} from "./InputFields/StringInput.tsx";

export const StringField = withField((props : IStringInput ) => (<StringInput {...props} />));
export const NumberField = withField((props : INumberInput ) => (<NumberInput {...props} />));
export const SelectField = withField((props: ISelectInput ) => <SelectInput {...props} />);
export const CheckField = withField((props: ICheckbox ) => <Checkbox {...props} />);
export const RadioField = withField((props: IRadioInput ) => <RadioInput {...props} />);
export const JSONField = withField((props: IJSONField ) => <JSONInput {...props} />)