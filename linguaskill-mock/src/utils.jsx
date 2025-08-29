import { useState, useRef, Children } from "react";
import "./index.css";
import { OneCollumnQuestion, TwoCollumnQuestion, OneQuestionMultipleChoice, DragQuestion, RegisterAttempt, ListeningClosed, ListeningGap, ListeningTable, BoxText, OneCollumnParagraph, WritingTask, IndentedItem} from "./questions.jsx";
import {AudioAlternative, InlineOpen,DropAlternative,} from "./Alternatives.jsx";
import {adicionarTentativa} from './supabase.js'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function Header() {
  return <div className="flex w-full h-10 bg-neutral-800"></div>;
}

export function Instruction({ children }) {
  if (children) {
    return (
      <div className="flex items-center p-7 py-4 h-fit text-lg/5 w-full bg-neutral-700 font-normal text-white">
        {children}
      </div>
    )  
  }
  else {
    <div className="absolute hidden"></div>;
  }
}

export function Introduction({title,children}) {
  return (
    <div className="flex flex-col gap-10 py-7 max-w-3xl xl:-ml-48 px-6 flex-1">
      <img
        src="./Logo-Linguaskill.jpg"
        alt="Linguaskill Logo"
        className="h-[65px] w-fit"
      />
      <div>
        <h1 className="text-4xl font-bold mb-7">{title}</h1>
        <div className="mb-3 text-xl/loose"> 
        {children}
        </div>
      </div>
    </div>
  );
}

export function Footer({ nextQuestion, previousQuestion, currentQuestion }) {
  const renderBottomButton = () => {
    if (currentQuestion != 0) {
      return (
        <div className="flex gap-4 justify-center items-center">
          <button
            type="button"
            form="formQuestion"
            onClick={previousQuestion}
            className="text-gray-100 p-1 font-black text-3xl size-10 border-3 rounded-full"
          >
            <img src="/arrow.png" alt="" className="invert rotate-180 size-full hover:opacity-80"/>
          </button>
          <button
            type="button"
            form="formQuestion"
            onClick={nextQuestion}
            className="text-gray-100 p-1 font-medium text-2xl size-10 border-3 rounded-full"
          >
            <img src="/arrow.png" alt="" className="invert size-full hover:opacity-80"/>
          </button>
        </div>
      );
    }
    else {
      return (
        <button
          type="button"
          onClick={nextQuestion}
          className="text-gray-100 font-medium text-2xl hover:text-gray-300"
        >
          Start
        </button>
      );
    }
  };

  return (
    <div className="flex w-full min-h-14 bg-gray-950 flex-row-reverse px-10 justify-self-end mt-auto z-2">
      {renderBottomButton()}
    </div>
  );
}

// Small components

export function Loading({status}) {
  if (status == 'sucess') {
    return (
      <div className="flex justify-center items-center h-full">
        <DotLottieReact className="h-6/12 hue-rotate-250 brightness-160 saturate-200"
        src="./success.lottie"
        autoplay/>
      </div>
    )}
      
  else {
    return (
      <div className="flex h-full justify-center items-center">
        <img src="./loading.svg" alt="Loading icon" className="size-9/12" />
      </div>
    )
  }
}