import React from 'react';
import styled from 'styled-components';

const IconChat = () => {
  return (
    <StyledWrapper>
      <button className="btn">Chat</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn {
     --color1: #1e90ff; /* light blue */
    --color2: #0059b3; /* darker blue */
    perspective: 1000px;
    padding: 0.1em 0.1em; 
    background: linear-gradient(var(--color1), var(--color2));
    border: none;
    outline: none;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: #fff;
    text-shadow: 0 10px 10px #000;
    cursor: pointer;
    transform: rotateX(70deg) rotateZ(30deg);
    transform-style: preserve-3d;
    transition: transform 0.5s;
  }

  .btn::before {
    content: "";
    width: 100%;
    height: 15px;
    background-color: var(--color2);
    position: absolute;
    bottom: 0;
    right: 0;
    transform: rotateX(90deg);
    transform-origin: bottom;
  }

  .btn::after {
    content: "";
    width: 15px;
    height: 100%;
    background-color: var(--color1);
    position: absolute;
    top: 0;
    right: 0;
    transform: rotateY(-90deg);
    transform-origin: right;
  }

  .btn:hover {
    transform: rotateX(30deg) rotateZ(0);
  }`;

export default IconChat;
