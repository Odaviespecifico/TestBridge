import { useState, useRef } from "react";
import "./index.css";
import { OneCollumnQuestion } from "./questions.jsx";
import {} from "./Alternatives.jsx";

export default function Linguaskill() {
  const answers = Object()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const formRef = useRef(null) 

  function renderContent() {
    switch (currentQuestion) {
      case 0:
        return <Introduction />;
      case 1:
        return <OneCollumnQuestion formRef={formRef}></OneCollumnQuestion>;
    }
  }

  const advanceQuestion = () => {
    console.log()
    if (formRef.current) {
      let myform = new FormData(formRef.current)
      let myformObj = Object.fromEntries(myform.entries())
      myform.entries().forEach((pair) => {
        localStorage.setItem(pair[0],pair[1])
      })
      answers = localStorage()
      console.log(answers)
    }
    setCurrentQuestion((prevState) => prevState + 1);
  };

  const returnQuestion = () => {
    setCurrentQuestion((prevState) => prevState - 1);
  };

  return (
    <div className="flex items-center flex-col h-full w-screen justify-stretch">
      <Header />
      <Instruction
        text={[
          "Click on each gap then type the word which you think fits best. Type only one word in each gap.",
        ]}
      />
      {renderContent()}
      <Footer
        nextQuestion={advanceQuestion}
        previousQuestion={returnQuestion}
        currentQuestion={currentQuestion}
      ></Footer>
    </div>
  );
}

export function Header() {
  return <div className="flex w-full h-10 bg-neutral-800"></div>;
}

export function Instruction({ text }) {
  if (text) {
    return text.map((line) => (
      <div
        className="flex items-center p-7 py-4 h-fit mb-6 text-lg w-full bg-neutral-700 font-medium text-white :: --mb-5"
        key={line}
      >
        {line}
      </div>
    ));
  } else {
    <div className="hidden"></div>;
  }
}

export function Introduction() {
  return (
    <div className="flex flex-col gap-10 py-7 w-fit xl:-ml-48 px-6 flex-1">
      <img
        src="./Logo-Linguaskill.jpg"
        alt="Linguaskill Logo"
        className="h-[65px] w-fit"
      />
      <div>
        <h1 className="text-4xl font-bold mb-7">Reading - Mock 1</h1>
        <p className="mb-3 text-xl">Linguaskill is an exam</p>
        <p className="mb-3 text-xl">
          This demonstration will show you what the look like.
        </p>
        <p className="mb-3 text-xl">
          To move through the, click the arrows in the bottom-right corner of
          the screen.
        </p>
        <p className="mb-3 text-xl">
          Click <strong>Start</strong> in the bottom corner of the screen to
          begin the demonstration.
        </p>
      </div>
    </div>
  );
}

export function Footer({ nextQuestion, previousQuestion, currentQuestion }) {
  const renderBottomButton = () => {
    if (currentQuestion >= 1) {
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
    <div className="flex w-full h-14 bg-gray-950 flex-row-reverse px-10 justify-self-end z-2">
      {renderBottomButton()}
    </div>
  );
}

// Small components
export function QuestionTitle() {}
