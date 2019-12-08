export default (arr1, arr2) => {
	return arr1
		.filter(x => arr2.includes(x))
}