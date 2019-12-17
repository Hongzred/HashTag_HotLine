const puppeteer = require('puppeteer')

const person = {
	email: 'test22',
	password: 'password123',
}
const appUrlBase = 'https://master.d2nb81n0vt6kb5.amplifyapp.com'
const routes = {
	public: {
		login: appUrlBase,
	},
	private: {
		analytics: `${appUrlBase}/analytics`,
		documentation: `${appUrlBase}/feed`,
		settings: `${appUrlBase}/settings`,
	},
}

let browser
let page

beforeAll(async () => {
	// launch browser
	browser = await puppeteer.launch({
		headless: false, // headless mode set to false so browser opens up with visual feedback
		slowMo: 50, // how slow actions should be
	})
	// creates a new page in the opened browser
	page = await browser.newPage()
})

describe('Login', () => {
	test('users can login', async () => {
		await page.goto('https://master.d2nb81n0vt6kb5.amplifyapp.com')
		await page.waitForSelector('.Form__formSection___1PPvW')

		await page.click('input[name=username]')
		await page.type('input[name=username]', person.email)
		await page.click('input[name=password]')
		await page.type('input[name=password]', person.password)
		await page.click('button[type=submit]')

		await page.waitForSelector('.overlays')
		// await page.goto('routes.private.documentation');
		// await page.waitForSelector('.makeStyles-image__tweet-507');
		// await page.goto(routes.private.analytics);
		// await page.goto(routes.private.settings);
		await setTimeout(() => {}, 10000)
	}, 16000)
})

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
	browser.close()
})
