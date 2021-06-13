import Host from "./Host";

export default class Mangalivre extends Host {
  get mangaCap() {
    if (this.isCapPage) return this.host.split("capitulo-")[1].split("#")[0];
    else return "";
  }

  get mangaName() {
    return this.host.split("/")[4].trim() || "";
  }

  get thumb() {
    if (this.isListPage)
      return (
        (document.querySelector("div.cover>img") as HTMLImageElement)?.src || ""
      );
    else if (this.isCapPage)
      return (
        document.querySelector("div.series-cover") as HTMLDivElement
      ).style.backgroundImage
        .replaceAll('url("', "")
        .replaceAll('")', "");
    else return "";
  }

  get isCapPage() {
    return this.host.includes("capitulo-");
  }

  get isListPage() {
    return this.host.split("/").includes("manga");
  }
}
