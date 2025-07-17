import { useState, useEffect } from 'react';
import Form from './components/Form';
import MemoryCard from './components/MemoryCard';
import AssistiveTechInfo from './components/AssistiveTechInfo';
import GameOver from './components/GameOver';
import ErrorCard from './components/ErrorCard';

function App() {
  const initialFormData = {
    category: 'animals-and-nature',
    number: 10,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isGameOn, setIsGameOn] = useState(false);
  const [emojisData, setEmojisData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [areAllCardsMatched, setAreAllCardsMatched] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    console.log('emojisData: ', emojisData);
  }, [emojisData]);

  useEffect(() => {
    console.log('matched cards: ', matchedCards);
  }, [matchedCards]);

  useEffect(() => {
    console.log('areAllCardsMatched: ', areAllCardsMatched);
  }, [areAllCardsMatched]);

  useEffect(() => {
    console.log('selected cards: ', selectedCards);
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      // matched cards
      setMatchedCards((prev) => [...prev, ...selectedCards]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (emojisData.length && matchedCards.length === emojisData.length) {
      setAreAllCardsMatched(true);
    }
  }, [matchedCards, emojisData]);

  async function startGame(e) {
    e.preventDefault();

    try {
      const basePath = 'https://emojihub.yurace.pro/api/all/category/';
      const response = await fetch(basePath + formData.category);

      if (!response.ok) {
        throw new Error('There was a problem fetching the data.');
      }

      const data = await response.json();
      const dataSlice = getRandomEmojis(+formData.number, data);
      setEmojisData(shuffleArray([...dataSlice, ...dataSlice]));
      setIsGameOn(true);
    } catch (error) {
      console.error('There was a error ', error);
      setIsError(true);
    } finally {
      setIsFirstRender(false);
    }
  }

  function handleFormChange(event) {
    console.log(`${event.target.name}: `, event.target.value);
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleReset() {
    setIsGameOn(false);
    setSelectedCards([]);
    setMatchedCards([]);
    setAreAllCardsMatched(false);
  }

  function turnCard(name, index) {
    console.log('Memory card clicked', name, index);

    //
    if (selectedCards.length < 2) {
      setSelectedCards((prev) => [...prev, { name, index }]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function getRandomEmojis(numberOfEmojis, originalArray) {
    const randomNumbers = getRandomNumbers(
      numberOfEmojis,
      originalArray.length - 1
    );
    const randomEmojis = [];
    if (randomNumbers.length === numberOfEmojis) {
      randomNumbers.forEach((number) =>
        randomEmojis.push(originalArray[number])
      );
    }

    return randomEmojis;
  }

  function getRandomNumbers(numberToReturn, max) {
    const randomNumbers = [];

    while (randomNumbers.length < numberToReturn) {
      const randomNum = getRandomIntInclusive(0, max);
      if (!randomNumbers.includes(randomNum)) {
        randomNumbers.push(randomNum);
      }
    }
    return randomNumbers;
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min); // Ensure min is an integer (rounds up)
    max = Math.floor(max); // Ensure max is an integer (rounds down)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function resetError() {
    setIsError(false);
  }

  return (
    <main>
      <h1>Memory</h1>
      {!isGameOn && !isError && (
        <Form
          handleSubmit={startGame}
          handleChange={handleFormChange}
          formData={formData}
          isFirstRender={isFirstRender}
        />
      )}
      {!areAllCardsMatched && isGameOn && (
        <AssistiveTechInfo
          matchedCards={matchedCards}
          emojisData={emojisData}
        />
      )}
      {areAllCardsMatched && <GameOver handleReset={handleReset} />}
      {isGameOn && (
        <MemoryCard
          handleClick={turnCard}
          data={emojisData}
          selectedCards={selectedCards}
          matchedCards={matchedCards}
        />
      )}
      {isError && <ErrorCard handleReset={resetError} />}
    </main>
  );
}

export default App;
