/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Host from "../../Hosters/Host";
import { MangaListType, MangaType } from "../../types/MangasTypes";
import Details from "../Details";
import {
  PopUpContainer,
  SliderContainer,
  SliderItem,
  ThumbImg,
  TitleItem
} from "./styles";

// import { Container } from './styles';
type Props = {
  mangas: MangaListType;
  handleLinkManga: (currentManga: MangaType, mangaName: string) => void;
  handleRemoveManga: (mangaName: string) => void;
  host?: Host;
  setHostName?: React.Dispatch<React.SetStateAction<Host>>;
  updateMangaList?: () => void;
  handleClearAll?: () => void;
};

const PopUp: React.FC<Props> = ({
  mangas,
  handleLinkManga,
  handleRemoveManga,
}) => {
  const [details, setDetails] = useState(
    window.location.href.includes("localhost")
      ? ({
          ...mangas["peerless-dad"],
          title: "peerless-dad",
        } as MangaFocusType)
      : {}
  );

  return (
    <>
      {hasDetails ? (
        <Details
          onBack={handleBackFromDetails}
          info={details}
          handleLinkManga={handleLinkManga}
          handleRemoveManga={handleRemoveManga}
        />
      ) : (
    <PopUpContainer>
      <SliderContainer>
            {Object.keys(mangas)
              .sort((a, b) =>
                (mangas[a]?.lastTime || 0) < (mangas[b].lastTime || 0) ? 1 : -1
              )
              .map((mangaName, i) => {
          const manga = mangas[mangaName];
          return (
            <SliderItem
              onMouseOver={() => setFocus({ ...manga, title: mangaName })}
              padding={8}
              key={i}
            >
              <a href={manga.lastSource} target="blank">
                <ThumbImg src={manga.thumb} />
              </a>
              <TitleItem>
                <label onClick={() => handleRemoveManga(mangaName)}>
                  <a>Del</a>
                </label>
                <label onClick={() => handleLinkManga(manga, mangaName)}>
                  <a>join</a>
                </label>
              </TitleItem>
            </SliderItem>
          );
        })}
      </SliderContainer>
    </PopUpContainer>
  );
};

const Thumb = ({ src }: { src?: string }) => {
  return (
    <div>
      <ThumbContainer src={src} />
    </div>
  );
};
const ThumbContainer = styled.img`
  width: 116px;
  height: 180px;
  object-fit: cover;

  background-color: #eee;
  top: 0px !important;
  z-index: 10;

  -webkit-user-drag: none;
`;

export default PopUp;
