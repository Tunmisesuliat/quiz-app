import React from "react";
import PropTypes from "prop-types";
import {AnswerObject} from '../App'
import {Wrapper, ButtonWrapper} from './QuestionCard.styles'

interface Props {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>)=> void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions:number
}

const Questioncard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions
}) => {
  return <Wrapper>
      <p className="number">
          Question: {questionNumber}/ {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{__html: question}} />
      <div>
    {answers.map((answer, index)=> <ButtonWrapper correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer} >
        <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html:answer}} />
        </button>
    </ButtonWrapper>)}
      </div>
  </Wrapper>;
};


Questioncard.propTypes = {};

export default Questioncard;
