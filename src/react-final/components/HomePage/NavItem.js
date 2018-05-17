import React from 'react';
import {
  defaultParam
} from 'utils/api'

export default class NavItem extends React.Component {

  render () {
    const {
      item,
      currUser,
      userProfile,
      handleNavItemClick
    } = this.props

    const navClass =
      (item.href ==='owner')
      ?((currUser.username) ? 'nav-link' : 'nav-link disabled')
      : 'nav-link'

    // if (item.href === 'owner') {
    //   if(currUser.username) {
    //     item.params.author = currUser.username
    //   }
    // } else if (item.href === 'user') {
    //   if (userProfile && userProfile.username) {
    //     item.params.author = userProfile.username
    //   }
    // } else if (item.href === 'favorite') {
    //   if (userProfile && userProfile.username) {
    //     item.params.favorited = userProfile.username
    //   }
    // }

    return (
      <li className="nav-item">
        <a
          className={navClass}
          href={JSON.stringify(item.params)}
          onClick={handleNavItemClick}
        >
          {item.title}
        </a>
      </li>
    )
  }
}