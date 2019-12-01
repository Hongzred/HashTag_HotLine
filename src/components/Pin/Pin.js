import React from 'react'
import {Room} from '@material-ui/icons'

export default function Pin({pinClickHandler}) {
  return (
    <div
      data-testid="pin"
      style={{
        cursor: 'pointer',
      }}
      onClick={pinClickHandler}
      onKeyDown={pinClickHandler}
      role="button"
      tabIndex="0"
    >
      <Room />
    </div>
  )
}
