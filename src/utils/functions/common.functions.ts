

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
