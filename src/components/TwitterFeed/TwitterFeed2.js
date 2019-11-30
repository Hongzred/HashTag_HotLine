import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tweet from './Tweet'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function TwitterFeed() {
  const classes = useStyles();

  const dummy_data = [{full_name: "Remy Sharp",
    twitter_handle: "@r_sharp",
    profile_pic : "https://material-ui.com/static/images/avatar/1.jpg",
    tweet_body: "Help! @ConEd #gasleak on at Rector St Station in Manhattan!"},
  
    { full_name: "Travis Howard",
    twitter_handle: "@travie_howie",
    profile_pic : "https://material-ui.com/static/images/avatar/2.jpg",
    tweet_body: "Rotten egg smell near E 23rd st. @ConEd #gasleak"},
  
    {full_name: "Cindy Baker",
    twitter_handle: "@bake_a_cake",
    profile_pic : "https://material-ui.com/static/images/avatar/3.jpg",
    tweet_body: "There's a down power line at 232nd st and Tibett st in the Bronx @ConEc #electrical"}]

  const list = dummy_data.map( tweet =>

    <React.Fragment>
    <Tweet 
      full_name = {tweet.full_name}
      twitter_handle = {tweet.twitter_handle}
      profile_pic = {tweet.profile_pic}
      tweet_body = {tweet.tweet_body}
    />
    <Divider variant="inset" component="li" />
    </React.Fragment>

  )

  return (
    <React.Fragment>
      {list}
    </React.Fragment>
  );
}
