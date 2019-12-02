/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateHashtag = `subscription OnCreateHashtag($owner: String!) {
  onCreateHashtag(owner: $owner) {
    id
    name
    setting {
      id
      botMessage
      hashtags {
        nextToken
      }
      owner
    }
    reports {
      items {
        id
        owner
      }
      nextToken
    }
    owner
  }
}
`
export const onUpdateHashtag = `subscription OnUpdateHashtag($owner: String!) {
  onUpdateHashtag(owner: $owner) {
    id
    name
    setting {
      id
      botMessage
      hashtags {
        nextToken
      }
      owner
    }
    reports {
      items {
        id
        owner
      }
      nextToken
    }
    owner
  }
}
`
export const onDeleteHashtag = `subscription OnDeleteHashtag($owner: String!) {
  onDeleteHashtag(owner: $owner) {
    id
    name
    setting {
      id
      botMessage
      hashtags {
        nextToken
      }
      owner
    }
    reports {
      items {
        id
        owner
      }
      nextToken
    }
    owner
  }
}
`
export const onCreateReport = `subscription OnCreateReport($owner: String!) {
  onCreateReport(owner: $owner) {
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
        id
        owner
      }
      nextToken
    }
    status
    spam
    owner
  }
}
`
export const onUpdateReport = `subscription OnUpdateReport($owner: String!) {
  onUpdateReport(owner: $owner) {
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
        id
        owner
      }
      nextToken
    }
    status
    spam
    owner
  }
}
`
export const onDeleteReport = `subscription OnDeleteReport($owner: String!) {
  onDeleteReport(owner: $owner) {
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
        id
        owner
      }
      nextToken
    }
    status
    spam
    owner
  }
}
`
export const onCreateReportHashtags = `subscription OnCreateReportHashtags($owner: String!) {
  onCreateReportHashtags(owner: $owner) {
    id
    report {
      id
      postId
      post
      userId
      username
      date
      longtitude
      latitude
      hashtags {
        nextToken
      }
      status
      spam
      owner
    }
    hashtag {
      id
      name
      setting {
        id
        botMessage
        owner
      }
      reports {
        nextToken
      }
      owner
    }
    owner
  }
}
`
export const onUpdateReportHashtags = `subscription OnUpdateReportHashtags($owner: String!) {
  onUpdateReportHashtags(owner: $owner) {
    id
    report {
      id
      postId
      post
      userId
      username
      date
      longtitude
      latitude
      hashtags {
        nextToken
      }
      status
      spam
      owner
    }
    hashtag {
      id
      name
      setting {
        id
        botMessage
        owner
      }
      reports {
        nextToken
      }
      owner
    }
    owner
  }
}
`
export const onDeleteReportHashtags = `subscription OnDeleteReportHashtags($owner: String!) {
  onDeleteReportHashtags(owner: $owner) {
    id
    report {
      id
      postId
      post
      userId
      username
      date
      longtitude
      latitude
      hashtags {
        nextToken
      }
      status
      spam
      owner
    }
    hashtag {
      id
      name
      setting {
        id
        botMessage
        owner
      }
      reports {
        nextToken
      }
      owner
    }
    owner
  }
}
`
export const onCreateSetting = `subscription OnCreateSetting($owner: String!) {
  onCreateSetting(owner: $owner) {
    id
    botMessage
    hashtags {
      items {
        id
        name
        owner
      }
      nextToken
    }
    owner
  }
}
`
export const onUpdateSetting = `subscription OnUpdateSetting($owner: String!) {
  onUpdateSetting(owner: $owner) {
    id
    botMessage
    hashtags {
      items {
        id
        name
        owner
      }
      nextToken
    }
    owner
  }
}
`
export const onDeleteSetting = `subscription OnDeleteSetting($owner: String!) {
  onDeleteSetting(owner: $owner) {
    id
    botMessage
    hashtags {
      items {
        id
        name
        owner
      }
      nextToken
    }
    owner
  }
}
`
