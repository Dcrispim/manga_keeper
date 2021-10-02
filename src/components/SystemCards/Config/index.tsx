import React from "react";
import { MangaListType } from "../../../types/MangasTypes";
import { getTitleList } from "../../../utils/chrome";
import { download, getLocalFile } from "../../../utils/localFile";
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
  const handleUpdateTitleList = (fr: FileReader) => {
    alert('s')
    const newSub: MangaListType = JSON.parse(String(fr.result));
    updateList?.(
     newSub,
      () => alert("w")
    );
  };
  return (
    <ConfigCardContainer>
      <IconButton
        icon="/icons/export.png"
        label="Import"
        color="green"
        description="Import your Read List to from yours Local Files"
        type="file"
        onChange={getLocalFile(handleUpdateTitleList)}
      />
      <IconButton
        icon="/icons/import.png"
        label="Download"
        color="green"
        onClick={handleDownload}
      />
       <IconButton
        icon="/icons/import.png"
        label="Mores"
        color="green"
        href='http://localhost:3000/'
        onClick={()=>{}}
      />
    </ConfigCardContainer>
  );
};

export default ConfigCard;
