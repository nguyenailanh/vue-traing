import React from 'react'
import Meta from './Meta'

export default class Action extends React.Component {
  render () {
    const {
      article,
      currUser
    } = this.props

    if(!article.author) return null

    return (
      <div className="article-actions">
        <Meta
            article={article}
            currUser={currUser}
          />  
      </div>
    )
  }
}