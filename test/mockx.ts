import * as mobx from "mobx"

// With help from https://github.com/abrindam

// This only returns functions, not properties
function getAllPropertyNames(obj: any): string[] {
    let props: string[] = []
    do {
        if (obj == Object.prototype) {
            break
        }
        props = props.concat(Object.getOwnPropertyNames(obj))
    } while (obj = Object.getPrototypeOf(obj))
    return props
}

function getValueIgnoringGetters(obj: any, property: string | number | symbol): any | undefined {
    do {
        const descriptor = Object.getOwnPropertyDescriptor(obj, property)
        if (descriptor) {
            return descriptor.value
        }
    } while (obj = Object.getPrototypeOf(obj))
    return undefined
}

type Constructor<T> = Function & { prototype: T }
type NoArgConstructor<T> = {new (): T}

function mock<T>(classObject: Constructor<T>): NoArgConstructor<T> {
    const functionsToMock: string[] = []
    const observableProperties: any = {}
    getAllPropertyNames(classObject.prototype).forEach((property) => {
        if (mobx.isObservableProp(classObject.prototype, property)) {
            observableProperties[property] = undefined
        } else if (mobx.isComputedProp(classObject.prototype, property)) {
            observableProperties[property] = undefined
        } else {
            const value = getValueIgnoringGetters(classObject.prototype, property)
            if (typeof value === "function") {
                functionsToMock.push(property)
            }
        }
    })

    const mockConstructor = function() {
        mobx.extendObservable(this, observableProperties)
        functionsToMock.forEach((functionProperty) => {
            this[functionProperty] = jest.fn()
        })
    }

    return mockConstructor as unknown as NoArgConstructor<T>
}

// Can't use keyof T with defaultValues yet; see https://github.com/Microsoft/TypeScript/pull/26797
function createMock<T>(classObject: Constructor<T>, observableProperties: (keyof T)[] = [], defaultValues: { [property: string]: any } = {}): NoArgConstructor<T> {
    const functionsToMock: string[] = []
    getAllPropertyNames(classObject.prototype).forEach((property) => {
        const value = getValueIgnoringGetters(classObject.prototype, property)
        if (typeof value === "function") {
            functionsToMock.push(property)
        }
    })

    const _observableProperties: any = {}
    observableProperties.forEach((property) => {
        _observableProperties[property] = undefined
    })

    const mockConstructor = function() {
        mobx.extendObservable(this, _observableProperties)
        functionsToMock.forEach((functionProperty) => {
            this[functionProperty] = jest.fn()
        })
        Object.getOwnPropertyNames(defaultValues).forEach((property) => {
            this[property] = defaultValues[property]
        })
    }

    return mockConstructor as unknown as NoArgConstructor<T>
}

// e.g. mockxt.mockReadonlyProperty(gameManager, "size", 4)
function mockReadonlyProperty<T extends Object>(object: T, propertyName: keyof T, value: any): void {
    if (object.hasOwnProperty(propertyName)) {
        object[propertyName] = value
    } else if (object[propertyName] == undefined) {
        Object.defineProperty(object, propertyName, {
            get: () => { return value },
            enumerable: true,
            configurable: true
        })
    }
}

export const mockx = {
    createMock: createMock,
    mockReadonlyProperty: mockReadonlyProperty
}

// Strict mode requires observable values to be changed using an action
// but we want to set a mock's observable values directly
mobx.configure({enforceActions: "never"})
// mobx.configure({isolateGlobalState: true})