import React from 'react';
import ArticlePreview from './ArticlePreview'

export default class ArticleList extends React.Component {
  render () {
    const {
      articleList,
      toggleFavorite,
      currUser
    } = this.props

    return (
      <div>
        {
          articleList.map((item, key) => {
            return (
              <ArticlePreview
                key={key}
                article={item}
                toggleFavorite={toggleFavorite}
                currUser={currUser}
              />
            )
          })
        }
      </div>
    )
  }
}