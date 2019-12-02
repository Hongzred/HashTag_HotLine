// This return the differences between 2 arrays
export default (arr1, arr2) => {
	return arr1
		.filter(x => !arr2.includes(x))
		.concat(arr2.filter(x => !arr1.includes(x)))
}
