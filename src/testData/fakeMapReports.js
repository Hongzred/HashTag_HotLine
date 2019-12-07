const jsonData = [
	{
		_id: '5dc2f75ea5c32bb3c49a667f',
		report: 'laborum',
		description: 'excepteur anim exercitation dolor enim',
		location: { latitude: '40.8', longitude: '-73.9412' },
	},
	{
		_id: '5dc2f75ea0fd836214e9cf5f',
		report: 'cillum',
		description: 'veniam pariatur ea amet ea',
		location: { latitude: '40.81', longitude: '-73.9549' },
	},
	{
		_id: '5dc2f75e8da3f4e4a18d8826',
		report: 'esse',
		description: 'labore ipsum quis elit sint',
		location: { latitude: '40.71', longitude: '-73.9781' },
	},
	{
		_id: '5dc2f75ebeda609c25516395',
		report: 'excepteur',
		description: 'enim elit aliqua aute aute',
		location: { latitude: '40.82', longitude: '-73.9754' },
	},
	{
		_id: '5dc2f75eb33f30dbe9719ead',
		report: 'reprehenderit',
		description: 'labore ipsum id ex anim',
		location: { latitude: '40.73', longitude: '-73.9307' },
	},
	{
		_id: '5dc2f75ea56f1ea4afa19815',
		report: 'duis',
		description: 'mollit officia do ea qui',
		location: { latitude: '40.76', longitude: '-73.9775' },
	},
	{
		_id: '5dc2f75e2b378e68cdd91ed0',
		report: 'veniam',
		description: 'deserunt tempor velit cillum excepteur',
		location: { latitude: '40.81', longitude: '-73.9444' },
	},
	{
		_id: '5dc2f75ef78d59c4f0217340',
		report: 'non',
		description: 'ex laboris laborum amet esse',
		location: { latitude: '40.74', longitude: '-73.9994' },
	},
	{
		_id: '5dc2f75e8f1fb57b475f95ac',
		report: 'amet',
		description: 'pariatur commodo enim laborum fugiat',
		location: { latitude: '40.77', longitude: '-73.9049' },
	},
	{
		_id: '5dc2f75eed98a9973ab2a73f',
		report: 'voluptate',
		description: 'ad eu consequat ipsum in',
		location: { latitude: '40.81', longitude: '-73.9149' },
	},
	{
		_id: '5dc2f75ed5965c4174e9392c',
		report: 'velit',
		description: 'veniam ea do consectetur Lorem',
		location: { latitude: '40.8', longitude: '-73.9656' },
	},
	{
		_id: '5dc2f75ea9504266fb1a6d78',
		report: 'consectetur',
		description: 'deserunt et enim incididunt ad',
		location: { latitude: '40.72', longitude: '-73.9475' },
	},
	{
		_id: '5dc2f75eb4a48e5d7a36ec02',
		report: 'nostrud',
		description: 'culpa in est velit sunt',
		location: { latitude: '40.76', longitude: '-73.995' },
	},
	{
		_id: '5dc2f75e7b399f92b7897975',
		report: 'labore',
		description: 'exercitation cupidatat commodo qui occaecat',
		location: { latitude: '40.78', longitude: '-73.9745' },
	},
]

const fakeReports = () => {
	return jsonData.map(data => ({
		...data,
		longitude: parseFloat(data.longitude),
		latitude: parseFloat(data.latitude),
	}))
}

export default fakeReports
