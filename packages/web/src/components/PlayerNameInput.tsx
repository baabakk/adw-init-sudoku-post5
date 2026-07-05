import React, { useState, useEffect } from 'react';
import { validatePlayerName } from '../utils/validation';
import { escapeHtml } from '../utils/security';

interface PlayerNameInputProps {
  onValidName: (name: string) => void;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ onValidName }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { valid, error: err } = validatePlayerName(name);
    if (valid) {
      setError(null);
      onValidName(name.trim());
    } else {
      setError(err ?? 'Invalid name');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">Player Name:</label>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        className="border px-2 py-1 w-full"
        placeholder="Enter your name"
      />
      {error && <p className="text-red-600 mt-1">{escapeHtml(error)}</p>}
    </div>
  );
};

export default PlayerNameInput;
