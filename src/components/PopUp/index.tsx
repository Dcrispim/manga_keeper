/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Host from "../../Hosters/Host";
import { MangaListType, MangaType } from "../../types/MangasTypes";
import { getHost } from "../../utils";
import { getThumb } from "../../utils/services";
import { parseTitle } from "../../utils/text";
import Details from "../Details";
import {
  Grid,
  PopUpContainer,
  SliderContainer,
  SliderItem,
  ThumbImg,
  TitleItem,
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
  const [focus, setFocus] = useState<MangaType & { title: string }>({});

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
        {Object.keys(mangas).map((mangaName, i) => {
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
