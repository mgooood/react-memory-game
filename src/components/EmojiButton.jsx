import { decodeEntity } from 'html-entities';

function EmojiButton({
  handleClick,
  selectedCardEntry,
  matchedCardEntry,
  emoji,
}) {
  const btnContent =
    selectedCardEntry || matchedCardEntry
      ? decodeEntity(emoji.htmlCode[0])
      : '?';

  const btnStyle = matchedCardEntry
    ? 'btn--emoji__back--matched'
    : selectedCardEntry
    ? 'btn--emoji__back--selected'
    : 'btn--emoji__front';

  const btnAria = matchedCardEntry
    ? `${emoji.name}. Matched.`
    : selectedCardEntry
    ? `${emoji.name}. Not matched yet.`
    : `Card upside down.`;

  return (
    <button
      disabled={matchedCardEntry}
      className={`btn btn--emoji ${btnStyle}`}
      onClick={!selectedCardEntry ? handleClick : null}
      aria-label={`Position ${emoji.index + 1}: ${btnAria}`}
      aria-live='polite'
    >
      {btnContent}
    </button>
  );
}

export default EmojiButton;
