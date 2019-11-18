/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */
const AWS = require("aws-sdk");
const fetchTweets = require("./fetchTweets.js");

exports.handler = async (event, context) => {
    try {
        const tweets = await fetchTweets("testing_hth");
        console.log(tweets);
    } catch (err) {
        console.log(err);
    }
};
