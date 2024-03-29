import { MangaListType } from "../types/MangasTypes";
import { capAlert, getNameCap } from "../utils";

export default class Host {
  host: string;

  constructor(host: string) {
    this.host = host;
  }
  get lastCap(): string {
    throw Error("LASTCAP method is not implemented");
  }

  get alias(): string[] {
    throw Error("ALIAS method is not implemented");
  }

  get categories(): { name: string; link?: string }[] {
    throw Error("CATEGORIES method is not implemented");
  }
  get progress(): string {
    throw Error("PROGRESS method is not implemented");
  }

  get mangaCap(): string {
    throw Error("MANGACAP method is not implemented");
  }

  get isListPage(): boolean {
    throw Error("ISLISTPAGE method is not implemented");
  }

  get isCapPage(): boolean {
    throw Error("ISCAPPAGE method is not implemented");
  }
  get mangaName(): string {
    throw Error("ISMANGANAME method is not implemented");
  }

  get thumb(): string {
    throw Error("THUMB method is not implemented");
  }
  showLastCap(): void {
    chrome.storage.local.get(null, (caplist) => {
      const [mangaName, currentCap] = getNameCap(this.mangaName, caplist);
      console.log({ currentCap, type: typeof currentCap, mangaName });

      if (typeof currentCap === "object") {
        const cats = currentCap?.categories || [];
        const alias = currentCap.alias || [];
        this.categories?.map((thisCat) => {
          if (
            !cats.find(
              (c) => c.name.toLowerCase() === thisCat.name.toLowerCase()
            )
          ) {
            cats.push({ ...thisCat, name: thisCat.name.toLowerCase() });
          }
          return null;
        });

        this.alias?.map((thisCat) => {
          if (!alias.includes(thisCat.toLowerCase())) {
            alias.push(thisCat.toLowerCase());
          }
          return null;
        });
        console.log({ alias, cats });
        chrome.storage.local.set(
          {
            [mangaName]: {
              ...currentCap,
              thumb: currentCap.thumb || this.thumb,
              categories: [...cats],
              alias,
              sources: {
                ...currentCap.sources,
                [window.location.hostname]: window.location.hostname,
              },
              lastSource: currentCap.lastSource || window.location.href,
            },
          },
          () => {
            console.log(
              "The " + mangaName + " Thumb was updated to: ",
              this.thumb
            );
          }
        );
      }
      if (currentCap.lastCap) {
        capAlert(currentCap);
      }
    });
  }

  addLastCap(cap?: string): void {
    let queryOptions = { active: true, currentWindow: true };

    chrome.tabs?.query(queryOptions, ([tab]) => {
      console.log(tab, "abelha");
    });

    const currentCap = this.mangaCap;
    chrome.storage.local.get(null, (caplist: MangaListType) => {
      const [mangaName, cap] = getNameCap(this.mangaName, caplist);
      cap.lastCap = currentCap;
      cap.lastSource = this.host;
      cap.thumb = this.thumb.length > 0 ? this.thumb : cap.thumb;
      cap.lastTime = Date.now();
     

      if (!isNaN(parseFloat(currentCap))) {
        const highCap =
          parseFloat(cap.highCap?.toString()) > parseFloat(currentCap)
            ? parseFloat(cap.highCap?.toString())
            : parseFloat(currentCap);
        cap.highCap = parseFloat(highCap?.toString());
      }
      console.log({ cap, mangaName, currentCap });

      chrome.storage.local.set({ [mangaName]: cap }, function () {
        console.log("The " + mangaName + " was updated to: ", cap);
      });
    });
  }
  pageEvent() {
    console.log("pageEvent");
  }
  run() {
    console.log("INIT HOST", this.isListPage);
    this.pageEvent();
    if (this.isListPage) this.showLastCap();
    else if (this.isCapPage) this.addLastCap();
  }
}
