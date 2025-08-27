import { useState, useRef, Children } from "react";
import "./index.css";
import { OneCollumnQuestion, TwoCollumnQuestion, OneQuestionMultipleChoice, DragQuestion, RegisterAttempt, ListeningClosed, ListeningGap} from "./questions.jsx";
import {AudioAlternative, InlineOpen} from "./Alternatives.jsx";
import {adicionarTentativa} from './supabase.js'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Linguaskill() {
  let answers = Object()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const formRef = useRef(null) 

  function renderContent() {
    switch (currentQuestion) {
      case 0:
        console.log('case 0')
        return <Introduction title={'Linguaskill - Reading'}>Linguaskill is an adaptive test <br/>This demonstration will show you what the Reading questions look like. <br/>To move through the questions, click the arrows in the bottom-right corner of the screen <br/>Click <strong>start</strong> in the bottom-right corner of the screen to begin the demonstration.</Introduction>;
      case 1:
        console.log('case 1')
        return <RegisterAttempt formRef={formRef}></RegisterAttempt>
      case 1.5:
        console.log('case 1.5')
        return (<Loading status='loading'></Loading>)
      case 1.75:
        console.log('case 1.75')
        return (<Loading status='sucess'></Loading>)
      case 2:
        return (
        <>
        <Instruction>Click on each gap then type the word which you think fits best.</Instruction>
        <OneCollumnQuestion formRef={formRef} title={'Open gap fill'}>
          
          </OneCollumnQuestion>;
        </>
        )
      case 3:
        return <TwoCollumnQuestion formRef={formRef}></TwoCollumnQuestion>;
      case 4:
        return <OneQuestionMultipleChoice formRef={formRef}></OneQuestionMultipleChoice>
      case 5: 
        return <DragQuestion formRef={formRef}></DragQuestion>
      case 6:
        return (
        <>
        <Introduction title='Linguaskill - Listening section'>Linguaskill is an adaptive test. <br />
          This demonstration will show you what the Listening questions look like. <br />
          To move through the questions, click the arrows in the bottom-right corner of the screen. <br />
          You will have time to read the questions. The audio will begin when the reading time is finished. You will hear the audio twice. <br />
          Click <strong>Start</strong> in the  bottom-right corner of the screen to begin the demonstration. 
        </Introduction>;
        </>)
      case 7:
        return(
        <>
        <Instruction>For this question, choose the correct answer. <br /> You have 10 seconds to read the question. You will hear the recording twice.</Instruction>
        <ListeningClosed formRef={formRef} audioPath={'/audios/audiotest.mp3'} title={'The sport of BASE jumping'}>
            <AudioAlternative heading={'Question, so nice'} alternatives={['A','B','C','D']}></AudioAlternative>
            <AudioAlternative heading={'My question'} alternatives={['A','B','C','D']}></AudioAlternative>
            <AudioAlternative heading={'My question'} alternatives={['A','B','C','D']}></AudioAlternative>
          </ListeningClosed>
        </>
        )
      case 8:
        return (
          <>
            <Instruction>For these questions, complete the sentences with no more than three words in each gap. <br/> 
            You have 45 seconds to read the sentences. You will hear the recording twice. <br />
            Listen to a woman called Lucy Townsend talking about an extreme sport called BASE Jumping.
            </Instruction>
            <ListeningGap formRef={formRef} audioPath="/audios/audiotest.mp3" title='The sport of BASE jumping'>
              <p>test beforehand <InlineOpen /> testing</p>
              <p>test beforehand <InlineOpen /> testing</p>
              <p>test beforehand <InlineOpen /> testing</p>
              <p>test beforehand <InlineOpen /> testing</p>
              <p>test beforehand <InlineOpen /> testing</p>
              <p>test beforehand <InlineOpen /> testing</p>
              <p>test beforehand <InlineOpen /> testing</p>
            </ListeningGap>
          </>
        )
      default:
        return <h1>Essa página {currentQuestion} não existe </h1>
      }
  }

  const advanceQuestion = async () => {
    console.log(currentQuestion)
    // Verifica se o local Storage não tem o ID da tentativa e verifica o registro de tentativa
    if (currentQuestion >= 1 && currentQuestion < 2 && localStorage.getItem('id') == null) {
      if (formRef.current.reportValidity()) {
        console.log('Validando formulário')
        let myform = new FormData(formRef.current)
        let myformObj = Object.fromEntries(myform.entries())
        console.log(myformObj)
        setCurrentQuestion(1.5)
        console.log('Registrando tentativa')
        let id = await adicionarTentativa(myformObj.studentName,myformObj.teacherName)
        if (id.error != null) {
          console.log('erro')
        }
        else {
          setTimeout(() => {
            setCurrentQuestion(1.75)
          }, 500);
          localStorage.setItem('id',id.data.id)
          setTimeout(() => {
            setCurrentQuestion(2)
          }, 2500);
        }
      }

    }
    
    // Caso tenha o ID, pular o registro de tentativa
    else if (localStorage.getItem('id') != null && currentQuestion == 0) {
      setCurrentQuestion((prevState) => prevState + 2);
    }

    // Parse do formulário
    else if (formRef.current) {
      console.log('Salvando as respostas de...')
      console.log(formRef.current)
      let myform = new FormData(formRef.current)
      let myformObj = Object.fromEntries(myform.entries())
      myform.entries().forEach((pair) => {
        localStorage.setItem(pair[0],pair[1])
      })
      answers = localStorage
      setCurrentQuestion((prevState) => prevState + 1);
    }
    else {
      setCurrentQuestion((prevState) => prevState + 1);
    }
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
    if (currentQuestion != 0 && currentQuestion != 6) {
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
export function QuestionTitle() {}


export function Loading({status}) {
  console.log(status)
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