import {action, makeObservable, observable} from "mobx";

export class FormStore<T> {
    @observable formData: {
        [K in keyof T]: {
            value: T[K],
            required: boolean
        }
    } = {} as {
        [K in keyof T]: {
            value: T[K],
            required: boolean
        };
    };
    @observable errors: { [K in keyof T]?: string } = {} as { [K in keyof T]?: string };
    @observable isSubmitted: boolean = false;
    private errorMessage: string = "REQUIRED";

    constructor(initialState: T) {
        makeObservable(this);
        for (const key in initialState) {
            this.formData[key] = {value: initialState[key], required: false};
        }
    }

    @action
    setValue<K extends keyof T>(key: K, value: T[K], required: boolean = false) {
        if (this.formData[key]) {
            this.formData[key].value = value;
            this.formData[key].required = required;
        }
    }

    @action
    setRequired<K extends keyof T>(key: K, status: boolean) {
        if (this.formData[key]) {
            this.formData[key].required = status;
        }
    }

    @action
    setSubmissionStatus(status: boolean) {
        this.isSubmitted = status;
    }

    @action
    resetForm() {
        for (const key in this.formData) {
            if (typeof this.formData[key].value === "number") {
                this.formData[key].value = 0 as T[typeof key];
            } else {
                this.formData[key].value = "" as T[typeof key];
            }
        }
        this.errors = {};
        if (this.isSubmitted) this.isSubmitted = false;
    }

    @action
    submitForm() {
        if (this.validate()) {
            this.isSubmitted = true;
        }
    }

    getValue<K extends keyof T>(key: K): T[K] {
        return this.formData[key]?.value ?? ("" as T[K]);
    }

    @action
    validate(): boolean {
        let valid = true;
        this.errors = {} as { [K in keyof T]?: string };
        for (const key in this.formData) {
            if (this.formData[key].required && !this.formData[key]?.value?.toString()?.trim()?.length) {
                this.errors[key] = this.errorMessage;
                valid = false;
            }
        }
        return valid;
    }
}