/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import Host from "../../Hosters/Host";
import { MangaListType, MangaType } from "../../types/MangasTypes";
import Details from "../Details";
import ConfigCard from "../SystemCards/Config";
import { configCardData } from "../SystemCards/Config/configCardData";
import ListCard from "../SystemCards/List";
import { listCardData } from "../SystemCards/List/listCardData";
import TagsCard from "../SystemCards/Tags";
import { tagCardData } from "../SystemCards/Tags/tagCardData";
import {
  PopUpContainer,
  SliderContainer,
  SliderItemContainer,
  ThumbImg,
  TitleItem,
  TopLineMenu,
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
  handleUpdateManga?: (mangalist: MangaListType, callback?: () => void) => void;
};

type MangaFocusType = MangaType & { title?: string };
const PopUp: React.FC<Props> = ({
  mangas,
  handleLinkManga,
  handleRemoveManga,
  handleUpdateManga,
}) => {
  const [focus, setFocus] = useState({} as MangaFocusType);
  const [details, setDetails] = useState({} as MangaType);

  const [mangaList, setMangaList] = useState(getMangas(mangas));

  const hasDetails = useMemo(() => Object.keys(details).length > 0, [details]);
  const handleDetails = (info: MangaFocusType) => {
    setDetails(info);
  };
  const handleBackFromDetails = () => {
    setDetails({} as MangaFocusType);
  };

  const [systemCard, setSystemCard] = useState<"" | "tag" | "config" | "list">(
    ""
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
      ) : systemCard ? (
        <SystemCardPage
          card={systemCard}
          onBack={() => setSystemCard("")}
          updateList={handleUpdateManga}
        />
      ) : (
        <PopUpContainer>
          <SliderContainer>
            <SliderItem
              onMouseOver={() => {}}
              onClick={() => setSystemCard("config")}
              data={configCardData}
              //updateList={handleUpdateManga}
              key={"config-card"}
              label="Config"
            />
            <SliderItem
              onMouseOver={() => {}}
              onClick={() => setSystemCard("tag")}
              data={tagCardData}
              key={"tag-card"}
              label="Tags"
            />
            <SliderItem
              onMouseOver={() => {}}
              onClick={() => setSystemCard("list")}
              data={listCardData}
              key={"list-card"}
              label="List"
            />
            {Object.keys(mangaList).map((mangaName, i) => {
              const manga = mangas[mangaName];
              return (
                <SliderItem
                  onMouseOver={() => setFocus({ ...manga, title: mangaName })}
                  onClick={() => handleDetails({ ...manga, title: mangaName })}
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
      <a
        href={data.lastSource}
        onClick={!data.lastSource ? onClick : () => {}}
        target="blank"
      >
        <ThumbImg src={data.thumb} />
      </a>
      <TitleItem>
        <label onClick={onClick}>{label || "Details"}</label>
      </TitleItem>
    </SliderItemContainer>
  );
};

const SystemCardPage = ({
  card,
  onBack,
  updateList,
}: {
  card: string;
  onBack: () => void;
  updateList?: (mangalist: MangaListType, callback?: () => void) => void;
}) => {
  const defaultButtons = [
    { label: "<<", onCLick: onBack, description: "Back to Home" },
  ];
  if (card === "config") {
    return withTopMenu(<ConfigCard updateList={updateList} />, defaultButtons);
  } else if (card === "tag") {
    return withTopMenu(<TagsCard />, defaultButtons);
  } else if (card === "list") {
    return withTopMenu(<ListCard />, defaultButtons);
  } else {
    return <div />;
  }
};

const withTopMenu = (
  Component: React.ReactElement,
  buttons: { onCLick: () => void; label: string; description?: string }[]
) => {
  return (
    <div>
      <TopLineMenu>
        {buttons.map((btn) => (
          <button
            type="button"
            onClick={btn.onCLick}
            title={btn.description || btn.label}
          >
            {btn.label}
          </button>
        ))}
      </TopLineMenu>
      {Component}
    </div>
  );
};

const getMangas = (mangas: MangaListType): MangaListType => {
  return Object.keys(mangas)
    .filter((title) => !title.includes("__"))
    .sort((a, b) =>
      (mangas[a]?.lastTime || 0) < (mangas[b].lastTime || 0) ? 1 : -1
    )
    .reduce((p, c) => ({ ...p, [c]: mangas[c] }), {});
};

export default PopUp;
