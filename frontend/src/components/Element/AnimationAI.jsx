import React from 'react';
import styled from 'styled-components';

const AnimationAI = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="item" style={{ "--i": 0}} />
        <div className="item" style={{ "--i": 1}} />
        <div className="item" style={{ "--i": 2}} />
        <div className="item" style={{ "--i": 3}} />
        <div className="item" style={{ "--i": 4}} />
        <div className="item" style={{ "--i": 5}} />
        <div className="item" style={{ "--i": 6}} />
        <div className="item" style={{ "--i": 7}} />
        <div className="item" style={{ "--i": 8}} />
        <div className="item" style={{ "--i": 9}} />
        <div className="item" style={{ "--i": 10}} />
        <div className="item" style={{ "--i": 11}} />
        <div className="item" style={{ "--i": 12}} />
        <div className="item" style={{ "--i": 13}} />
        <div className="item" style={{ "--i": 14}} />
        <div className="item" style={{ "--i": 15}} />
        <div className="item" style={{ "--i": 16}} />
        <div className="item" style={{ "--i": 17}} />
        <div className="item" style={{ "--i": 18}} />
        <div className="item" style={{ "--i": 19}} />
        <div className="item" style={{ "--i": 20}} />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    position: absolute;
    height: 50%;
    top : 5%;
    display: flex;
    align-items: center;
  }

  .item {
    position: absolute;
    background-color: transparent;
    width: calc(var(--i) * 1vmin);
    aspect-ratio: 1;
    border-radius: 50%;
    border: .9vmin solid rgb(0, 200, 255);
    transform-style: preserve-3d;
    transform: rotateX(70deg) translateZ(50px);
    animation: my-move 3s ease-in-out calc(var(--i) * 0.08s) infinite;
    box-shadow: 0px 0px 15px rgb(124, 124, 124),
      inset 0px 0px 15px rgb(124, 124, 124);
  }

  @keyframes my-move {
    0%,
    100% {
      transform: rotateX(70deg) translateZ(20px) translateY(0px);
      filter: hue-rotate(0deg);
    }

    50% {
      transform: rotateX(70deg) translateZ(50px) translateY(-30vmin);
      filter: hue-rotate(180deg);
    }
  }`;

export default AnimationAI;
