import {action, makeObservable, observable} from "mobx";

export class FormStore<T> {
    @observable formData: T;
    @observable validateKeys: { [K in keyof T]: boolean | boolean[] } = {} as { [K in keyof T]: boolean };
    @observable errors: Record<keyof T, string | string[]> = {} as { [K in keyof T]: string | string[] };
    @observable isSubmitted: boolean = false;
    private errorMessage: string = "REQUIRED";

    constructor(initialState: T, onSubmit?: Function) {
        makeObservable(this);
        this.formData = initialState;
        if (onSubmit) {
            this.onSubmit = onSubmit;
        }
    }

    @observable onSubmit: Function = () => {
    };

    @action
    setError(key: keyof T, error: string) {
        this.errors[key] = error;
    }

    getErrorMessage(key: keyof T, index?: number) {
        return (typeof index === "number" && Array.isArray(this.errors[key]))
            ? this.errors[key][index]
            : this.errors[key]
    }

    hasKey<K extends keyof T>(key: K): boolean {
        return typeof this.formData === 'object'
            ? (this.formData
                ? this.formData.hasOwnProperty(key)
                : false)
            : false;
    }

    @action
    setOnSubmitCallBack(onSubmit: Function) {
        this.onSubmit = onSubmit;
    }

    @action
    setValue<K extends keyof T>(key: K, value: T[K], index?: number) {
        if (typeof index === "number") {
            if (Array.isArray(this.formData[key])) {
                this.formData[key][index] = value
            }
            if (Array.isArray(this.errors[key]) && this.errors[key][index]) {
                this.errors[key][index] = ``;
            }
        } else {
            this.formData[key] = value;
            if (this.errors[key]) {
                this.errors[key] = "";
            }
        }
    }

    @action
    pushValue<K extends keyof T>(key: K, value: T[K]) {
        if (Array.isArray(this.formData[key])) {
            const array = this.formData[key];
            array.push(value);
            this.setValue(key, array);
        }
    }

    @action
    removeItemFromArray<K extends keyof T>(key: K, index: number) {
        if (Array.isArray(this.formData[key])) {
            this.formData[key] = this.formData[key].filter(( _ , idx) => index != idx) as T[K];
        }
    }

    @action
    setRequired<K extends keyof T>(key: K, status: boolean, index?: number) {
        if (typeof index === "number") {
            if (!Array.isArray(this.validateKeys[key])) this.validateKeys[key] = [];
            this.validateKeys[key][index] = status;
        } else {
            this.validateKeys[key] = status;
        }
    }

    @action
    setSubmissionStatus(status: boolean) {
        this.isSubmitted = status;
    }

    @action
    resetForm() {
        for (const key in this.formData) {
            if (Array.isArray(this.formData[key])) {
                (this.validateKeys[key] === true)
                    ? this.formData[key] = [] as T[typeof key] // check-box array
                    : this.formData[key] = this.formData[key].map(() => ``) as T[typeof key] // JSON Array
            } else {
                this.formData[key] = "" as T[typeof key];
            }
        }
        this.errors = {} as Record<keyof T, string>;
        if (this.isSubmitted) this.isSubmitted = false;
    }

    @action
    submitForm() {
        if (this.validate()) {
            this.setSubmissionStatus(true);
            if (this.onSubmit) {
                this.onSubmit(this.formData);
            }
        }
    }

    getValue<K extends keyof T>(key: K, index?: number): T[K] {
        if (typeof index === "number") {
            return Array.isArray(this.formData[key])
                ? this.formData[key][index]
                : ("" as T[K]);
        }
        return this.formData[key] ?? ("" as T[K]);
    }

    @action
    validate(): boolean {
        let valid = true;

        for (const key in this.formData) {
            if (!this.validateKeys[key]) continue;
            if (!Array.isArray(this.errors[key]) && this.errors[key]) valid = false;

            if (!Array.isArray(this.validateKeys[key]) && Array.isArray(this.formData[key])) { // for checkbox
                if (this.formData[key].length === 0) {
                    this.errors[key] = this.errorMessage;
                    valid = false;
                }
            } else if (Array.isArray(this.formData[key])) { // for JSON input & checkbox
                if (!Array.isArray(this.errors[key])) {
                    this.errors[key] = new Array(this.formData[key].length);
                }
                this.formData[key].map((value, idx) => {
                    if (value !== ``) {
                        (this.errors[key] as string[])[idx] = ``;
                        return;
                    }
                    (this.errors[key] as string[])[idx] = this.errorMessage;
                    valid = false;
                })
            } else if (!this.formData[key]?.toString()?.trim()?.length) { // for string, numbers
                this.errors[key] = this.errorMessage;
                valid = false;
            }
        }
        return valid;
    }
}