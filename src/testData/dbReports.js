const dbReports = {
    "data": {
        "listReports": {
          "items": [
            {
              "date": "Wed Dec 04 14:12:00 +0000 2019",
              "hashtags": {
                "items": [
                  {
                    "hashtag": {
                      "id": "8b673219-9e47-44f0-9e6b-9d857096785a",
                      "name": "accident_hth_test"
                    }
                  }
                ]
              },
              "id": "1e5de4aa-ab71-4a99-81bc-08f58ef3586f",
              "location": {
                "latitude": 40.656079999999996,
                "longitude": -73.915304
              },
              "post": "#accident_hth_test Bus accident.",
              "postId": "1202229065081610242",
              "spam": false,
              "status": "PENDING",
              "userId": "1187559230414434304",
              "username": "HashTagHotline"
            },
            {
              "date": "Wed Dec 04 14:31:58 +0000 2019",
              "hashtags": {
                "items": [
                  {
                    "hashtag": {
                      "id": "8b673219-9e47-44f0-9e6b-9d857096785a",
                      "name": "accident_hth_test"
                    }
                  }
                ]
              },
              "id": "e227c0a4-8bf1-4c91-8438-b51518ad886b",
              "location": {
                "latitude": 40.74195143555109,
                "longitude": -73.98936868406889
              },
              "post": "#accident_hth_test Tree fall..",
              "postId": "1202234090461810691",
              "spam": false,
              "status": "PENDING",
              "userId": "1187559230414434304",
              "username": "HashTagHotline"
            }]
}}}

const twitterReports = {
  "data": {
    "fetchRecentReports": [
      {
        "postDate": "Wed Dec 04 14:12:00 +0000 2019",
        "postId": "1202229065081610242",
        "post": "#accident_hth_test Bus accident.",
        "hashtags": [
          "accident_hth_test"
        ],
        "userId": "1187559230414434304",
        "username": "HashTagHotline",
        "location": {
          "longitude": -73.915304,
          "latitude": 40.656079999999996
        }
      },
      {
        "postDate": "Wed Dec 04 14:31:58 +0000 2019",
        "postId": "1202234090461810691",
        "post": "#accident_hth_test Tree fall..",
        "hashtags": [
          "accident_hth_test"
        ],
        "userId": "1187559230414434304",
        "username": "HashTagHotline",
        "location": {
          "longitude": -73.98936868406889,
          "latitude": 40.74195143555109
        }
      },
      
    ]
  }
}


export  {dbReports, twitterReports}