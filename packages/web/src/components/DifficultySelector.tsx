import React from 'react';
import { Difficulty } from '@init-sudoku-post5/contracts';

interface DifficultySelectorProps {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ selected, onSelect }) => {
  const difficulties: Difficulty[] = Object.values(Difficulty);

  return (
    <div className="flex space-x-4 mb-4">
      {difficulties.map((d) => (
        <label key={d} className="inline-flex items-center">
          <input
            type="radio"
            name="difficulty"
            value={d}
            checked={selected === d}
            onChange={() => onSelect(d)}
            className="mr-1"
          />
          {d.charAt(0).toUpperCase() + d.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default DifficultySelector;
