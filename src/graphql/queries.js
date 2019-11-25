/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHashtag = `query GetHashtag($id: ID!) {
  getHashtag(id: $id) {
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
export const listHashtags = `query ListHashtags(
  $filter: ModelHashtagFilterInput
  $limit: Int
  $nextToken: String
) {
  listHashtags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getReport = `query GetReport($id: ID!) {
  getReport(id: $id) {
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
export const listReports = `query ListReports(
  $filter: ModelReportFilterInput
  $limit: Int
  $nextToken: String
) {
  listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        nextToken
      }
      status
      spam
      owner
    }
    nextToken
  }
}
`;
export const getSetting = `query GetSetting($id: ID!) {
  getSetting(id: $id) {
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
export const listSettings = `query ListSettings(
  $filter: ModelSettingFilterInput
  $limit: Int
  $nextToken: String
) {
  listSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      botMessage
      hashtags {
        nextToken
      }
      owner
    }
    nextToken
  }
}
`;
