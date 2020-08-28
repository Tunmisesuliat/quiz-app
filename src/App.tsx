import React, {useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import Questioncard from "./components/QuestionCard";
import useQuestion from "./hooks/useQuestion";
import {FetchQuizQuestions, Difficulty, QuestionState} from './API'
import {MyGlobalStyles, Wrapper} from './App.styles'

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question:string;
  answer:string;
  correct: boolean;
  correctAnswer:string
}


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [showFinish, setShowFinish] = useState(true)
  const [play, setPlay] = useState(false);

console.log("questions", questions)
  
  const startTrivia = async () => {
   
    setIsLoading(true);
    setGameOver(false);
    let questions = await FetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(questions)
    setScore(0)
    setNumber(0)
    setIsLoading(false)
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value
      // check answer against the correct value
      const correct = questions[number].correct_answer === answer;
      //add score if answer is correct
      if(correct) {
        setScore((prev) => prev + 1)
      }
        //save answer in user answer array
        const answerObject = {
          question:  questions[number].question,
          answer,
          correct,
          correctAnswer:questions[number].correct_answer
        }
        setUserAnswers(prev => [...prev, answerObject])
    }
  };
  const nextQuestion = () => {
    //move to next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
    setNumber(nextQuestion)}
  };
  const handleFinish = ()=> {
    setGameOver(true)
    setShowFinish(false)    
    
  }
  const handlePlay = () =>{
    setUserAnswers([])
    setGameOver(true)
    setScore(0)
    setPlay(false)
    setShowFinish(true)
    setNumber(0)
  }
  return (
    <>
    <MyGlobalStyles />
    <Wrapper>
      <h1>Talent Trivia</h1>
      {gameOver && userAnswers.length === 0  ?
      (<button className="start" onClick={startTrivia}>
        Start
      </button>) : null
      }
      {!gameOver? <p className="score">Score: {score * 10}%</p>: null}
      {isLoading?<p>Loading Questions...</p> : null}
      {(!isLoading && !gameOver && number !== TOTAL_QUESTIONS) && <Questioncard
        questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers ={[...questions[number].incorrect_answers, questions[number].correct_answer]} 
        userAnswer = {userAnswers? userAnswers[number]: undefined}
        callback={checkAnswer}
      />}
      {
        (!play && !isLoading  && gameOver && number+1 === TOTAL_QUESTIONS) && <>
        <h2> {score > 5 ? "You are a genius" : " I think you were not all that bad"}. your score is {score*10}%</h2>
        <button className="next" onClick={handlePlay}> Play again</button>
        </>
      }
     { (!gameOver && userAnswers.length === number + 1 && userAnswers.length !== TOTAL_QUESTIONS)? <button className="next" onClick={nextQuestion}>
        Next
      </button>: null}
      {(userAnswers.length === TOTAL_QUESTIONS && showFinish)?<button className="next" onClick={handleFinish}> Finish</button>: null }
    </Wrapper>
    </>
  );
}

export default App;
