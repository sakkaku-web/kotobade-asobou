import { getGuessStatuses } from '../../lib/statuses';
import { Cell } from './Cell';
import { unicodeSplit } from '../../lib/words';
import { JISHO_SEARCH_LINK } from '../../constants/strings';

type Props = {
  guess: string;
  isRevealing?: boolean;
  word?: string;
};

export const CompletedRow = ({ guess, isRevealing, word }: Props) => {
  const statuses = getGuessStatuses(guess, word);
  const splitGuess = unicodeSplit(guess);

  return (
    <div
      className="flex justify-center mb-1 mx-1 cursor-zoom-in"
      onClick={() => window.open(JISHO_SEARCH_LINK + guess, '_blank')}
    >
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  );
};
