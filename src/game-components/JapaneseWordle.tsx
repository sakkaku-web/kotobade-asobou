import { AlertProvider } from '../context/AlertContext';
import { Game } from './Game';

type Props = {
  word: string;
  maxAttempts: number;
  hardMode?: boolean;
  onWin?: () => void;
  onLose?: () => void;
};

export function JapaneseWordle(props: Props) {
  return (
    <AlertProvider>
      <Game {...props} />
    </AlertProvider>
  );
}
