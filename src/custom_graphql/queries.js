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
        username 
        longtitude 
        latitude
        post
      }
    }
  }`
