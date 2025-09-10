import { useState, useRef, Children, use, useEffect } from "react";
import "./index.css";
import {
  OneCollumnQuestion,
  TwoCollumnQuestion,
  OneQuestionMultipleChoice,
  DragQuestion,
  RegisterAttempt,
  ListeningClosed,
  ListeningGap,
  ListeningTable,
  BoxText,
  OneCollumnParagraph,
  WritingTask,
  IndentedItem,
} from "./questions.jsx";
import {
  AudioAlternative,
  InlineOpen,
  DropAlternative,
  InlineClosed,
} from "./Alternatives.jsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Outlet } from "react-router";
import {
  Header,
  Instruction,
  Introduction,
  Footer,
  Loading,
} from "./utils.jsx";
import { useNavigate } from "react-router";

export default function Linguaskill2() {
  let answers = Object();
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const formRef = useRef(null);

  useEffect(() => {
    // check if there is an Id
  })
  const goToNextQuestion = async () => {
    historicoId.push(questionId);

    // Parse do formulário
    if (formRef.current) {
      let myform = new FormData(formRef.current);
      myform.entries().forEach((pair) => {
        localStorage.setItem(pair[0], pair[1]);
      });
      answers = localStorage;
      setCurrentQuestion((prevState) => prevState + 1);
    } else {
      setCurrentQuestion((prevState) => prevState + 1);
    }
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestion((prevState) => prevState - 1);
    // Atualiza o valor da questão com base
    setQuestionId(historicoId.at(-2));
    historicoId.pop();

  };

  const questions = [
    <Introduction title={"Linguaskill - Writing"}>
      Linguaskill is an adaptive test <br />
      This demonstration will show you what the Writing question looks like.{" "}
      <br />
      After you finish writing contact your teacher <br />
      Click <strong>start</strong> in the bottom-right corner of the screen to
      begin the demonstration.
    </Introduction>,
    <>
    <Instruction>You have 45 minutes for this task.</Instruction>
  <WritingTask propQuestionId={getNextId()} formRef={formRef}>
    Read the following statement: <br />
    <BoxText>
      <strong>
        The attention paid to celebrities these days has a negative effect on
        society.
      </strong>
    </BoxText>
    <br />
    Write an <strong>essay</strong> in which you: <br />
        <IndentedItem decorator={"disk"}>
        discuss and evaluate arguments both for and against the statement above.
        </IndentedItem>
        <IndentedItem decorator={"disk"}>
        indicate to what extent you agree or disagree with the statement.
        </IndentedItem>
        <IndentedItem decorator={"disk"}>
        indicate to what extent you agree or disagree with the statement.
        </IndentedItem>
    <br />
    Below are some different views you may wish to consider in your essay:{" "}
    <br />
        <IndentedItem>
        "Celebrity success inspires young people to aim high in their own lives."{" "}
        </IndentedItem>
        <IndentedItem>
        "Celebrity culture encourages the idea that success is usually instant."{" "}
        </IndentedItem>
        <IndentedItem>
        "Even when promoting good causes, celebrities are only promoting
        themselves."
        </IndentedItem>
    <br />
    You can also include any other ideas you think are relevant. <br />
    Write <strong>at least 250 words.</strong> <br />
    Use your own words as far as possible.
  </WritingTask>
</>,
  ];

  function renderQuestions() {
    if (currentQuestion < questions.length) {
      return questions[currentQuestion];
    } 
    
    else {
      return <h1>Essa página {currentQuestion} não existe</h1>;
    }
  }

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

// Util functions
let questionId = 1;
let historicoId = [];

export function getNextId() {
  return questionId++;
}

function setQuestionId(value) {
  questionId = value;
}
