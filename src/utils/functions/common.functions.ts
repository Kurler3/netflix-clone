import { history } from "../history";


// TRANSFORM GENRE NAME
export const transformGenreName = (genreName: string): string => {
    const cleaned = genreName.replace(/&|-/g, "");
    const words = cleaned.split(" ");
    const capitalizedWords = words.map((word, index) => {
        if(index > 0) return word.charAt(0).toUpperCase() + word.slice(1);
        else return word;
    });
    return capitalizedWords.join("");
  }

export const generateNumbersList = (length: number): number[] => {
    const numbers = [];
    for(let i = 0; i < length; i++) {
        numbers.push(i);
    }
    return numbers;
}

export const navigateTo = (path: string) => {
    history.push(path);
}