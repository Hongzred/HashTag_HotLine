import symmetricDifference from '../utils/symmetricDifference'

describe('The symmetric difference between 2 arrays', () => {
	it('returns the second array if the first array is empty', () => {
        const a = []
        const b = [1,2,3]
        const result = symmetricDifference(a,b)
        expect(result).toEqual(b)
	})

    it('returns the first array if the second array is empty', () => {
        const a = [1,2,3]
        const b = []
        const result = symmetricDifference(b,a)
        expect(result).toEqual(a)
    })
    
    it('returns an empty array if both arrays are the same', () => {
        const a = [1,2,3]
        const b = [1,2,3]
        const result = symmetricDifference(b,a)
        expect(result).toEqual([])
	})

	it('returns elements in array1 that are not in array2 if array2 is a subset of array1.', async () => {
        const array1 = [1,2,3]
        let array2 = [2,3]
        let result = symmetricDifference(array1,array2)
        expect(result).toEqual([1])
        array2 = [3]
        result = symmetricDifference(array1,array2)
        expect(result).toEqual([1,2])	
    })
    
    it('returns elements in array2 that are not in array1 if array1 is a subset of array2.', async () => {
        const array1 = [1,2]
        let array2 = [1,2,3]
        let result = symmetricDifference(array1,array2)
        expect(result).toEqual([3])
        array2 = [1]
        result = symmetricDifference(array1,array2)
        expect(result).toEqual([2])	
	})
})