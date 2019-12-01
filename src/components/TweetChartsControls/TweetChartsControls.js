import React from "react";

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";

export default function TweetChartsControls(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/* Chart Swap Menu */}
                <MenuList>
                    <MenuItem onClick={() => props.click("Day")}>
                        Day
                    </MenuItem>
                    <MenuItem onClick={() => props.click("Week")}>
                        Week
                    </MenuItem>
                    <MenuItem onClick={() => props.click("Month")}>
                        Month
                    </MenuItem>
                    <MenuItem onClick={() => props.click("Year")}>
                        Year
                    </MenuItem>
                </MenuList>
            </Paper>
        </div>
    );
}
