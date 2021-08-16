import { MangaListType } from "../types/MangasTypes";
import Host from "./Host";

export default class MangaClash extends Host {
  get mangaCap() {
    if (this.isCapPage) return this.host.split("chapter-")[1].split("/")[0];
    else return "";
  }

  get alias() {
    if (this.isListPage) {
      return (
        Array.from<HTMLDivElement>(
          document.querySelectorAll("div.post-content>div.post-content_item")
        )
          ?.filter(
            (item) =>
              item.querySelector<HTMLHeadingElement>("div.summary-heading>h5")
                ?.innerText === "Alternative"
          )?.[0]
          ?.querySelector<HTMLDivElement>("div.summary-content")
          ?.innerText.split(";")
          .map((text) => text?.trim()) || []
      );
    } else return [] as string[];
  }

  get lastCap() {
    if (this.isListPage)
      return (
        document
          .querySelector<HTMLLIElement>(
            "div.page-content-listing.single-page > div.listing-chapters_wrap > ul.main.version-chap > li:nth-child(1)"
          )
          ?.innerText.split("\n")[0]
          .trim()
          .split(" ")[1] || ""
      );
    else return "";
  }

  get isDestaq() {
    return this.host.split("/")[3] === "destaques";
  }

  get categories() {
    if (this.isListPage) {
      const categoriesList = Array.from(
        Array.from<HTMLDivElement>(
          document.querySelectorAll("div.post-content>div.post-content_item")
        )
          ?.filter(
            (item) =>
              item.querySelector<HTMLHeadingElement>("div.summary-heading>h5")
                ?.innerText === "Genre(s)"
          )?.[0]
          ?.querySelectorAll<HTMLLinkElement>(
            "div.summary-content>div.genres-content>a"
          )
      );
      return categoriesList?.map((link) => ({
        name: link.innerText,
        link: link.href,
      }));
    } else return [] as { name: string; link?: string }[];
  }
  get mangaName() {
    return this.host.split("/")[4].trim() || "";
  }

  get thumb() {
    if (this.isListPage)
      return (
        document.querySelector<HTMLImageElement>("div.summary_image>a>img")
          ?.src || ""
      );
    else return "";
  }

  get isCapPage() {
    return this.host.includes("chapter-");
  }

  get isListPage() {
    return (
      this.host.split("/").includes("manga") && this.host.split("/").length <= 6
    );
  }
}
