export type MangaType = {
  lastCap: string | number;
  highCap: string | number;
  lastSource: string;
  lastTime?: number;
  thumb?: string;
  alias?: string[];
  sources?: { [hostname: string]: string };
  history?: {
    [timestamp: number]: string;
  };
  categories: {
    name: string;
    link?: string;
  }[];
};

export type MangaListType = {
  [name: string]: MangaType;
};
