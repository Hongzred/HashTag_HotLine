/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTweet = `query GetTweet($id: ID!) {
  getTweet(id: $id) {
    id
    name
    description
    latitude
    lontitude
  }
}
`;
export const listTweets = `query ListTweets(
  $filter: ModeltweetFilterInput
  $limit: Int
  $nextToken: String
) {
  listTweets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      latitude
      lontitude
    }
    nextToken
  }
}
`;
