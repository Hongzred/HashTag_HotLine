function Twit() {}
Twit.prototype.get = jest.fn(() => Promise.resolve({ data: {} }))
Twit.prototype.post = jest.fn(() => Promise.resolve({ data: {} }))

module.exports = Twit
