import { MangaListType } from "../types/MangasTypes";
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

  getAll = () => {
    const getThumb = (el) =>
      el
        .querySelector("div.cover-image")
        .style.backgroundImage.match(/(?<=url\(\")(.*)(?=\"\))/)[0]
        .toString();

    const getTitle = (el) =>
      el.querySelector("span.series-title").innerText.toLowerCase();

    const getTags = (el) =>
      Array.from(el.querySelectorAll("span.button"))
        .filter((e) => e.querySelector("img") === null)
        .map((e) => e.innerText.toLowerCase());

    const a = Array.from(document.querySelectorAll("li>a.link-block"));

    const c = a.reduce(
      (obj, title) => ({
        ...obj,
        [getTitle(title)]: {
          lastUpdate: new Date().getTime(),
          thumb: getThumb(title),
          tags: getTags(title),
          link: title.href,
          chapters: title
            .querySelector("span.series-chapters")
            ?.innerText?.trim(),
        },
      }),
      {}
    );
    localStorage.setItem(
      "listAll",
      JSON.stringify({
        ...c,
        ...JSON.parse(localStorage.getItem("listAll") || "{}"),
      })
    );
    return c;
  };

  pageEvent() {
    if (this.isCapPage) {
      const toolsContainer = document.querySelector<HTMLDivElement>(
        "div.reader-controls.mobile-controls>div.right-controls"
      );

      const btn = document.createElement("div");
      btn.className = "report-container";
      btn.style = `
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: x-large;
      `;
      btn.innerHTML = `<span style="border-radius:20px" >🔁</span>`;
      btn.onclick = () =>
        Array.from<HTMLImageElement>(
          document.querySelectorAll("div.manga-image>img")
        ).reduce((prevImgs, img) => {
          if (prevImgs.includes(img.src)) {
            console.log(img.src);
            img.parentElement?.remove();
          } else {
            prevImgs.push(img.src);
          }
          return prevImgs;
        }, [] as string[]);
      toolsContainer?.appendChild(btn);

      //-------------------ZOOM-------------------------------
      const zoom = document.createElement("div");
      const zoomBtnPlus = document.createElement("div");
      const zoomBtnMinus = document.createElement("div");

      zoom.style = `
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      font-size: x-large;
      color:white;
      width: 100px;
      font-weight: bold
      `;

      zoom.className = "release-rating-container";
      //zoomBtnMinus.className = "report-container";

      zoomBtnPlus.style =
        "border-right: 1px solid hsla(0,0%,100%,.25); width:100%";
      zoomBtnMinus.style = "width:100%";

      zoomBtnPlus.innerHTML = `<span style="border-radius:20px" >+</span>`;
      zoomBtnMinus.innerHTML = `<span style="border-radius:20px" >-</span>`;

      zoomBtnPlus.onclick = () =>
        Array.from<HTMLImageElement>(
          document.querySelectorAll("div.manga-image>img")
        ).map((img) => {
          const currenW = img.style.width.includes("%")
            ? parseFloat(img.style.width)
            : (parseFloat(img.style.width) / window.innerWidth) * 100;

          return (img.style.width =
            currenW + 10 <= 100 ? `${currenW + 10}%` : "100%");
        });

      zoomBtnMinus.onclick = () =>
        Array.from<HTMLImageElement>(
          document.querySelectorAll("div.manga-image>img")
        ).map((img) => {
          const currenW = parseFloat(img.style.width);
          return (img.style.width =
            currenW - 10 >= 10 ? `${currenW - 10}%` : "10%");
        });

      zoom.appendChild(zoomBtnPlus);
      zoom.appendChild(zoomBtnMinus);

      toolsContainer?.appendChild(zoom);
    } else if (this.isDestaq) {
      const destaqs = Array.from<HTMLDivElement>(
        document.querySelectorAll("div.destaque-wrap")
      );

      chrome.storage.local.get(null, (capList: MangaListType) => {
        destaqs.map((destaq) => {
          const isRead = document.createElement("div");
          isRead.innerText = "LIDO";
          isRead.style = `
      background-color: rgba(0, 0, 0, 0.6);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      font-size: 70px;
      color: rgb(255, 255, 255);
      font-weight: bold;`;
          const destaqName = destaq
            .querySelector<HTMLSpanElement>("a.chapter-link")
            ?.href.split("/")[4];
          const destaqCap =
            destaq.querySelector<HTMLSpanElement>(
              "a.chapter-link>div.chapter-number-wrap>div.chapter-number>span"
            )?.innerText || "";

          if (capList[destaqName]?.lastCap?.toString() === destaqCap) {
            destaq.appendChild(isRead);
          }
        });
      });
    }
  }
}
