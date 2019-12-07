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
  
})