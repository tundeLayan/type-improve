import { STORE_WORDS } from "./Types"

export const storeWords = (words) => {
    return{
        type: STORE_WORDS,
        payload: words
    }
}