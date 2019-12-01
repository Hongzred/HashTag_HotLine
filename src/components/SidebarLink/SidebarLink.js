import React from 'react'
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import {Link} from 'react-router-dom'
import classnames from 'classnames'

// styles
import useStyles from './styles'

export default function SidebarLink({
  link,
  icon,
  label,
  location,
  isSidebarOpened,
}) {
  const classes = useStyles()

  const isLinkActive = link && location.pathname === link
  const Icon = icon
  return (
    <ListItem
      button
      component={link && Link}
      to={link}
      className={classes.link}
      classes={{
        root: classnames(classes.linkRoot, {
          [classes.linkActive]: isLinkActive,
        }),
      }}
      disableRipple
    >
      <ListItemIcon
        className={classnames(classes.linkIcon, {
          [classes.linkIconActive]: isLinkActive,
        })}
      >
        <Icon />
      </ListItemIcon>
      <ListItemText
        classes={{
          primary: classnames(classes.linkText, {
            [classes.linkTextActive]: isLinkActive,
            [classes.linkTextHidden]: !isSidebarOpened,
          }),
        }}
        primary={label}
      />
    </ListItem>
  )
}
