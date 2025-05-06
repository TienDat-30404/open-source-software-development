import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="lava-lamp">
        <div className="bubble" />
        <div className="bubble1" />
        <div className="bubble2" />
        <div className="bubble3" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  @keyframes drop {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(40px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .lava-lamp {
    position: relative;
    width: 50px;
    height: 60px;
    background : linear-gradient(to right, #ffc0cb, #d291bc, #a1c4fd);;
    border-radius: 25px;
    overflow: hidden;
  }

  .bubble {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #e64980, #ff8787);
    border-radius: 50%;
    left: 15px;
    animation: drop 5s ease-in-out infinite;
  }
  .bubble1 {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #82c91e, #3bc9db);
    border-radius: 50%;
    left: 1px;
    animation: drop 3s ease-in-out infinite;
  }
  .bubble2 {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #7950f2, #f783ac);
    border-radius: 50%;
    left: 30px;
    animation: drop 4s ease-in-out infinite;
  }
  .bubble3 {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, #4481eb, #04befe);
    border-radius: 50%;
    left: 20px;
    animation: drop 6s ease-in-out infinite;
  }`;

export default Loader;
