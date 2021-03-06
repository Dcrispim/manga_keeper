/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Host from "../../Hosters/Host";
import { MangaListType, MangaType } from "../../types/MangasTypes";
import { getHost } from "../../utils";
import PopUp from "../PopUp";

// import { Container } from './styles';

const Extension: React.FC = () => {
  const [mangas, setMangas] = useState<{ [manga: string]: MangaType }>({});
  const [host, setHostName] = useState<Host | null>(null);
  useEffect(() => {
    updateMangaList();
    let queryOptions = { active: true, currentWindow: true };
    chrome?.tabs.query(queryOptions, ([tab]) => {
      if (tab.url) {
        const currentHost = getHost(tab.url);
        setHostName((old) => currentHost || old);
      }
    });
  }, []);
  const updateMangaList = () => {
    chrome?.storage.local.get(null, (mangalist) => {
      setMangas(mangalist);
    });
  };
  const handleClearAll = () => {
    chrome?.storage.local.clear();
  };

  const handleLinkManga = (currentManga: MangaType, mangaName: string) => {
    if (host) {
      const alias = currentManga.alias || [];
      alias.push(host.mangaName);

      const cleanAlias = alias.reduce((p, c) => {
        if (c !== mangaName && !p.includes(c)) {
          return [...p, c];
        } else {
          return p;
        }
      }, [] as string[]);

      chrome?.storage.local.set(
        {
          [mangaName]: {
            ...currentManga,
            alias: cleanAlias,
          },
        },
        () => {
          if (host.mangaName !== mangaName) handleRemoveManga(host.mangaName);
        }
      );
    }
  };

  const handleRemoveManga = (mangaName: string) => {
    chrome?.storage.local.remove([mangaName], () => {
      updateMangaList();
    });
  };

  const handleUpdateManga = (
    mangalist: MangaListType,
    callback?: () => void
  ) => {
    chrome?.storage.local.set({...mangalist}, () => {
      setMangas(mangalist)
      callback?.();
    });
  };
  return (
    <PopUp
      mangas={mangas}
      handleLinkManga={handleLinkManga}
      handleRemoveManga={handleRemoveManga}
      handleUpdateManga={handleUpdateManga}
    />
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

export default Extension;
