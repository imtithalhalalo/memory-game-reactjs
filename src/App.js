import MemoryGame from './MemoryGame';
import React from 'react';


export default function App () {
    return <MemoryGame 
      cols={4}
      rows={4}
      matchCount={2}
      delay={1000}
      />
}
