import React from "react";
import { MangaListType } from "../../../types/MangasTypes";
import { getTitleList } from "../../../utils/chrome";
import { download } from "../../../utils/localFile";
import IconButton from "../../IconButton";
import { ConfigCardContainer } from "./styles";


const ConfigCard: React.FC<{
  updateList?: (mangalist:MangaListType, callback?:()=>void)=>void
}> = ({ updateList }) => {
  
  //const [titleList, setTitleList] = useState<MangaListType>({});
  const handleDownload = () => {
    getTitleList((caplist) =>
      download(JSON.stringify(caplist), `Readerlist-${new Date().getTime()}.json`, "json")
    );
  };

  const handleClear = ()=>{
    chrome.storage.local.clear()
  }
  return (
    <ConfigCardContainer>
       <IconButton
        icon="/icons/import.png"
        label="Download"
        color="green"
        onClick={handleDownload}
      />
      <IconButton
        icon="/icons/clear.png"
        label="clear"
        color="green"
        description="Clear your Read List"
        type="file"
        onClick={handleClear}
      />
     
       <IconButton
        icon="/icons/import.png"
        label="More"
        color="green"
        href='https://dcrispim.github.io/mangakeeper-config/index.html'
        onClick={()=>{}}
      />
    </ConfigCardContainer>
  );
};

export default ConfigCard;
