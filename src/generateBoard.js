import emojis from "./constants";
import shuffle from "./shuffle";

const generateBoard = (totalCards, matchCount) => {
    const numberOfDifferentEmojis = totalCards / matchCount;
  
    if (numberOfDifferentEmojis > emojis.length) {
      throw new Error('No enough emojis');
    }
    const emojisList = emojis.slice(0, numberOfDifferentEmojis);
    const cardsArray = Array.from({ length: numberOfDifferentEmojis }, () => null);
    const cardsWithIndices = cardsArray.map((_, idx) => idx);
    const cardsWithEmojis = cardsWithIndices.map((idx) =>
      Array.from({ length: matchCount }, () => emojisList[idx])
    );
    const cards = cardsWithEmojis.flat();
    shuffle(cards);
  
    return cards;
}

export default generateBoard; 