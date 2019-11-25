/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHashtag = `mutation CreateHashtag($input: CreateHashtagInput!) {
  createHashtag(input: $input) {
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
`;
export const updateHashtag = `mutation UpdateHashtag($input: UpdateHashtagInput!) {
  updateHashtag(input: $input) {
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
`;
export const deleteHashtag = `mutation DeleteHashtag($input: DeleteHashtagInput!) {
  deleteHashtag(input: $input) {
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
`;
export const createReport = `mutation CreateReport($input: CreateReportInput!) {
  createReport(input: $input) {
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
`;
export const updateReport = `mutation UpdateReport($input: UpdateReportInput!) {
  updateReport(input: $input) {
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
`;
export const deleteReport = `mutation DeleteReport($input: DeleteReportInput!) {
  deleteReport(input: $input) {
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
`;
export const createReportHashtags = `mutation CreateReportHashtags($input: CreateReportHashtagsInput!) {
  createReportHashtags(input: $input) {
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
`;
export const updateReportHashtags = `mutation UpdateReportHashtags($input: UpdateReportHashtagsInput!) {
  updateReportHashtags(input: $input) {
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
`;
export const deleteReportHashtags = `mutation DeleteReportHashtags($input: DeleteReportHashtagsInput!) {
  deleteReportHashtags(input: $input) {
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
`;
export const createSetting = `mutation CreateSetting($input: CreateSettingInput!) {
  createSetting(input: $input) {
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
`;
export const updateSetting = `mutation UpdateSetting($input: UpdateSettingInput!) {
  updateSetting(input: $input) {
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
`;
export const deleteSetting = `mutation DeleteSetting($input: DeleteSettingInput!) {
  deleteSetting(input: $input) {
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
`;
