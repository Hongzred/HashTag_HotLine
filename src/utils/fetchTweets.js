const T = require("./twitterConfig")

const fetchTweets = async (hashtag) => {
    if(hashtag) {
        let json;
        
        try{
            let {data}  = await T.get("search/tweets", { q: `#${hashtag}`, result_type: "recent" })
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