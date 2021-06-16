import React from "react";
import { MangaType } from "../../types/MangasTypes";
import { parseTitle } from "../../utils/text";
import {
  AliasContainer,
  DetailContainer,
  ImageContainer,
  InfosContainer,
  ToolsContainer,
} from "./styles";

type Props = {
  onBack: () => void;
  info: MangaType & { title?: string };
  handleLinkManga: (currentManga: MangaType, mangaName: string) => void;
  handleRemoveManga: (mangaName: string) => void;
};

const Details: React.FC<Props> = ({
  onBack,
  info,
  handleLinkManga,
  handleRemoveManga,
}) => {
  return (
    <DetailContainer scale={1.8}>
      <ImageContainer>
        <a href={info.lastSource} target="blank">
          <img src={info.thumb} alt={info.title} />
        </a>
        <ToolsContainer>
          <button onClick={onBack}>{"<<"}</button>
          <button
            onClick={() => {
              handleRemoveManga(info.title || "");
              onBack();
            }}
          >
            {"🗑"}
          </button>
          <button onClick={() => handleLinkManga(info, info.title || "")}>
            {"🔗"}
          </button>
          <button onClick={() => handleLinkManga(info, info.title || "")}>
            {"⟳"}
          </button>
        </ToolsContainer>
      </ImageContainer>
      <InfosContainer>
        <h2>{parseTitle(info.title || "")}</h2>
        <span>
          Last Cap: <h2>{info.lastCap}</h2>
        </span>
        <span>
          Higher Cap: <h2>{info.highCap}</h2>
        </span>
        {info.alias && (
          <>
            <span>Alias: </span>
            <AliasContainer>
              {info.alias?.map((nick) => {
                return (
                  <span>
                    <a href={info.lastSource} target="blank">
                      {nick}
                    </a>
                  </span>
                );
              })}
            </AliasContainer>
          </>
        )}
        {info.categories && (
          <>
            <span>Categories: </span>
            <AliasContainer>
              {info.categories?.map((nick) => {
                return (
                  <span>
                    <a href={nick.link} target="blank">
                      {nick.name}
                    </a>
                  </span>
                );
              })}
            </AliasContainer>
          </>
        )}
      </InfosContainer>
    </DetailContainer>
  );
};

export default Details;
