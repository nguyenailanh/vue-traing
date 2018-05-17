import React from 'react';
import {
  defaultParam
} from 'utils/api'

export default class UserInfo extends React.Component {
  render () {
    const {
      loggedUser,
      userProfile,
      toggleFollowUser
    } = this.props

    const className = (userProfile.following) ? 'ion-minus-round' : 'ion-plus-round'

    return (
      <div className="user-info">
        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={userProfile.image}
                className="user-img"
              />
              <h4>{userProfile.username}</h4>
              <p>
                {userProfile.bio}
              </p>
              {
                (loggedUser.username && loggedUser.username !== userProfile.username)
                ? (
                  <button
                    className="btn btn-sm btn-outline-secondary action-btn"
                    onClick={
                      toggleFollowUser(
                        loggedUser.token,
                        userProfile.username,
                        !userProfile.following
                      )
                    }
                  >
                    <i
                      className={className}
                    >
                    </i>
                    &nbsp;
                    {(userProfile.following) ? 'Unf': 'F'}ollow {userProfile.username}
                  </button>
                )
                : ''
              }
            </div>

          </div>
        </div>
      </div>
    )
  }
}