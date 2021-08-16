import Host from "../Hosters/Host";
import MangaClash from "../Hosters/MangaClash";
import Mangalivre from "../Hosters/MangaLivre";
import SuperMangas from "../Hosters/SuperMangas";
import { MangaListType, MangaType } from "../types/MangasTypes";

export const capAlert = (cap: MangaType) => {
  console.log("Your Last Cap", cap);

  alert(`Your Last Cap Was: ${cap?.lastCap} on \n${cap?.lastSource}`);
};

export const getNameCap = (
  mangaName: string,
  capList: MangaListType
): [string, MangaType] => {
  console.log({ mangaName, capList });
  const name = Object.keys(capList).find((capName) => {
    return mangaName === capName || capList[capName].alias?.includes(mangaName);
  });

  return name ? [name, capList[name]] : [mangaName, {} as MangaType];
};

export const runHost = (windowHost: string) => {
  console.log(windowHost);
  debugger;
  getHost(windowHost)?.run();
};
const adapters: { [a: string]: typeof Host } = {
  "mangalivre.net": Mangalivre,
  "supermangas.site": Host,
};

export const getHost = (windowHost?: string): Host | undefined => {
  if (windowHost) {
    if (windowHost?.includes("mangalivre.net")) {
      return new Mangalivre(windowHost);
    } else if (windowHost?.includes("supermangas.site")) {
      return new SuperMangas(windowHost);
    } else if (windowHost?.includes("mangaclash.com")) {
      return new MangaClash(windowHost);
    }
  }
};

export const getDiff = (a: string, b: string) => {
  const max = a.length > b.length ? a : b;
  var i = 0;
  var j = 0;
  var result = "";

  while (j < b.length) {
    if (a[i] !== b[j] || i === a.length) result += b[j];
    else i++;
    j++;
  }
  return result.length / max.length;
};

export const mockCapList: MangaListType = {
  "genjitsu-shugi-yuusha-no-oukoku-saikenki": {
    highCap: 29,
    lastCap: "29",
    lastSource:
      "https://mangalivre.net/ler/genjitsu-shugi-yuusha-no-oukoku-saikenki/online/274859/capitulo-29#/!page1",
    thumb:
      "https://static3.mangalivre.net/cdnwp3/capas/4iNvfq1_sxHehH3qzSZhpw/6669/external_cover.jpg?quality=100",
  },
  "hensoku-kei-quadrangle": {
    highCap: 19,
    lastCap: "19",
    lastSource:
      "https://mangalivre.net/ler/hensoku-kei-quadrangle/online/308483/capitulo-19#/!page1",
    thumb:
      "https://static3.mangalivre.net/cdnwp3/capas/CWJ-dzKHlOf6xkipdErcPg/2986/capa.jpg?quality=100",
  },
  "hero-with-another-opinion": {
    highCap: 9,
    lastCap: "9",
    lastSource:
      "https://www.supermangas.site/manhua/hero-with-another-opinion/9091195",
    thumb: "https://img.supermangas.site/img/animes/11447-large.jpg",
  },
  kingdom: {
    highCap: 682,
    lastCap: "682",
    lastSource:
      "https://mangalivre.net/ler/kingdom/online/308355/capitulo-682#/!page1",
    thumb:
      "https://static3.mangalivre.net/cdnwp3/capas/PQtyNOhMVAkN2_3qU0Sg7w/1222/6037ee731c85aexternal_cover.jpg?quality=100",
  },
  "kumo-desu-ga-nani-ka-kumoko-sisters-no-nichijou": {
    highCap: 34,
    lastCap: "34",
    lastSource:
      "https://mangalivre.net/ler/kumo-desu-ga-nani-ka-kumoko-sisters-no-nichijou/online/308532/capitulo-34#/!page1",
    thumb:
      "https://static3.mangalivre.net/cdnwp3/capas/_tqh-fUkx9XLteQwVRwVvA/10577/external_cover.jpg?quality=100",
  },
  "peerless-dad": {
    alias: ["abhishek"],
    highCap: 42,
    lastCap: "42",
    lastSource:
      "https://mangalivre.net/ler/peerless-dad/online/203416/capitulo-42",
    thumb:
      "https://static3.mangalivre.net/cdnwp3/capas/kA1baJxRIIL5AX-S3NIj8Q/8089/external_cover.jpg?quality=100",
  },
  "the-great-mage-returns-after-4000-years": {
    highCap: 45,
    lastCap: "45",
    lastSource:
      "https://mangalivre.net/ler/the-great-mage-returns-after-4000-years/online/248188/capitulo-45#/!page5",
    thumb:
      "https://static3.mangalivre.net/cdnwp3/capas/B6NWlivp6r1yxiiFmRnmvQ/9735/602060f6671e8external_cover.jpg?quality=100",
  },
  "the-second-coming-of-gluttony": {
    highCap: 11,
    lastCap: "11",
    lastSource:
      "https://mangalivre.net/ler/the-second-coming-of-gluttony/online/203689/capitulo-11#/!page1",
    thumb:
      "https://static3.mangalivre.net/cdnwp3/capas/v4nTPQLA0XJuOqBz6AGmtg/8993/6037e34780e42external_cover.jpg?quality=100",
  },
  "tsuki-ga-michibiku-isekai-douchuu": {
    highCap: 38,
    lastCap: "38",
    lastSource:
      "https://mangalivre.net/ler/tsuki-ga-michibiku-isekai-douchuu/online/251565/capitulo-38#/!page27",
    thumb:
      "https://static3.mangalivre.net/cdnwp3/capas/HeuBLkPF4zSgplYwTbvTyA/3446/external_cover.jpg?quality=100",
  },
};
