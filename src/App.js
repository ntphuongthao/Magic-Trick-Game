import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';

const cardImages = [
  { "src": "/img/helmet-1.png", "matched": false},
  { "src": "/img/potion-1.png", "matched": false},
  { "src": "/img/ring-1.png", "matched": false},
  { "src": "/img/scroll-1.png", "matched": false},
  { "src": "/img/shield-1.png", "matched": false},
  { "src": "/img/sword-1.png", "matched": false}
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffle = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  }

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // Making comparison between two choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Start a new game automatically
  useEffect(() => {
    shuffle();
  }, []);
  
  // Reset Turns
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1 className='title'>Magic Trick</h1>
      <button onClick={shuffle}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <Card
            key={card.id}
            src={card.src}
            handleChoice={() => handleChoice(card)}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
