import React from 'react';
import { shuffleArray } from './utils';

export enum Difficulty{
    EASY= "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
export type Question = {
category: string;
correct_answer: string;
difficulty: string;
incorrect_answers: string[];
question: string;
type: string
}

export type QuestionState = Question & {answers: string[]}

// const FetchQuizQuestions = (number, difficulty) => {
//     return new Promise((resolve, reject) =>{
//         a = fetch('')
//         const err=false
//         if (!err )resolve(a)
//         reject('Error')
//     })
// }

// FetchQuizQuestions(n, r).then().catch()

export const FetchQuizQuestions = async(amount: number, difficulty: Difficulty) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple` 
    const data = await(await fetch(endPoint)).json();
    console.log(data)
    return data.results.map((question:Question, index:number)=>({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}