import React, { useState, useEffect } from 'react';

const questions = [
  {
    text: 'Q1. How satisfied are you with our products?',
    type: 'rating',
    range: [1, 5]
  },
  {
    text: 'Q2. How fair are the prices compared to similar retailers?',
    type: 'rating',
    range: [1, 5]
  },
  {
    text: 'Q3. How satisfied are you with the value for money of your purchase?',
    type: 'rating',
    range: [1, 5]
  },
  {
    text: 'Q4. On a scale of 1-10, how likely are you to recommend us to your friends and family?',
    type: 'rating',
    range: [1, 10]
  },
  {
    text: 'Q5. What could we do to improve our service?',
    type: 'text'
  }
];

const SurveyApp = () => {
  const nextBtn = {
    padding: '10px',
    background: '#ff00ff',
    borderRadius: '10px',
    margin: '10px'
  };

  const pervButton = {
    padding: '10px',
    background: '#0000ff',
    borderRadius: '10px',
    margin: '10px'
  };

  const submitBtn = {
    background: 'black',
    color: 'antiquewhite',
    fontSize: '16px',
    borderRadius: '10px',
    padding: '8px'
  };

  const textBox = {
    background: 'black',
    color: 'antiquewhite',
    fontSize: '16px',
    borderRadius: '10px'
  };

  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('surveyAnswers'));
    if (storedAnswers) {
      setAnswers(storedAnswers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('surveyAnswers', JSON.stringify(answers));
  }, [answers]);

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleAnswer = (value) => {
    const updatedAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log('Submitted answers:', answers);
    setAnswers({});
    setCurrentQuestion(0);
    setSubmitted(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setSubmitted(false);
  };

  const currentQuestionObj = questions[currentQuestion];
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  let inputElement = null;
  if (currentQuestionObj.type === 'rating') {
    const options = [];
    for (let i = currentQuestionObj.range[0]; i <= currentQuestionObj.range[1]; i++) {
      options.push(
        <label key={i}>
          <input
            type="radio"
            value={i}
            checked={answers[currentQuestion] === i}
            onChange={(e) => handleAnswer(Number(e.target.value))}
            style={{ display: 'none' }}
          />
          <span
            className={answers[currentQuestion] === i ? 'circle checked' : 'circle'}
            onClick={() => handleAnswer(i)}
          >
            {i}
          </span>
        </label>
      );
    }
    inputElement = <div className="rating-options">{options}</div>;
  } else if (currentQuestionObj.type === 'text') {
    inputElement = (
      <textarea style={textBox} value={answers[currentQuestion] || ''} onChange={(e) => handleAnswer(e.target.value)} />
    );
  }

  if (submitted) {
    return (
      <div
        style={{
          background: '#a4c2f4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h2>Thank you for completing the survey!</h2>
        <button style={submitBtn} onClick={handleRestart}>
          Restart
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: '#a4c2f4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h2>{currentQuestionObj.text}</h2>
      {inputElement}
      <div>
        {!isFirstQuestion && (
          <button className="nextBtn" style={pervButton} onClick={handlePrevious}>
            Prev
          </button>
        )}
        {!isLastQuestion ? (
          <button className="pervButton" style={nextBtn} onClick={handleNext}>
            Next
          </button>
        ) : (
          <button style={submitBtn} onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
      <style>
        {`
        .circle {
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #000;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          margin: 4px;
        }

        .circle.checked {
          background-color: red;
          color: #fff;
        }

        .rating-options {
          margin-top: 10px;
        }
        `}
      </style>
    </div>
  );
};

export default SurveyApp;
