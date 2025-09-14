import { useState, useRef, Children, use, useEffect, useLayoutEffect } from "react";
import "./index.css";
import {
  Header,
  Footer,
} from "./utils.jsx";
import { useNavigate } from "react-router";
import { ConcludedTestAlert, FinishTestAlert } from "./modals.jsx";

export default function Linguaskill({questions}) {
  let answers = Object();
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const concludedDialogRef = useRef(null)
  const finalDialogRef = useRef(null)
  const formRef = useRef(null)
  useEffect(() => {
    // check if there is an Id
    if (!localStorage.getItem('id')) {
      navigate('/')
    }
    if(localStorage.getItem('concluido') == 'true') {
      concludedDialogRef.current.showModal()
    }
  },[])

  const goToNextQuestion = async () => {
    historicoId.push(questionId);

    // Parse do formulário
    if (formRef.current) {
      let myform = new FormData(formRef.current);
      myform.entries().forEach((pair) => {
        localStorage.setItem(pair[0], pair[1]);
      });
      answers = localStorage;
    }
    
    if (currentQuestion == questions.length-1) {
      finalDialogRef.current.showModal()
    }
    else {
      setCurrentQuestion((prevState) => prevState + 1);
    }
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestion((prevState) => prevState - 1);
    // Atualiza o valor da questão com base
    setQuestionId(historicoId.at(-2));
    historicoId.pop();

  };

  function handlefinishTestModal(option) {
    if (option == 'yes') {
      navigate("/test/submit")
    }
    if (option == 'no') {
      goToPreviousQuestion()
      finalDialogRef.current.close()
    }
  }
  function handleConcludedModal(choice) {
    if (choice == 'results') {
      navigate('/test/result')
    }
    if (choice == 'New Test') {
      localStorage.clear()
      navigate('/')
    }
    concludedDialogRef.current.close()
  }

  function renderQuestions() {
    if (currentQuestion < questions.length) {
      return (questions[currentQuestion](formRef));
    }
    
    else if (currentQuestion == questions.length){
     finalDialogRef.current.showModal()
    }
    else {
      return <h1>Essa página {currentQuestion} não existe</h1>;
    }
  }

  
  return (
    <div className="flex items-center flex-col h-full w-screen justify-stretch">
      <Header />
      <ConcludedTestAlert ref={concludedDialogRef} handleConcludedModal={handleConcludedModal}/>
      <FinishTestAlert ref={finalDialogRef} handleFinishTest={handlefinishTestModal}></FinishTestAlert>
      {renderQuestions()}
      <Footer
        nextQuestion={goToNextQuestion}
        previousQuestion={goToPreviousQuestion}
        currentQuestion={currentQuestion}
        questions={questions}
      ></Footer>
    </div>
  );
}

// Util functions
let questionId = 1;
let historicoId = [];

export function getNextId() {
  return questionId++;
}

function setQuestionId(value) {
  questionId = value;
}
