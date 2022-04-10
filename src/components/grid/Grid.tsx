import { MAX_CHALLENGES, MAX_WORD_LENGTH } from '../../constants/settings';
import { CompletedRow } from './CompletedRow';
import { CurrentRow } from './CurrentRow';
import { EmptyRow } from './EmptyRow';

type Props = {
  guesses: string[];
  currentGuess: string;
  isRevealing?: boolean;
  currentRowClassName: string;
  maxRows?: number;
  word?: string;
};

export const Grid = ({
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
  maxRows,
  word,
}: Props) => {
  const rows = maxRows || MAX_CHALLENGES;
  const cols = word?.length || MAX_WORD_LENGTH;

  const empties =
    guesses.length < rows - 1
      ? Array.from(Array(rows - 1 - guesses.length))
      : [];

  return (
    <div className="flex justify-center pb-1 md:pb-2">
      <div className="grid grid-flow-row">
        {guesses.map((guess, i) => (
          <CompletedRow
            key={i}
            guess={guess}
            isRevealing={isRevealing && guesses.length - 1 === i}
            word={word}
          />
        ))}
        {guesses.length < rows && (
          <CurrentRow
            guess={currentGuess}
            className={currentRowClassName}
            columns={cols}
          />
        )}
        {empties.map((_, i) => (
          <EmptyRow key={i} columns={cols} />
        ))}
      </div>
    </div>
  );
};
