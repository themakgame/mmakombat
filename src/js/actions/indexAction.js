import { ADD_ARTICLE } from "../constants/action-types";

export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });
// export const searchFighters = fighter => ({ type: "SEARCH_FIGHTERS", payload: fighter });
export const setMainFighter = fighter => ({ type: "SET_MAINFIGHTER", payload: fighter });
export const setSecondFighter = fighter => ({ type: "SET_SECONDFIGHTER", payload: fighter });
