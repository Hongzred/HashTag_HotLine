import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(4),
        display: "flex",
        overflow: "hidden",
        flexDirection: "column"
    },
    fixedHeight: {
        height: 540
    }
}));
