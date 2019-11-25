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

