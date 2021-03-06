import React, { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGoodReview = () => {
    setGood(good + 1);
  };
  const addNeutralReview = () => {
    setNeutral(neutral + 1);
  };
  const addBadReview = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <div style={{ display: "flex" }}>
        <Button action={addGoodReview} text="Good" />
        <Button action={addNeutralReview} text="Neutral" />
        <Button action={addBadReview} text="Bad" />
      </div>
      <h1>Statistics</h1>
      {good || neutral || bad ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

export default App;