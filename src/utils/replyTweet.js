const T = require("./twitterConfig")

const replyTweet = async (userScreenName,tweet, tweetId) => {
    if(tweetId && userScreenName) {
        return true
    } 
    return false
}

export default replyTweet
