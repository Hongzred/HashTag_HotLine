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
        id
        postId
        post
        userId
        username
        date
        longtitude
        latitude
        hashtags {
          items {
            hashtag {
              id
              name
            }
          }
        }
        status
        spam        
      }
    }
  }
  `;