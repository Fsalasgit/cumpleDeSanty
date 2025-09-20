// src/trivia.js

export const triviaData = {
  matematica: {
    facil: [
      { question: "¿Cuánto es 5 + 3?", options: ["6", "7", "8", "9"], answer: "8", reward: 50 },
      { question: "¿Cuánto es 10 - 4?", options: ["4", "5", "6", "7"], answer: "6", reward: 50 },
      { question: "¿Cuánto es 2 + 6?", options: ["6", "7", "8", "9"], answer: "8", reward: 50 },
      { question: "¿Cuánto es 12 - 7?", options: ["3", "4", "5", "6"], answer: "5", reward: 50 },
      { question: "¿Cuánto es 9 + 1?", options: ["9", "10", "11", "12"], answer: "10", reward: 50 },
      { question: "¿Cuánto es 4 + 4?", options: ["6", "7", "8", "9"], answer: "8", reward: 50 },
      { question: "¿Cuánto es 15 - 9?", options: ["5", "6", "7", "8"], answer: "6", reward: 50 },
      { question: "¿Cuánto es 7 + 2?", options: ["8", "9", "10", "11"], answer: "9", reward: 50 },
      { question: "¿Cuánto es 20 - 10?", options: ["5", "10", "15", "20"], answer: "10", reward: 50 },
      { question: "¿Cuánto es 3 + 6?", options: ["8", "9", "10", "11"], answer: "9", reward: 50 },
    ],
    intermedio: [
      { question: "¿Cuál es la raíz cuadrada de 81?", options: ["7", "8", "9", "10"], answer: "9", reward: 100 },
      { question: "¿Cuánto es 12 × 12?", options: ["124", "144", "122", "132"], answer: "144", reward: 100 },
      { question: "¿Cuál es la raíz cuadrada de 49?", options: ["6", "7", "8", "9"], answer: "7", reward: 100 },
      { question: "¿Cuánto es 15 × 3?", options: ["30", "35", "45", "50"], answer: "45", reward: 100 },
      { question: "¿Cuánto es 100 ÷ 4?", options: ["20", "25", "30", "40"], answer: "25", reward: 100 },
      { question: "¿Cuánto es 8 × 7?", options: ["54", "56", "58", "64"], answer: "56", reward: 100 },
      { question: "¿Cuánto es 90 ÷ 10?", options: ["8", "9", "10", "11"], answer: "9", reward: 100 },
      { question: "¿Cuál es la raíz cuadrada de 100?", options: ["9", "10", "11", "12"], answer: "10", reward: 100 },
      { question: "¿Cuánto es 45 ÷ 5?", options: ["8", "9", "10", "12"], answer: "9", reward: 100 },
      { question: "¿Cuánto es 11 × 11?", options: ["110", "111", "121", "122"], answer: "121", reward: 100 },
    ],
    dificil: [
      { question: "Si 2x + 5 = 15, ¿cuánto vale x?", options: ["3", "5", "10", "15"], answer: "5", reward: 200 },
      { question: "Resuelve: (20 ÷ 4) + (3 × 2)", options: ["8", "10", "11", "12"], answer: "11", reward: 200 },
      { question: "Si 3x = 21, ¿cuánto vale x?", options: ["5", "6", "7", "8"], answer: "7", reward: 200 },
      { question: "¿Cuánto es 2³ × 3²?", options: ["36", "72", "18", "24"], answer: "72", reward: 200 },
      { question: "Resuelve: (50 ÷ 5) + (12 ÷ 3)", options: ["10", "12", "14", "16"], answer: "14", reward: 200 },
      { question: "Si x + 7 = 20, ¿x = ?", options: ["10", "11", "12", "13"], answer: "13", reward: 200 },
      { question: "¿Cuánto es 15²?", options: ["200", "210", "225", "250"], answer: "225", reward: 200 },
      { question: "Resuelve: (100 ÷ 2) - (3 × 5)", options: ["30", "35", "40", "45"], answer: "35", reward: 200 },
      { question: "Si 5x = 100, ¿x = ?", options: ["15", "18", "20", "25"], answer: "20", reward: 200 },
      { question: "¿Cuánto es 2 × (3 + 7)?", options: ["18", "19", "20", "21"], answer: "20", reward: 200 },
    ],
  },

  // 👉 repetir mismo esquema con 10 preguntas para "lengua", "naturales" y "sociales"
};
