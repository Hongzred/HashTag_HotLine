require("dotenv").config();
const Twit = require("twit");

const T = new Twit({
    consumer_key: process.env.TWIT_CONSUMER_KEY,
    consumer_secret: process.env.TWIT_CONSUMER_SECRET,
    access_token: process.env.TWIT_ACCESS_TOKEN,
    access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET
});

const fetchTweets = async (hashtag) => {
    if(hashtag) {
        let json;
        let {data}  = await T.get("search/tweets", { q: hashtag, result_type: "recent" })
        try{
    
            json = data.statuses.map(jsonObject => {           
                
                return {
                    post_date_creation: jsonObject.created_at,
                    post_id: jsonObject.id_str,
                    post: jsonObject.text,
                    hashtags: jsonObject.entities.hashtags.map(obj => obj.text),
                    
                    user_id: jsonObject.user.id_str,
                    username: jsonObject.user.name,
                    location: {
                        longitude:
                            jsonObject.place.bounding_box.coordinates[0][0][0],
                        latitude: jsonObject.place.bounding_box.coordinates[0][0][1]
                    }
                };
            });
    
            
        }catch(err)  {
            return err.stack
        } finally {
            return json
        }
    } else {
        return []
    }  
    
}


export default fetchTweets