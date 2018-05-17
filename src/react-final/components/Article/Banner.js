import React from 'react';
import Meta from './Meta'

export default class Banner extends React.Component {
  render () {
    const {
      article,
      currUser
    } = this.props

    if(!article.author) return null

    return (
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <Meta
            article={article}
            currUser={currUser}
          />
        </div>
      </div>
    )
  }
}