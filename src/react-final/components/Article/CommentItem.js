import React from 'react';
import { Link } from 'react-router-dom';

export default class CommentItem extends React.Component {
  render () {
    const {
      comment,
      currUser
    } = this.props

    if (!comment.author) return 

    const { username, image } = comment.author

    return (
      <div className="card">
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <Link
            to={`/@${username}`}
            className="comment-author"
          >
            <img src={image} className="comment-author-img" />
          </Link>
          &nbsp;
          <Link
            to={`/@${username}`}
            className="comment-author"
          >
          {username}
          </Link>
          <span className="date-posted">{comment.createdAt}</span>
          {
            (currUser && currUser.username && currUser.username === username)
            ? (
              <span className="mod-options">
                <i className="ion-edit"></i>
                <i className="ion-trash-a"></i>
              </span>
            )
            : null
          }
          
        </div>
      </div>
    )
  }
}