import { useState, useRef, Children } from "react";
import "./index.css";
import { OneCollumnQuestion, TwoCollumnQuestion, OneQuestionMultipleChoice, DragQuestion, RegisterAttempt} from "./questions.jsx";
import {} from "./Alternatives.jsx";
import {adicionarTentativa} from './supabase.js'

export default function Linguaskill() {
  let answers = Object()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const formRef = useRef(null) 

  function renderContent() {
    switch (currentQuestion) {
      case 0:
        return <Introduction title={'Linguaskill - Mock test 1'}>Linguaskill is an adaptive test <br/>This demonstration will show you what the Reading questions look like. <br/>To move through the questions, click the arrows in the bottom-right corner of the screen <br/>Click <strong>start</strong> in the bottom-right corner of the screen to begin the demonstration.</Introduction>;
      case -2:
        return <RegisterAttempt formRef={formRef}></RegisterAttempt>
      case 1:
        return <OneCollumnQuestion formRef={formRef}></OneCollumnQuestion>;
      case 3:
        return <TwoCollumnQuestion formRef={formRef}></TwoCollumnQuestion>;
      case 4:
        return <OneQuestionMultipleChoice formRef={formRef}></OneQuestionMultipleChoice>
      case 5: 
        return <DragQuestion formRef={formRef}></DragQuestion>
      case 6:
        return <Introduction title='Linguaskill - Listening section'>This is the Listening section </Introduction>;
      default:
        
        return <OneCollumnQuestion formRef={formRef}></OneCollumnQuestion>;
        // return <h1>Essa pagina {currentQuestion} não existe </h1>
      }
  }

  const advanceQuestion = async () => {
    // Verifica se o local Storage não tem o ID da tentativa
    if (currentQuestion == 1 && localStorage.getItem('id') == null) {
      let myform = new FormData(formRef.current)
      let myformObj = Object.fromEntries(myform.entries())
      console.log(myformObj)
      let id = await adicionarTentativa(myformObj.studentName,myformObj.teacherName)
      localStorage.setItem('id',id.id)
      alert('registrado com sucesso')
    }
    
    // Caso tenha o ID, pular o registro de tentativa
    else if (localStorage.getItem('id') != null && currentQuestion == 0) {
      setCurrentQuestion((prevState) => prevState + 1);
    }

    else if (formRef.current) {
      console.log('Salvando as respostas de...')
      console.log(formRef.current)
      let myform = new FormData(formRef.current)
      let myformObj = Object.fromEntries(myform.entries())
      myform.entries().forEach((pair) => {
        localStorage.setItem(pair[0],pair[1])
      })
      answers = localStorage
    }
    setCurrentQuestion((prevState) => prevState + 1);
  };

  const returnQuestion = () => {
    setCurrentQuestion((prevState) => prevState - 1);
    // Caso tenha o ID
    if (localStorage.getItem('id') != null && currentQuestion == 2) {
      setCurrentQuestion((prevState) => prevState - 1);
    }
  };

    return (
      <div className="flex items-center flex-col h-full w-screen justify-stretch">
        <Header />
        <Instruction
          text={[
            "Click on each gap then type the word which you think fits best.",
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
        className="flex items-center p-7 py-4 h-fit text-lg w-full bg-neutral-700 font-medium text-white"
        key={line}
      >
        {line}
      </div>
    ));
  } else {
    <div className="hidden"></div>;
  }
}

export function Introduction({title,children}) {
  return (
    <div className="flex flex-col gap-10 py-7 w-fit xl:-ml-48 px-6 flex-1">
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
    <div className="flex w-full min-h-14 bg-gray-950 flex-row-reverse px-10 justify-self-end z-2">
      {renderBottomButton()}
    </div>
  );
}

// Small components
export function QuestionTitle() {}
