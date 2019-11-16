const T = require("./twitterConfig")

const replyTweet = async (userScreenName,tweet, tweetId) => {
    if(tweetId && userScreenName) {
        try {
            let response = await T.post('statuses/update', { in_reply_to_status_id: tweetId, status: `@${userScreenName} ${tweet}`})
        }catch(err){
            return false
        }finally{
            return true
        }
    } 
    return false
}

export default replyTweet
