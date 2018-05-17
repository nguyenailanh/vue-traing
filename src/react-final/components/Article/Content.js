import React from 'react';

export default class Content extends React.Component {
  render () {
    const {
      article
    } = this.props

    return (
      <div className="row article-content">
        <div className="col-md-12">
          <p>
           {article.description}
          </p>
          <h2 id="introducing-ionic">{article.title}</h2>
          <p>{article.body}</p>
        </div>
      </div>
    )
  }
}