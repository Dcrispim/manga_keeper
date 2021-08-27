import styled from "styled-components";

const THUMB_SIZE = {
  H: 180,
  W: 116,
};

const TITLE_ITEM_BG =' #000a'

export const SliderWrapper = styled.div`
  width: 100%;
  margin-top: 100px;

  div h1 {
    margin-bottom: 0px;
    margin-left: 20px;
  }
`;

export const SliderContainer = styled.div`
  display: grid;
  margin-top: 16px;
  grid-template-columns: 1fr 1fr 1fr;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  //scroll-snap-type: x mandatory;

  -webkit-overflow-scrolling: touch;

  scroll-behavior: smooth;
  max-height: 600px;
  min-height: 300px;

  user-select: none;
`;

export const SliderItem = styled.div<{ padding: number }>`
  @keyframes hover-img-in {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.2);
    }
  }
  @keyframes hover-title-in {
    from {
      transform: scale(1);
      opacity: 0%;
    }
    to {
      transform: scale(1.2);
      opacity: 100%;
    }
  }

  @keyframes hover-img-out {
    to {
      transform: scale(1);
    }
    from {
      transform: scale(1.2);
    }
  }
  @keyframes hover-title-out {
    to {
      transform: scale(1);
      opacity: 0%;
    }
    from {
      transform: scale(1.2);
      opacity: 100%;
    }
  }

  width: ${({ padding }) => THUMB_SIZE.W + padding}px;
  padding: 8px ${({ padding }) => padding}px;
  //scroll-snap-align: start;
  pointer-events: none;
  div {
    animation-name: hover-title-out;
    animation-duration: 0.1s;
  }

  img {
    animation-name: hover-img-out;
    animation-duration: 0.1s;
    align-self: baseline;
    pointer-events: auto;
  }

  :hover {
    img {
      animation-name: hover-img-in;
      animation-duration: 0.1s;
      transform: scale(1.2);
    }
    div {
      animation-name: hover-title-in;
      animation-duration: 0.1s;

      transform: scale(1.2);
      opacity: 100%;
    }
  }
`;

export const TitleItem = styled.div`
  pointer-events: auto;
  opacity: 0%;
  display: flex;
  pointer-events: auto;
  position: relative;
  margin-left: 4px;
  //z-index: 1000;
  width: ${THUMB_SIZE.W}px;
  align-items: center;
  justify-content: center;
  background-color: ${TITLE_ITEM_BG};
  
  label {
    font-size: 20px;
    color: gray;
    cursor: grab;
    :hover{
      color: white;
    }
  }
  top: -24px;
  align-self: center;
  justify-content: space-around;
`;

export const ThumbImg = styled.img`
  //pointer-events: auto;
  width: ${THUMB_SIZE.W}px;
  height: ${THUMB_SIZE.H}px;
  object-fit: cover;

  background-color: #eee;
  top: 0px !important;
  //z-index: 10;

  -webkit-user-drag: none;
`;

export const SideButton = styled.div<{ side: "left" | "right" }>`
  @keyframes btn-in {
    from {
      color: #fff1;
      width: 3rem;
    }
    to {
      background-color: ${TITLE_ITEM_BG};
      color: #fff9;
      width: 20rem;
    }
  }

  @keyframes btn-out {
    from {
      background-color: ${TITLE_ITEM_BG};
      width: 20rem;
    }
    to {
      width: 3rem;
    }
  }
  align-self: flex-end;
  cursor: pointer;
  display: flex;
  //z-index: 100;

  position: relative;
  width: 3rem;
  height: ${THUMB_SIZE.H}px;
  ${({ side }) => `${side}: 0px;`}
  animation-name: btn-out;
  animation-duration: 0.2s;
  :hover {
    animation-name: btn-in;
    animation-duration: 0.2s;
    width: 20rem;
    background-color: ${TITLE_ITEM_BG};
    i {
      color: #fff9;
    }
  }
  justify-content: center;
  i {
    align-self: center;
    font-size: 40px;
    color: #fff1;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr 2fr;
  height: 24px;
  margin-bottom: 16px;
  h2 {
    padding-left: 8px;
    text-align: left;
  }
`;
export const PopUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 500px;
`;
