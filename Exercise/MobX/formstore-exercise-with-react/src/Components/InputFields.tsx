import withField, {IWithFieldProps} from "../HOC/withField.tsx";
import RadioInput, {IRadioInput} from "./InputFields/RadioInput.tsx";
import Checkbox, {ICheckbox} from "./InputFields/CheckboxInput.tsx";
import SelectInput, {ISelectInput} from "./InputFields/SelectInput.tsx";
import NumberInput, {INumberInput} from "./InputFields/NumberInput.tsx";
import StringInput, {IStringInput} from "./InputFields/StringInput.tsx";
import JSONInput, {IJSONField} from "./InputFields/JSONInput.tsx";

export const StringField = withField<IStringInput & IWithFieldProps>((props: IStringInput) => (
    <StringInput {...props} />));
export const NumberField = withField<IWithFieldProps & INumberInput>((props: INumberInput) => (
    <NumberInput {...props} />));
export const SelectField = withField<IWithFieldProps & ISelectInput>((props: ISelectInput) =>
    <SelectInput {...props} />);
export const CheckField = withField<IWithFieldProps & ICheckbox>((props: ICheckbox) => <Checkbox {...props} />);
export const RadioField = withField<IWithFieldProps & IRadioInput>((props: IRadioInput) => <RadioInput {...props} />);
export const JSONField = withField<IWithFieldProps & IJSONField>((props: IJSONField) => <JSONInput {...props} />)