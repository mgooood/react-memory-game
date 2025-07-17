import EmojiButton from './EmojiButton';

function MemoryCard({ handleClick, data, selectedCards, matchedCards }) {
  const cardEl = data.map((emoji, index) => {
    const selectedCardEntry = selectedCards.find(
      (card) => index === card.index
    );
    const matchedCardEntry = matchedCards.find((card) => index === card.index);
    let cardStyle = matchedCardEntry
      ? 'card-item--matched'
      : selectedCardEntry
      ? 'card-item--selected'
      : '';

    return (
      <li key={index} className={`card-item ${cardStyle}`}>
        <EmojiButton
          handleClick={() => handleClick(emoji.name, index)}
          selectedCardEntry={selectedCardEntry}
          matchedCardEntry={matchedCardEntry}
          emoji={{ ...emoji, index }}
        />
      </li>
    );
  });

  return <ul className='card-container'>{cardEl}</ul>;
}

export default MemoryCard;
