import { zip } from "lodash"

export class ArrayHelper {
    /**
     * Invokes the callback a specified number of times and returns the results as an array.
     * Example: ArrayHelper.times(5, () => { return Math.random() }) will return an array with 5 random numbers.
     * @param times 
     * @param mapCallback 
     */
    static times<T>(times: number, mapCallback: (index? :number) => T): T[] {
        return Array.from(Array(times).keys()).map(index => mapCallback(index))
    }
}