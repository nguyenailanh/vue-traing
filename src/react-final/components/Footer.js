import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

function Footer() {
  return (
    <Wrapper>
      <footer>
        <div className="container">
          <a href="/" className="logo-font">conduit</a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
    </Wrapper>
  );
}

export default Footer;
