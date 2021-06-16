/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Host from "../../Hosters/Host";
import { MangaType } from "../../types/MangasTypes";
import { getHost, mockCapList } from "../../utils";
import PopUp from "../PopUp";

// import { Container } from './styles';

const Viewer: React.FC = () => {
  const [mangas, setMangas] =
    useState<{ [manga: string]: MangaType }>(mockCapList);
  const [host, setHostName] = useState<Host | null>(null);
  const [focus, setFocus] = useState<MangaType & { title: string }>({});
  console.log(host);

  useEffect(() => {
    updateMangaList();
    let queryOptions = { active: true, currentWindow: true };
    chrome?.tabs?.query(queryOptions, ([tab]) => {
      if (tab.url) {
        const currentHost = getHost(tab.url);
        setHostName((old) => currentHost || old);
      }
    });
  }, []);
  const updateMangaList = () => {
    chrome?.storage?.local.get(null, (mangalist) => {
      setMangas(mangalist);
    });
  };
  const handleClearAll = () => {
    chrome?.storage?.local.clear();
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

      chrome?.storage?.local.set(
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
    chrome?.storage?.local.remove([mangaName], () => {
      updateMangaList();
    });
    setMangas((old) => {
      const newMangas = { ...old };
      if (mangaName) delete newMangas[mangaName];
      return newMangas;
    });
  };
  return (
    <Container>
      <h1>Viwer</h1>
      <ViewerContainer>
        <PopUp
          mangas={mangas}
          handleLinkManga={handleLinkManga}
          handleRemoveManga={handleRemoveManga}
        />
      </ViewerContainer>
    </Container>
  );
};

const ViewerContainer = styled.div`
  border: 1px solid;
  width: 500px;
  align-self: center;
  div.div {
    border: 1px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Viewer;
