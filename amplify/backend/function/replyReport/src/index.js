/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const replyTweet = require("./replyTweet.js");

exports.handler = async (event, context) => { 
    try {
        const isSuccessful = await replyTweet(
            event.arguments.userScreenName,
            event.arguments.tweet,
            event.arguments.tweetId
        );
        context.done(null, isSuccessful)
    } catch (err) {
        context.done(err);
    }
};
