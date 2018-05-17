import React from 'react';

export default class AddComment extends React.Component {
  render () {
    const {
      currUser,
      slug
    } = this.props

    return (
      <form className="card comment-form">
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            rows="3"
          >
        </textarea>
        </div>
        <div className="card-footer">
          <img src={currUser.image}
            className="comment-author-img"
          />
          <button className="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>
    )
  }
}