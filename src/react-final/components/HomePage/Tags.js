import React from 'react';
import {
  defaultParam
} from 'utils/api'

export default class Tags extends React.Component {

  onClickTagHandler (evt) {
    evt.preventDefault()

    const {
      currUser
    } = this.props

    this.props.getArticleList(
      currUser.token || '',
      0,
      {
        tag: evt.target.innerText
      }
    )

  }

  render () {
    const {
      tagList,
      currUser
    } = this.props

    return (
      <div className="col-md-3">
        <div className="sidebar">
          <p>Popular Tags</p>

          <div className="tag-list">
            {
              tagList.map( (item, key) => {
                return  (
                  <a
                    href=""
                    className="tag-pill tag-default"
                    key={key}
                    onClick={this.onClickTagHandler.bind(this)}
                  >
                    {item}
                  </a>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}