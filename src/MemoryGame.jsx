import React, { useState, useEffect, useRef, useCallback } from 'react';
import generateBoard from './generateBoard';

const MemoryGame = ({
    cols,
    rows,
    matchCount = 2,
    delay
  }) => {
    const totalCards = cols * rows;
    const [cards, setCards] = useState(generateBoard(totalCards, matchCount));
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState(new Set());
    const [gameEnded, setGameEnded] = useState(true);
    const waitTimer = useRef(null);
  
    const resetGame = useCallback(() => {
        setFlipped([]);
        setCards(generateBoard(totalCards, matchCount));
        setGameEnded(false);
        setMatched(new Set());
        waitTimer.current = null;
    }, [matchCount, totalCards]);
  
  
    useEffect(() => {
      resetGame();
    }, [resetGame, matchCount, cols, rows]);
  
    if (matchCount === 1) {
      throw new Error('The match count is not above 1');
    }
  
    if (totalCards % matchCount !== 0) {
      throw new Error(`Cannot divide ${totalCards} over ${matchCount}`);
    }
  
    const whenFlipped = (index) => {
        let currFlipped = flipped;
    
        // Player flips more cards while there are
        // unmatched cards flipped open.
        if (waitTimer.current != null) {
            clearTimeout(waitTimer.current);
            waitTimer.current = null;
            currFlipped = [];
        }
    
        const newflipped = [...currFlipped, index];
        setFlipped(newflipped);
    
        // Not enough cards are flipped.
        if (newflipped.length < matchCount) {
            return;
        }
    
        const allFlippedAreSame = newflipped.every(
            (index) => cards[newflipped[0]] === cards[index],
        );
    
        if (allFlippedAreSame) {
            const newMatchedSet = new Set(matched);
            newMatchedSet.add(cards[newflipped[0]]);
            setMatched(newMatchedSet);
            setFlipped([]);
    
            if (newMatchedSet.size * matchCount === totalCards) {
            setGameEnded(true);
            }
    
            return;
        }
    
        const timer = setTimeout(() => {
            // After a delay if no new cards were flipped,
            // flip all cards back.
            setFlipped([]);
            waitTimer.current = null;
        }, delay);
    
        waitTimer.current = timer;
    }
  
  
    return (
     <div className="app">
        <div
          className="grid"
          style={{
            gridTemplateRows: `repeat(${rows}, var(--size))`,
            gridTemplateColumns: `repeat(${cols}, var(--size))`,
          }}>
          {cards.map((card, index) => {
            const isMatched = matched.has(cards[index]);
            const isFlipped = flipped.includes(index);
  
            return (
              <button
                key={index}
                className={[
                  'card',
                  matched.has(cards[index]) &&
                    'card--revealed',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={isMatched || isFlipped}
                onClick={() => {
                  whenFlipped(index);
                }}>
                {(isMatched || isFlipped) && card}
              </button>
            );
          })}
        </div>
        {gameEnded && (
          <button onClick={resetGame} className='button'>Play Again</button>
        )}
      </div>
  
     
    )
}

export default MemoryGame;
  