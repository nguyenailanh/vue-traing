import React from 'react';
import { Link } from 'react-router-dom';

export default class ArticlePreview extends React.Component {
  constructor () {
    super()
    this.state = {
      token: ''
    }
  }

  componentDidMount () {
    this.setState({
      'token' : this.props.currUser.token || ''
    })
  }

  toggleFavorite (favorited, slug) {
    if (this.state.token === '') {
      return
    }

    this.props.toggleFavorite(this.state.token, favorited, slug)
  }

  render () {
    const {
      article,
      currUser
    } = this.props

    const favoriteClass =
      (article.favorited)
      ? 'btn btn-primary btn-sm pull-xs-right'
      : 'btn btn-outline-primary btn-sm pull-xs-right'
    const disabledClass =
      (this.state.token === '')
      ? 'disabled'
      : ''
    const {
      author,
      createdAt,
      favorited,
      slug,
      favoritesCount,
      title,
      description
    } = article

    return (
      <div className="article-preview">
        <div className="article-meta">
          <a href="profile.html">
              <img
                src={author.image}
              />
          </a>
          <div className="info">
            <Link
              to={`/@${author.username}`}
              className="author"
            >
              {author.username}
            </Link>
            <span className="date">
              {createdAt}
            </span>
          </div>
          <button
            className={[
              favoriteClass,
              disabledClass
            ].join(' ')}
            onClick={this.toggleFavorite.bind(this, favorited, slug)}
          >
            <i className="ion-heart"></i>
            {favoritesCount}
          </button>
        </div>
        <Link
          to={`/article/${slug}`}
          className="preview-link"
        >
          <h1>{title}</h1>
          <p>{description}</p>
          <span>Read more...</span>
        </Link>
      </div>
    )
  }
}