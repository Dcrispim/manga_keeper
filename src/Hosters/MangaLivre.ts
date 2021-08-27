import Host from "./Host";

export default class Mangalivre extends Host {
  get mangaCap() {
    if (this.isCapPage) return this.host.split("capitulo-")[1].split("#")[0];
    else return "";
  }

  get alias() {
    if (this.isListPage)
      return Array.from<HTMLLinkElement>(
        document.querySelectorAll("ol.series-synom>li")
      ).map((li) => li?.innerText?.toLowerCase());
    else return [] as string[];
  }

  get lastCap() {
    if (this.isListPage)
      return (
        document?.querySelector(
          "div.container-box.default.color-brown>h2>span"
        ) as HTMLSpanElement
      )?.innerText;
    else return "";
  }

  get isDestaq() {
    return this.host.split("/")[3] === "destaques";
  }

  get categories() {
    if (this.isListPage)
      return Array.from<HTMLLinkElement>(
        document.querySelectorAll(
          "div.touchcarousel-wrapper.grab-cursor>ul.tags.touchcarousel-container>li.touchcarousel-item>a>span"
        )
      ).map((cat) => ({
        name: cat.innerText,
        link: (cat.parentElement as HTMLLinkElement)?.href,
      }));
    else return [] as { name: string; link?: string }[];
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
