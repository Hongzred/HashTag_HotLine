export const listSettings = `query listSettings {
    listSettings { 
      items {
        id
        botMessage
        resolvedMessage
        hashtags {
          items {
            id
            name
          }
        }
      }
    }
  }`

export const listReports = `query ListReports {
  listReports(limit: 100) {
    items {
      date
      hashtags {
        items {
          hashtag {
            id
            name
          }
        }
      }
      id
      location {
        latitude
        longitude
      }
      post
      postId
      spam
      status
      userId
      username
      userScreenName
      userProfilePic
    }
  }    

}`
