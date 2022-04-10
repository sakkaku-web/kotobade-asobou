import { Cell } from './Cell';

type Props = {
  columns: number;
};

export const EmptyRow = ({ columns }: Props) => {
  const emptyCells = Array.from(Array(columns));

  return (
    <div className="flex justify-center mb-1 mx-1">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  );
};
