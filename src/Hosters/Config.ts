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

  handleUpdateTitleList = (fr: FileReader) => {
    const newSub: MangaListType = JSON.parse(String(fr.result));
    this.handleUpdateManga(newSub, () => alert("w"));
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
        alert("b");
        fr.onload = () => callback(fr, files[0]?.name);
        fr.readAsText(files[0]);
      }
    };

  addOnclikEvent(id: string, callback: (evt: unknown) => void) {
    if (document.querySelector(id) !== null) {
      this.addEvent(id, "click", callback);
    }
  }

  get lists() {
    return document.querySelector("#config-lists")?.getAttribute("value");
  }

  addEvent(
    id: string,
    event: keyof HTMLElementEventMap | keyof HTMLElementEventMap[],
    callback: (evt: unknown) => void
  ) {
    console.log(`adding event on ${event.toString()} in ${id}`);

    if (document.querySelector(id) !== null) {
      if (typeof event === "object") {
        (event as Array<keyof HTMLElementEventMap>).map((e) => {
          return document.querySelector(id)?.addEventListener(e, callback);
        });
      } else if (typeof event === "string") {
        document.querySelector(id)?.addEventListener(event, callback);
      }
    }
  }
  run() {
    console.log("init");
    //var _abelha  = 'abelha'
    this.addOnclikEvent("#config-alert", () => {
      console.log("alert");
    });
    chrome.storage.local.get(
      null,
      ({ __configs__, __lists__, ...chapterList }: MangaListType) => {
        localStorage.setItem(
          "mangakeeper.mangaList",
          JSON.stringify(chapterList)
        );
        localStorage.setItem(
          "mangakeeper.lastUpdate",
          String(new Date().getTime())
        );

        this.addEvent(
          "#config-upload-mangas",
          "change",
          this.getLocalFile(this.handleUpdateTitleList)
        );

        this.addEvent(
          "#config-upload-lists",
          "click",
          this.getLocalFile(this.handleUpdateTitleList)
        );
      }
    );
  }
}
