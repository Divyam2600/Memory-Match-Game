import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/block.png", matched: false },
  { src: "/img/circular-shield.png", matched: false },
  { src: "/img/green-potion.png", matched: false },
  { src: "/img/heart-potion.png", matched: false },
  { src: "/img/shield.png", matched: false },
  { src: "/img/sword.png", matched: false },
  { src: "/img/ring.png", matched: false },
  { src: "/img/scroll.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(()=> resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);


  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false)
  };

  //start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  console.log(cards)

  return (
    <div className="max-w-md p-2 mx-auto">
      <div className="flex">
      <img src="/logo.png" alt="" className="w-2/6 mt-2" />
      <h1 className="font-bold my-4 text-3xl sm:text-4xl ">Memory Match</h1>
      </div>
      <button
        onClick={shuffleCards}
        className="bg-none border-2 border-solid border-white px-3 py-1 font-bold cursor-pointer text-white hover:bg-pink-700 rounded-md hover:text-white text-xl"
      >
        New Game
      </button>
      <div className="mt-5 grid grid-cols-4 gap-[7px] ">
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
        ))}
      </div>
      <p className="text-lg mt-2">No of Turns: {turns} </p>
    </div>
  );
}

export default App;
