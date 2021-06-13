import Host from "./Host";

export default class SuperMangas extends Host {
  get mangaCap() {
    if (this.isCapPage)
      return (
        document?.querySelector(".capBox")?.getAttribute("data-book-number") ||
        ""
      );
    else return "";
  }

  get mangaName() {
    return this.host.split("/")[4].trim() || "";
  }

  get thumb() {
    if (this.isListPage)
      return (
        (document.querySelector("span.boxAnimeImg>img") as HTMLImageElement)
          ?.src || ""
      );
    if (this.isCapPage)
      return (
        (document.querySelector("div.box>a#cat>img") as HTMLImageElement).src ||
        ""
      );
    else return "";
  }
  get isCapPage() {
    return !!this.host.split("/")[5];
  }

  get isListPage() {
    return !this.host.split("/")[5];
  }
}
