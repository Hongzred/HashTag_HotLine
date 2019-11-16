const Twit = require("twit");
import replyTweet from "./replyTweet";

it("doesnt reply to tweet when receiving no screen name", async () => {
    let isSuccessful = await replyTweet(
        undefined,
        "Response test2",
        "1195487067985371136"
    );
    expect(isSuccessful).toBe(false);
    expect(Twit.prototype.post).toHaveBeenCalledTimes(0);
});

it("doesnt reply to tweet when receiving no tweet id", async () => {
    let isSuccessful = await replyTweet("TagHotline", "Response test2");
    expect(isSuccessful).toBe(false);
    expect(Twit.prototype.post).toHaveBeenCalledTimes(0);
});

