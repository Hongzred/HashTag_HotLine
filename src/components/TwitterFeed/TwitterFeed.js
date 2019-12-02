import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { FixedSizeList } from 'react-window'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		height: 400,
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}))

function renderRow(props) {
	const { index, style } = props

	return (
		<ListItem button style={style} key={index}>
			<ListItemText primary={`Item ${index + 1}`} />
		</ListItem>
	)
}

renderRow.propTypes = {
	index: PropTypes.number.isRequired,
	style: PropTypes.object.isRequired,
}

export default function VirtualizedList() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<FixedSizeList
				height={400}
				width={360}
				itemSize={46}
				itemCount={200}
			>
				{renderRow}
			</FixedSizeList>
		</div>
	)
}

// class Map extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     state = {
//         viewport: {
//             width: this.props.width,
//             height: this.props.height,
//             latitude: this.props.latitude,
//             longitude: this.props.longitude,
//             zoom: this.props.zoom
//         }
//     };

//     render() {

//         var T = new Twit({
//             consumer_key: process.env.TWIT_CONSUMER_KEY,
//             consumer_secret: process.env.TWIT_CONSUMER_SECRET,
//             access_token: process.env.TWIT_ACCESS_TOKEN,
//             access_token_secret:  process.env.TWIT_ACCESS_TOKEN_SECRET
//           });

//         var stream = T.stream('statuses/filter', { track: 'mango' })

//         stream.on('tweet', function (tweet) {
//             console.log(tweet)
//             // arr.push(tweet);
//             // console.log("tweet added to list")
//           })

//         return (
// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { FixedSizeList } from 'react-window';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     height: 400,
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// function renderRow(props) {
//   const { index, style } = props;

//   return (
//     <ListItem button style={style} key={index}>
//       <ListItemText primary={`Item ${index + 1}`} />
//     </ListItem>
//   );
// }

// renderRow.propTypes = {
//   index: PropTypes.number.isRequired,
//   style: PropTypes.object.isRequired,
// };

// export default function VirtualizedList() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <FixedSizeList height={400} width={360} itemSize={46} itemCount={200}>
//         {renderRow}
//       </FixedSizeList>
//     </div>
//   );
// }
//         );
//     }
// }

// export default Map;
