import React from 'react';
import Pagination from './Pagination'
import ArticleList from './ArticleList'
import NavItem from './NavItem'
import {
  defaultParam
} from 'utils/api'

export default class Main extends React.Component {
  componentDidMount () {
    const { location } = this.props

    if (location && location.pathname ==='/') {
      document.querySelectorAll('.feed-toggle .nav-link')[1].click()
    }
  }

  componentDidUpdate(prevProps) {
    const hasNavActive = document.querySelectorAll('.feed-toggle .nav-link.active').length
    !hasNavActive && document.querySelector('.feed-toggle .nav-link').click()
  }

  handleNavItemClick (evt) {
    evt.preventDefault()
    const item = evt.target
    const params = item.getAttribute('href')
    if (item.classList.contains('active')) return

    if(params === null || item.classList.contains('disabled')) return

    const list = document.querySelectorAll('.feed-toggle .nav-link')
    list.forEach(item => item.classList.remove('active'))

    item.classList.add('active')

    this.props.getArticleList(
      this.props.currUser.token || '',
      0,
      params
    )
  }

  paginationChange (evt) {
    evt.preventDefault()

    const actualCurrPage = +(evt.target.innerText) - 1
    const offset = defaultParam.limit * actualCurrPage

    this.props.getArticleList(
      this.props.currUser.token || '',
      actualCurrPage,
      {
        offset: offset
      }
    )
  }

  render () {
    const {
      navItems,
      articleList,
      articlesCount,
      currPage,
      currUser,
      pageList,
      toggleFavorite,
      userProfile,
      location
    } = this.props

    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">
            {
              navItems.map((item, key) => {
                return (
                  <NavItem
                    ref={item.href}
                    key={key}
                    item={item}
                    currUser={currUser}
                    userProfile={userProfile}
                    handleNavItemClick={this.handleNavItemClick.bind(this)}
                  />
                )
              })
            }
          </ul>
        </div>
        <ArticleList
          articleList={articleList}
          currUser={currUser}
          toggleFavorite={toggleFavorite}
        />
        <Pagination
          currPage={currPage}
          articlesCount={articlesCount}
          paginationChange={this.paginationChange.bind(this)}
        />
      </div>
    )
  }
}