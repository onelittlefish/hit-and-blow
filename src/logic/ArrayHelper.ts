import { zip } from "lodash"

export class ArrayHelper {
    /**
     * Invokes the callback a specified number of times and returns the results as an array.
     * Example: ArrayHelper.times(5, () => { return Math.random() }) will return an array with 5 random numbers.
     * @param times 
     * @param mapCallback 
     */
    static times<T>(times: number, mapCallback: () => T): T[] {
        return Array.from(Array(times)).map(_ => mapCallback())
    }

    /**
     * Invokes the callback for each element in the array, passing the element and its index in the array.
     * Example: ArrayHelper.enumeratedMap(["a", "b", "c"], (element, index) => { return element + index })
     * will return ["a0", "b1", "c2"].
     * @param array 
     * @param mapCallback 
     */
    static enumeratedMap<T, U>(array: T[], mapCallback: (element: T, index: number) => U): U[] {
        const indices = Array.from(Array(array.length).keys())
        return zip(array, indices).map(zipped => { return mapCallback(zipped[0], zipped[1]) })
    }
}