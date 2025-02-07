import withField from "../HOC/withField.tsx";
import Input from "./Input.tsx";

export const StringField = withField( Input, "text");

export const NumberField = withField( Input, "number");

export const SelectField = withField( Input, "select");

export const RadioField = withField( Input, "radio");

export const CheckField = withField( Input, "checkbox");