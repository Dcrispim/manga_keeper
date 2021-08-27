import Host from "./Host";

export default class MangaYabu extends Host {
  get mangaCap() {
    if (this.isCapPage)
      return this.host
        .split("/")[4]
        .split("-capitulo")[1]
        .split("-")
        .slice(0, -1)
        .join("");
    else return "";
  }

  get mangaName() {
    if (this.isCapPage)
      return this.host.split("/")[4].split("-capitulo")[0] || "";
    else if (this.isListPage) return this.host.split("/")[4] || "";
    else return "";
  }
  get alias() {
    return [];
  }
  get categories() {
    if (this.isListPage)
      return (
        Array.from<HTMLDivElement>(
          document.querySelectorAll("div.manga-column")
        )
          .find((div) => div?.innerText.includes("Gêneros"))
          ?.innerText.replaceAll("Gêneros:", "")
          .trim()
          .split(",")
          .map((a) => ({name:a.trim().toLowerCase() })) || []
      );
    else return [];
  }

  get thumb() {
    if (this.isListPage)
      return (
        (document.querySelector("div.mango-hover>img") as HTMLImageElement)
          ?.src || ""
      );
    if (this.isCapPage)
      return (
        (document.querySelector("div.single.mango-hover>img") as HTMLImageElement).src ||
        ""
      );
    else return "";
  }
  get isCapPage() {
    return this.host.split("/")[3] === "ler";
  }

  get isListPage() {
    return this.host.split("/")[3] === "manga";
  }

  run() {
    console.log("ei");

    document.querySelector("div.bf")?.remove();

    super.run();
  }
}
