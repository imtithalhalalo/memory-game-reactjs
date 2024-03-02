import MemoryGame from './MemoryGame';
import './styles.css';
import React from 'react';


export default App = () => {
    return <MemoryGame 
      cols={4}
      rows={4}
      matchCount={2}
      delay={1000}
      />
}
