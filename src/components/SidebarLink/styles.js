import {makeStyles} from '@material-ui/styles'

export default makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.background.light,
    },
  },
  linkActive: {
    backgroundColor: theme.palette.background.light,
  },
  linkIcon: {
    marginRight: theme.spacing(1),
    color: `${theme.palette.text.secondary}99`,
    transition: theme.transitions.create('color'),
    width: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  linkIconActive: {
    color: theme.palette.primary.main,
  },
  linkText: {
    padding: 0,
    color: `${theme.palette.text.secondary}CC`,
    transition: theme.transitions.create(['opacity', 'color']),
    fontSize: 16,
  },
  linkTextActive: {
    color: theme.palette.text.primary,
  },
  linkTextHidden: {
    opacity: 0,
  },
}))
