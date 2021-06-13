import axios from "axios";
import { getDiff } from ".";

export const getThumb = (
  mangaName: string,
  callBack: (url: string) => void
) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json'
  };
  const BASE_URL =
    "https://myanimelist.net/search/prefix.json?type=manga&keyword=";
  axios.get(`${BASE_URL}${mangaName}&v=1`, { headers }).then(({ data }) => {
    const itemns = (
      mock.categories[0].items as { name: string; image_url: string }[]
    ).reduce((p, item) => {
      const dif = getDiff(
        mangaName.replaceAll("-", "").toLowerCase(),
        item.name?.replaceAll(" ", "").replaceAll("-", "").toLowerCase()
      );

      if (dif > 0.1) {
        return p;
      }
      return [...p, { name: item.name, image_url: item.image_url, rate: dif }];
    }, [] as { name: string; image_url: string; rate: number }[]);

    callBack(
      itemns.sort((a, b) => (a.rate > b.rate ? 1 : -1))[0]?.image_url || ""
    );
  });
};

const mock = {
  categories: [
    {
      type: "manga",
      items: [
        {
          id: 89706,
          type: "manga",
          name: "Hensoku-kei Quadrangle",
          url: "https://myanimelist.net/manga/89706/Hensoku-kei_Quadrangle",
          image_url:
            "https://cdn.myanimelist.net/r/116x180/images/manga/1/165854.webp?s=bb3ffe9d6eb3380a023de47c72621628",
          thumbnail_url:
            "https://cdn.myanimelist.net/r/116x76/images/manga/1/165854.webp?s=9076178837b240a5f6e15ada3a87f1eb",
          payload: {
            media_type: "Manga",
            start_year: 2015,
            published: "Apr 15, 2015 to Feb 22, 2017",
            score: "7.02",
            status: "Finished",
          },
          es_score: 3.330165,
        },
        {
          id: 35573,
          type: "manga",
          name: "Orange",
          url: "https://myanimelist.net/manga/35573/Orange",
          image_url:
            "https://cdn.myanimelist.net/r/116x180/images/manga/2/153742.webp?s=f0abcd7935ce784ea520c13a4a85a744",
          thumbnail_url:
            "https://cdn.myanimelist.net/r/116x76/images/manga/2/153742.webp?s=9f9870e4f5de3d908970797b27a9b4e1",
          payload: {
            media_type: "Manga",
            start_year: 2012,
            published: "Mar 13, 2012 to Jan 25, 2017",
            score: "8.37",
            status: "Finished",
          },
          es_score: 0.19345134,
        },
      ],
    },
    {
      type: "anime",
      items: [
        {
          id: 28701,
          type: "anime",
          name: "Fate/stay night: Unlimited Blade Works 2nd Season",
          url: "https://myanimelist.net/anime/28701/Fate_stay_night__Unlimited_Blade_Works_2nd_Season",
          image_url:
            "https://cdn.myanimelist.net/r/116x180/images/anime/11/72863.webp?s=e2a9e9d80fa51013c2b2cb0a0de91991",
          thumbnail_url:
            "https://cdn.myanimelist.net/r/116x76/images/anime/11/72863.webp?s=d096b2d9bffd66c5c415621af83bd068",
          payload: {
            media_type: "TV",
            start_year: 2015,
            aired: "Apr 5, 2015 to Jun 28, 2015",
            score: "8.33",
            status: "Finished Airing",
          },
          es_score: 0.19423111,
        },
        {
          id: 22297,
          type: "anime",
          name: "Fate/stay night: Unlimited Blade Works",
          url: "https://myanimelist.net/anime/22297/Fate_stay_night__Unlimited_Blade_Works",
          image_url:
            "https://cdn.myanimelist.net/r/116x180/images/anime/12/67333.webp?s=deed6799dd73364a0dabd394848b277e",
          thumbnail_url:
            "https://cdn.myanimelist.net/r/116x76/images/anime/12/67333.webp?s=0fb29ff6fb7390b3e434ddec0d7e1062",
          payload: {
            media_type: "TV",
            start_year: 2014,
            aired: "Oct 12, 2014 to Dec 28, 2014",
            score: "8.21",
            status: "Finished Airing",
          },
          es_score: 0.19401199,
        },
        {
          id: 31629,
          type: "anime",
          name: "Granblue Fantasy The Animation",
          url: "https://myanimelist.net/anime/31629/Granblue_Fantasy_The_Animation",
          image_url:
            "https://cdn.myanimelist.net/r/116x180/images/anime/2/81630.webp?s=00bd10ba3a27676d5990c11285e76be0",
          thumbnail_url:
            "https://cdn.myanimelist.net/r/116x76/images/anime/2/81630.webp?s=a8234e19d4e30c5b56791ce8b35bfc8d",
          payload: {
            media_type: "TV",
            start_year: 2017,
            aired: "Apr 2, 2017 to Jun 25, 2017",
            score: "6.67",
            status: "Finished Airing",
          },
          es_score: 0.19400549,
        },
        {
          id: 1519,
          type: "anime",
          name: "Black Lagoon: The Second Barrage",
          url: "https://myanimelist.net/anime/1519/Black_Lagoon__The_Second_Barrage",
          image_url:
            "https://cdn.myanimelist.net/r/116x180/images/anime/3/83748.webp?s=205b472fe94d2ab8270d1d556f3f407e",
          thumbnail_url:
            "https://cdn.myanimelist.net/r/116x76/images/anime/3/83748.webp?s=fa77245edd485836a276f3fd6678fb4d",
          payload: {
            media_type: "TV",
            start_year: 2006,
            aired: "Oct 3, 2006 to Dec 19, 2006",
            score: "8.19",
            status: "Finished Airing",
          },
          es_score: 0.18470989,
        },
        {
          id: 32729,
          type: "anime",
          name: "Orange",
          url: "https://myanimelist.net/anime/32729/Orange",
          image_url:
            "https://cdn.myanimelist.net/r/116x180/images/anime/4/80110.webp?s=7969d499130fe533f418b6a2b5bf6e4f",
          thumbnail_url:
            "https://cdn.myanimelist.net/r/116x76/images/anime/4/80110.webp?s=a3de85d7116c0dcfd67e9be22fff7b87",
          payload: {
            media_type: "TV",
            start_year: 2016,
            aired: "Jul 4, 2016 to Sep 26, 2016",
            score: "7.62",
            status: "Finished Airing",
          },
          es_score: 0.17679094,
        },
        {
          id: 10163,
          type: "anime",
          name: "C: The Money of Soul and Possibility Control",
          url: "https://myanimelist.net/anime/10163/C__The_Money_of_Soul_and_Possibility_Control",
          image_url:
            "https://cdn.myanimelist.net/r/116x180/images/anime/5/50551.webp?s=27a99133e5b626c46b40e6af85e7cf11",
          thumbnail_url:
            "https://cdn.myanimelist.net/r/116x76/images/anime/5/50551.webp?s=45fa272ed01c884f5f4fb0f4eeab3a61",
          payload: {
            media_type: "TV",
            start_year: 2011,
            aired: "Apr 15, 2011 to Jun 24, 2011",
            score: "7.23",
            status: "Finished Airing",
          },
          es_score: 0.16767888,
        },
        {
          id: 33050,
          type: "anime",
          name: "Fate/stay night Movie: Heaven's Feel - III. Spring Song",
          url: "https://myanimelist.net/anime/33050/Fate_stay_night_Movie__Heavens_Feel_-_III_Spring_Song",
          image_url:
            "https://cdn.myanimelist.net/r/116x180/images/anime/1465/113810.webp?s=cd442fba1a2fc46f240d8f6871e0310f",
          thumbnail_url:
            "https://cdn.myanimelist.net/r/116x76/images/anime/1465/113810.webp?s=06701f64b0ded9eeb98ca49dae95da53",
          payload: {
            media_type: "Movie",
            start_year: 2020,
            aired: "Aug 15, 2020",
            score: "8.80",
            status: "Finished Airing",
          },
          es_score: 0.16597486,
        },
      ],
    },
    {
      type: "person",
      items: [
        {
          id: 40388,
          type: "person",
          name: "QUADRANGLE",
          url: "https://myanimelist.net/people/40388/QUADRANGLE",
          image_url:
            "https://cdn.myanimelist.net/images/voiceactors/1/43357.jpg",
          thumbnail_url:
            "https://cdn.myanimelist.net/r/116x76/images/voiceactors/1/43357.jpg?s=1a1dc51e08758f146a10c0333406fc19",
          payload: {
            alternative_name: "",
            birthday: "2016",
            favorites: 2,
          },
          es_score: 0.18782459,
        },
      ],
    },
  ],
};
