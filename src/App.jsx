import React, { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner("Draw");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen flex items-center justify-center transition-all duration-500`}>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">Tic Tac Toe</h1>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {board.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-3xl font-bold text-black dark:text-white rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              {value}
            </div>
          ))}
        </div>
        {winner && (
          <div className="mb-4 text-xl">
            {winner === "Draw" ? "It's a Draw!" : `Winner: ${winner}`}
          </div>
        )}
        <button
          onClick={resetGame}
          className="bg-blue-500 dark:bg-blue-800 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-900 transition-all duration-300"
        >
          Reset Game
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-4 bg-yellow-500 dark:bg-yellow-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 dark:hover:bg-yellow-800 transition-all duration-300"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default App;