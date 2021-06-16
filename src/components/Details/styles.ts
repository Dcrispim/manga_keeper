import styled from "styled-components";

export const Container = styled.div``;

export const DetailContainer = styled.div<{ scale: number }>`
  display: flex;
  min-width: 400px;
  max-width: 500px;

  img {
    width: ${({ scale }) => 116 * (scale || 1)}px;
    height: ${({ scale }) => 180 * (scale || 1)}px;
    object-fit: cover;
  }
`;
export const InfosContainer = styled.div`
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 8px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  span {
    text-align: left;
    font-size: 20px;
    font-weight: 600;
    line-height: 30%;
  }
`;

export const AliasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0px;
  max-width: 250px;
  span {
    width: fit-content;
    white-space: nowrap;
    font-size: medium;
    background-color: gray;
    border-radius: 15px;
    padding: 8px;
    color: whitesmoke;
    margin: 4px;
    :hover {
      background-color: whitesmoke;
      color: gray;
      border: 1px solid gray;
      cursor: pointer;
      border: 1px solid gray;
    }
    a {
      color: whitesmoke;
      text-decoration: unset;
      :hover {
        background-color: whitesmoke;
        color: gray;
        cursor: pointer;
      }
    }
  }
`;
export const ToolsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  //justify-content: space-between;
  width: 100%;
  button {
    //width: 60px;
    font-size: 20px;
    font-weight: 600;
    line-height: 15px;
    margin: 4px;
    padding: 4px;
  }
`;
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
