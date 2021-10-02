import { mockCapList } from ".";
import { MangaListType } from "../types/MangasTypes";

export const getTitleList = (callback: (titlelist: MangaListType) => void) => {
    try {
        
        chrome?.storage.local.get(null, callback);
    } catch (error) {
        callback(mockCapList)
    }
};

export const updateTitleList = (caplist:MangaListType ,callback?: () => void) => {
    try {
        
        chrome?.storage.local.set(caplist, callback);

    } catch (error) {
        callback?.()
    }
};

