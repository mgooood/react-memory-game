function AssistiveTechInfo({ emojisData, matchedCards }) {
  const matchedSets = matchedCards.length ? matchedCards.length / 2 : 0;
  const cardsLeft =
    emojisData.length && matchedCards.length
      ? emojisData.length - matchedCards.length
      : emojisData.length;

  return (
    <section className='sr-only' aria-live='polite' aria-atomic='true'>
      <h2>Game Status</h2>
      <p>Number of matched pairs: {matchedSets}</p>
      <p>Number of cards left to match: {cardsLeft}</p>
    </section>
  );
}

export default AssistiveTechInfo;
