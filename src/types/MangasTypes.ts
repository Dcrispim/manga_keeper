export type MangaType = {
  lastCap: string | number;
  highCap: string | number;
  lastSource: string;
  thumb?: string;
  alias?: string[];
};

export type MangaListType = {
  [name: string]: MangaType;
};
