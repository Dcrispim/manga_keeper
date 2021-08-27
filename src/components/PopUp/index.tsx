/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
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

type MangaFocusType = MangaType & { title?: string };
const PopUp: React.FC<Props> = ({
  mangas,
  handleLinkManga,
  handleRemoveManga,
}) => {
  const [focus, setFocus] = useState({} as MangaFocusType);
  const [details, setDetails] = useState(
    window.location.href.includes("localhost")
      ? ({
          ...mangas["peerless-dad"],
          title: "peerless-dad",
        } as MangaFocusType)
      : {}
  );

  const hasDetails = useMemo(() => Object.keys(details).length > 0, [details]);
  const handleDetails = (info: MangaFocusType) => {
    setDetails(info);
  };
  const handleBackFromDetails = () => {
    setDetails({} as MangaFocusType);
  };

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
                      <label
                        onClick={() =>
                          handleDetails({ ...manga, title: mangaName })
                        }
                      >
                        Details
                      </label>
                    </TitleItem>
                  </SliderItem>
                );
              })}
          </SliderContainer>
        </PopUpContainer>
      )}
    </>
  );
};


export default PopUp;
