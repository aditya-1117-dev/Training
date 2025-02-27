import withField, {IWithFieldProps} from "../HOC/withField.tsx";
import Checkbox, {ICheckbox} from "./InputFields/CheckboxInput.tsx";
import JSONInput, {IJSONField} from "./InputFields/JSONInput.tsx";
import RadioInput, {IRadioInput} from "./InputFields/RadioInput.tsx";
import SelectInput, {ISelectInput} from "./InputFields/SelectInput.tsx";
import NumberInput, {INumberInput} from "./InputFields/NumberInput.tsx";
import StringInput, {IStringInput} from "./InputFields/StringInput.tsx";

export const StringField = withField<IWithFieldProps<any> & IStringInput<any>>((props : IStringInput<any> ) => (<StringInput {...props} />));
export const NumberField = withField<IWithFieldProps<any> & INumberInput<any>>((props : INumberInput<any> ) => (<NumberInput {...props} />));
export const SelectField = withField<IWithFieldProps<any> & ISelectInput<any>>((props: any ) => <SelectInput {...props} />);
export const CheckField = withField<IWithFieldProps<any> & ICheckbox<any>>((props: ICheckbox<any> ) => <Checkbox {...props} />);
export const RadioField = withField<IWithFieldProps<any> & IRadioInput<any>>((props: IRadioInput<any> ) => <RadioInput {...props} />);
export const JSONField = withField<IWithFieldProps<any> & IJSONField<any>>((props: any ) => <JSONInput {...props} />)