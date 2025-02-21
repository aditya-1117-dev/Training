import { observable, computed, action, flow } from "mobx"

class Doubler {
    @observable accessor value

    constructor(value) {
        this.value = value
    }

    @computed
    get double() {
        return this.value * 2
    }

    @action
    increment() {
        this.value++
    }

    @flow
    *fetch() {
        const response = yield fetch("/api/value")
        this.value = response.json()
    }
}

import { makeAutoObservable } from "mobx"

function createDoubler(value) {
    return makeAutoObservable({
        value,
        get double() {
            return this.value * 2
        },
        increment() {
            this.value++
        }
    })
}