import React from 'react';
import { defaultParam } from 'utils/api'
import styled from 'styled-components';

const Wrapper = styled.nav`
  ul {
    display: inline;
  }
`;

export default class Pagination extends React.Component {
  render () {
    const {
      articlesCount,
      paginationChange,
      currPage
    } = this.props

    const { limit } = defaultParam

    const pages = Array(Math.ceil(articlesCount / limit)).fill().map((v, i) => i)

    const currentPage = (typeof currPage === 'undefined') ? 0 : +currPage
    return (
      <Wrapper>
        {
          (articlesCount > limit)
          ? (
            <ul className="pagination">
              {
                pages.map((key, item) => {
                  return (
                    <li
                      className={ (key === currentPage) ? 'page-item active' : 'page-item' }
                      key={key}
                    >
                      <a
                        className="page-link"

                        href=""
                        onClick={paginationChange}
                      >
                        {key + 1}
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          )
          : ''
        }
      </Wrapper>
    )
  }
}