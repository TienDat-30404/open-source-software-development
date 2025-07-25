import React from 'react';
import styled from 'styled-components';

const LoadingDownload = () => {
  return (
    <StyledWrapper>
      <div className="loading-bar">Loading</div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loading-bar {
    position: relative;
    width: 110px;
    height: 110px;
    background: transparent;
    border: px solid #3c3c3c;
    border-radius: 50%;
    text-align: center;
    line-height: 111px;
    font-family: sans-serif;
    font-size: 15px;
    color: #fff000;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-shadow: 0 0 20px #fff000;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  .loading-bar:before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 5px solid #fff000;
    border-right: 5px solid #fff000;
    border-radius: 50%;
    animation: animateC 2s linear infinite;
  }

  @keyframes animateC {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes animate {
    0% {
      transform: rotate(45deg);
    }

    100% {
      transform: rotate(405deg);
    }
  }`;

export default LoadingDownload;
