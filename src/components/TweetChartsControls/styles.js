import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    root: {
        display: "flex"
    },
    paper: {
        padding: theme.spacing(4),
        display: "flex",
        overflow: "hidden",
        flexDirection: "column"
    }
}));
