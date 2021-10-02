import Config from "../Hosters/Config";
import Host from "../Hosters/Host";
import MangaClash from "../Hosters/MangaClash";
import Mangalivre from "../Hosters/MangaLivre";
import MangaYabu from "../Hosters/MangaYabu";
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
  const name = Object.keys(capList).find((capName) => {
    return mangaName === capName || capList[capName].alias?.includes(mangaName);
  });

  return name ? [name, capList[name]] : [mangaName, {} as MangaType];
};

export const runHost = (windowHost: string) => {
  getHost(windowHost)?.run();
};
const adapters: { [a: string]: typeof Host } = {
  "mangalivre.net": Mangalivre,
  "supermangas.site": Host,
  "mangaclash.com": MangaClash,
  "dcrispim.github.io/mangakeeper-config": Config,
  "mangayabu.top": MangaYabu,
  localhost: Config,
  host: Host,
};

export const getHost = (windowHost?: string): Host | undefined => {
  if (windowHost) {
    const Hoster =
      adapters[
        Object.keys(adapters).find((key) => windowHost.includes(key)) || "host"
      ];
    return Hoster ? new Hoster(windowHost) : new Host(windowHost);
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

export const toFloat = (num: string | number) => {
  let normalized = num.toString().replaceAll("-", ".").replaceAll("_", ".");
  return parseFloat(normalized);
};

const agregateCaps = (caps: (string | number)[]) => {
  const out = caps
    .sort((a, b) => (toFloat(a) > toFloat(b) ? 1 : -1))
    .reduce((list, cap) => {
      const normalizedcap = toFloat(cap);
      const lastCap = list[list.length - 1] || "0";
      let outList = [...list];
      if (lastCap?.includes("-")) {
        const [start, end] = lastCap.split("-");
        const delta = normalizedcap - toFloat(end);
        if (delta < 1) {
          const decimalDelta =
            toFloat(normalizedcap.toString().split(".")[1] || "0") -
            toFloat(toFloat(end).toString().split(".")[1] || "0");
          if (decimalDelta > 1) {
            outList.push(normalizedcap.toString());
          } else {
            outList = [
              ...outList.slice(0, -1),
              `${start || 0}-${normalizedcap}`,
            ];
          }
        } else {
          if (delta > 1) {
            outList.push(normalizedcap.toString());
          } else {
            outList = [
              ...outList.slice(0, -1),
              `${start || 0}-${normalizedcap}`,
            ];
          }
        }
      } else {
        const delta = normalizedcap - toFloat(lastCap);
        if (delta > 1) {
          outList.push(normalizedcap.toString());
        } else if (delta != 0) {
          outList = [
            ...outList.slice(0, -1),
            `${lastCap || 0}-${normalizedcap}`,
          ];
        } else {
          outList = [...outList.slice(0, -1), `${lastCap}`];
        }
      }
      return outList;
    }, [] as string[]);

  return out;
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
    alias: ["abhishek", "abyssinian", "아비무쌍"],
    categories: [
      {
        link: "https://mangalivre.net/mangas/acao/23",
        name: "ação",
      },
      {
        link: "https://mangalivre.net/mangas/artes-marciais/36",
        name: "artes marciais",
      },
      {
        link: "https://mangalivre.net/mangas/comedia/26",
        name: "comédia",
      },
      {
        link: "https://mangalivre.net/mangas/drama/29",
        name: "drama",
      },
      {
        link: "https://mangalivre.net/mangas/fantasia/30",
        name: "fantasia",
      },
      {
        link: "https://mangalivre.net/mangas/slice-of-life/48",
        name: "slice of life",
      },
    ],
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
