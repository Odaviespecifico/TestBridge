import { useState, useRef, Children } from "react";
import "./index.css";
import { OneCollumnQuestion, TwoCollumnQuestion, OneQuestionMultipleChoice, DragQuestion, RegisterAttempt, ListeningClosed, ListeningGap, ListeningTable, BoxText, OneCollumnParagraph, WritingTask, IndentedItem} from "./questions.jsx";
import {AudioAlternative, InlineOpen,DropAlternative,} from "./Alternatives.jsx";
import {adicionarTentativa} from './supabase.js'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Linguaskill() {
  let answers = Object()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  
  const formRef = useRef(null) 

  function renderQuestions() {
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
          If you <InlineOpen></InlineOpen> ice, it melts <br/>
          If she <InlineOpen/> hard, she will pass the exam <br />
          If I <InlineOpen/> more confidente, I would speak in the meeting. <br />
          If they invite me, I <InlineOpen/> to the party <br />
          If we <InlineOpen/> earlier, we wouldn't have missed the train. <br />
          if I <InlineOpen/> the answer, I would have told you
          You will feel better if you <InlineOpen/> some rest.<br />
          If he <InlineOpen/> the meeting yesterday, he would know the plan now.  
        </OneCollumnQuestion>;
        </>
        )
      case 3:
        return (
          <>
          <Instruction>Click on each gap then type the word which you think fits best.</Instruction>
          <TwoCollumnQuestion formRef={formRef}
          title='Question Title'
          subtitle='Sub-title'
          questions={[
            {heading: 'My question', alternatives: ['A', 'B', 'C', 'D']},
            {heading: 'Another question', alternatives: ['E', 'F', 'G', 'H']}
          ]}
          >
            <BoxText title='title'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ad explicabo quidem quo similique rem nulla aut impedit accusantium. Accusantium iste aliquam illo culpa dolorum quia totam aperiam nihil accusamus.</BoxText>
            <BoxText title='title 2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid asperiores nobis dolorum fugit velit sed, accusantium iste nam iusto debitis voluptatibus! Aliquam voluptate amet fugiat quasi quia deleniti cupiditate cumque?</BoxText>
          </TwoCollumnQuestion>
          </>
        )
      case 4:
        return (
          <>
          <Instruction>Click on each gap then type the word which you think fits best.</Instruction>
          <OneQuestionMultipleChoice formRef={formRef} alternatives={['Test1','test2','test3','test4']}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo ratione quaerat quae dolores cupiditate aut sint corrupti, ullam facere aperiam impedit quisquam libero nulla nihil officiis saepe? Autem, veniam praesentium.
          </OneQuestionMultipleChoice>
          </>
        ) 
      case 5: 
        return <DragQuestion formRef={formRef}
        propAlternatives={['teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1', 'teste 2', 'teste 3','teste 4','teste 5']}
        title='Question Title'
        subtitle='Sub-title'/>
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
            You have 45 seconds to read the sentences. You will hear the recording twice. <br /> <br />
            Listen to a woman called Lucy Townsend talking about an extreme sport called BASE Jumping.
            </Instruction>
            <ListeningGap formRef={formRef} audioPath="/audios/audiotest.mp3" title='The sport of BASE jumping'>
              <p>test beforehand <InlineOpen removeSpace="false" /> testing</p>
              <p>test beforehand <InlineOpen removeSpace="false"/> testing</p>
              <p>test beforehand <InlineOpen removeSpace="false"/> testing</p>
            </ListeningGap>
          </>
        )
      case 9: 
        return (
          <>
          <Instruction>For these questions, complete the sentences with no more than three words in each gap. <br/> 
            You have 45 seconds to read the sentences. You will hear the recording twice. <br /> <br />
            Listen to a woman called Lucy Townsend talking about an extreme sport called BASE Jumping.
          </Instruction>
          <ListeningTable audioPath='/audios/audiotest.mp3'>
            Testing
          </ListeningTable>
          </>
        )
      case 10:
        return(
        <Introduction title='Linguaskill - Writing Section'>Linguaskill is an adaptive test. <br />
          There are two questions in this test. <br />
          You have 55 minutes. <br />
          Click <strong>Start</strong> in the bottom-right corner of the screen to continue. 
        </Introduction>
        )
      case 11:
        return (
          <>
          <Instruction>You have 45 minutes for this task.</Instruction>
          <WritingTask propQuestionId={getNextId()}>
            Read the following statement: <br />
            <BoxText>
            <strong>The attention paid to celebrities these days has a negative effect on society.</strong>
            </BoxText>
            <br />
            Write an <strong>essay</strong> in which you: <br />
              <IndentedItem decorator={'disk'}>discuss and evaluate arguments both for and against the statement above.</IndentedItem>
              <IndentedItem decorator={'disk'}>indicate to what extent you agree or disagree with the statement.</IndentedItem>
              <IndentedItem decorator={'disk'}>indicate to what extent you agree or disagree with the statement.</IndentedItem>
              <br />
            Below are some different views you may wish to consider in your essay: <br />
              <IndentedItem>"Celebrity success inspires young people to aim high in their own lives." </IndentedItem>
              <IndentedItem>"Celebrity culture encourages the idea that success is usually instant." </IndentedItem>
              <IndentedItem>"Even when promoting good causes, celebrities are only promoting themselves."</IndentedItem> 
              <br />
            You can also include any other ideas you think are relevant. <br />
            Write <strong>at least 250 words.</strong>  <br />
            Use your own words as far as possible.
          </WritingTask>
          </>
        )
      default:
        return <h1>Essa página {currentQuestion} não existe </h1>
      }
  }

  const goToNextQuestion = async () => {
    historicoId.push(questionId)
    // Verifica se o local Storage não tem o ID da tentativa e verifica o registro de tentativa
    if (currentQuestion >= 1 && currentQuestion < 2 && localStorage.getItem('id') == null) {
      if (formRef.current.reportValidity()) {
        console.log('Validando formulário')
        let myform = new FormData(formRef.current)
        let myformObj = Object.fromEntries(myform.entries())
        console.log(myformObj)
        setCurrentQuestion(1.5)
        console.log('Registrando tentativa')
        let id = await adicionarTentativa(myformObj.studentName,myformObj.teacherName,myformObj.sessionId)
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
      console.log(myformObj)
      myform.entries().forEach((pair) => {
        console.log(pair)
        localStorage.setItem(pair[0],pair[1])
      })
      answers = localStorage
      setCurrentQuestion((prevState) => prevState + 1);
    }
    else {
      setCurrentQuestion((prevState) => prevState + 1);
    }
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestion((prevState) => prevState - 1);
    // Atualiza o valor da questão com base
    setQuestionId(historicoId.at(-2))
    historicoId.pop()

    // Caso tenha o ID pular a de cadastro de tentativa
    if (localStorage.getItem('id') != null && currentQuestion == 2) {
      // Reinicia o contador
      setQuestionId(1)
      historicoId = []
      setCurrentQuestion((prevState) => prevState - 1);
    }
  };
    return (
      <div className="flex items-center flex-col h-full w-screen justify-stretch">
        <Header />
        {renderQuestions()}
        <Footer
          nextQuestion={goToNextQuestion}
          previousQuestion={goToPreviousQuestion}
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

// Util function

let questionId = 1
let historicoId = []

export function getNextId() {
  return questionId++
};

function setQuestionId(value) {
  questionId = value
}
