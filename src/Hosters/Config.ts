import { MangaListType } from "../types/MangasTypes";
import Host from "./Host";

export default class Config extends Host {
  get isDestaq() {
    return false;
  }

  get isCapPage() {
    return false;
  }

  get isListPage() {
    return false;
  }

  get toUpload(): MangaListType {
    return JSON.parse(localStorage.getItem("mangakeeper.toUpload") || "{}");
  }

  handleUpdateTitleList = (fr: FileReader) => {
    const newSub: MangaListType = JSON.parse(String(fr.result));
    this.handleUpdateManga(newSub, () => {});
  };

  handleUpdateManga = (mangalist: MangaListType, callback?: () => void) => {
    chrome?.storage.local.set({ ...mangalist }, () => {
      callback?.();
    });
  };

  getLocalFile =
    (callback: (fr: FileReader, name?: string) => void) => (evt: unknown) => {
      let tgt = evt.target;
      let files = tgt?.files;
      console.log("d");
      // FileReader support
      if (FileReader && files && files.length) {
        let fr = new FileReader();
        fr.onload = () => callback(fr, files[0]?.name);
        fr.readAsText(files[0]);
      }
    };

  run() {
    console.log("init");
    chrome.storage.local.set(
      {
        ...this.toUpload,
      },
      () => {
        console.log("Updated informations,", this.toUpload);
        localStorage.removeItem("mangakeeper.toUpload");
      }
    );
    chrome.storage.local.get(
      null,
      ({ ...chapterList }: MangaListType) => {
        localStorage.setItem(
          "mangakeeper.mangaList",
          JSON.stringify(chapterList)
        );
      }
    );
  }
}
