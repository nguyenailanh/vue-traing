import React from 'react';
import { Link } from 'react-router-dom';

export default class Action extends React.Component {
  render () {
    const {
      article,
      currUser
    } = this.props

    const {
      username,
      bio,
      following,
      image
    } = article.author

    const className = (following) ? 'ion-minus-round' : 'ion-plus-round'
    const classFav = (article.favorited) ? 'ion-heart' : 'ion-heart'

    return (
      <div className="article-meta">
        <Link
          to={`/@${username}`}
        >
          <img src={image} />
        </Link>
        <div className="info">
          <Link
            to={`/@${username}`}
            className="author"
          >
            {username}
          </Link>
          <span className="date">{article.createdAt}</span>
        </div>
        <button
          className="btn btn-sm btn-outline-secondary"
          disabled={!currUser || !currUser.username}
        > 
          <i className={className}></i>
          &nbsp;
          {(following) ? 'Unf': 'F'}ollow {username}
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-sm btn-outline-primary"
          disabled={!currUser || !currUser.username}
        >
          <i className={classFav}></i>
          &nbsp;
          Favorite Post <span className="counter">
            ({article.favoritesCount})
          </span>
        </button>
      </div>
    )
  }
}