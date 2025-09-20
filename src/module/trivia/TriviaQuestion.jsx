export default function TriviaQuestion({ question, handleAnswer }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <ul>
        {question.options.map((opt, i) => (
          <li key={i}>
            <button onClick={() => handleAnswer(opt)}>{opt}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
