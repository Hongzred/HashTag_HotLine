export const listSettings = `query listSettings {
    listSettings { 
      items {
        id
        botMessage
        hashtags {
          items {
            id
            name
          }
        }
      }
    }
  }`

export const listReports = `query listReports {
  listReports {
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
    }
  }    

}`
