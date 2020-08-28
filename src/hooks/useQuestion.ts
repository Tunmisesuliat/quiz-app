import React, { useState } from "react";

interface Values {
    isLoading:any
    setIsLoading:any;
    questions: any;
    setQuestions:any;
    number: any;
    setNumber: any;
    userAnswers: any;
    setUserAnswers: any;
    score: any;
    setScore: any;
    gameOver: any;
    setGameOver: any
}

const useQuestion = (): Values => {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  return {
    isLoading,
    setIsLoading,
    questions,
    setQuestions,
    number,
    setNumber,
    userAnswers,
    setUserAnswers,
    score,
    setScore,
    gameOver,
    setGameOver
  };
};
export default useQuestion;
