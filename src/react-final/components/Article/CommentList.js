import React from 'react';

import CommentItem from './CommentItem'

export default class CommentList extends React.Component {
  render () {
    const {
      slug,
      comments
    } = this.props
    return (
      <div>
        {
          comments.map((comment, key) => {
            return (
              <CommentItem
                key={key}
                comment={comment}
              />
            )
          })
        }
      </div>
      
    )
  }
}