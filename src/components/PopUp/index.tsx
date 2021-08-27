/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import Host from "../../Hosters/Host";
import { MangaListType, MangaType } from "../../types/MangasTypes";
import Details from "../Details";
import { configCardData } from "../SystemCards/Config/configCardData";
import { listCardData } from "../SystemCards/List/listCardData";
import { tagCardData } from "../SystemCards/Tags/tagCardData";
import {
  PopUpContainer,
  SliderContainer,
  SliderItemContainer,
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
            <SliderItem
              onMouseOver={() => {}}
              onClick={() => {}}
              data={configCardData}
              key={"config-card"}
              label="Config"
            />
            <SliderItem
              onMouseOver={() => {}}
              onClick={() => {}}
              data={tagCardData}
              key={"tag-card"}
              label="Tags"
            />
             <SliderItem
              onMouseOver={() => {}}
              onClick={() => {}}
              data={listCardData}
              key={"list-card"}
              label="List"
            />
            {Object.keys(mangas)
              .sort((a, b) =>
                (mangas[a]?.lastTime || 0) < (mangas[b].lastTime || 0) ? 1 : -1
              )
              .map((mangaName, i) => {
                const manga = mangas[mangaName];
                return (
                  <SliderItem
                    onMouseOver={() => setFocus({ ...manga, title: mangaName })}
                    onClick={() =>
                      handleDetails({ ...manga, title: mangaName })
                    }
                    data={manga}
                    key={i.toString()}
                  />
                );
              })}
          </SliderContainer>
        </PopUpContainer>
      )}
    </>
  );
};

const SliderItem: React.FC<{
  onMouseOver: () => void;
  onClick: () => void;
  data: MangaType;
  key?: string;
  label?: string;
}> = ({ onMouseOver, onClick, data, key, label }) => {
  return (
    <SliderItemContainer onMouseOver={onMouseOver} padding={8} key={key}>
      <a href={data.lastSource} target="blank">
        <ThumbImg src={data.thumb} />
      </a>
      <TitleItem>
        <label onClick={onClick}>{label || "Details"}</label>
      </TitleItem>
    </SliderItemContainer>
  );
};

export default PopUp;
