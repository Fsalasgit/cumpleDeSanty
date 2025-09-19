import React from "react";

export default function StoryModal({ show, text, choices, onSelect }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <p className="text-lg mb-4">{text}</p>
        <div className="flex flex-col gap-2">
          {choices.map((choice, idx) => (
            <button
              key={idx}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => onSelect(choice)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
