import { useState, useRef, Children } from "react";
import "./index.css";
import { OneCollumnQuestion, TwoCollumnQuestion, OneQuestionMultipleChoice, DragQuestion,RegisterAttempt,ListeningClosed,ListeningGap,ListeningTable,BoxText,OneCollumnParagraph,WritingTask,IndentedItem,} from "./questions.jsx";
import { AudioAlternative,InlineOpen,  DropAlternative,  InlineClosed,} from "./Alternatives.jsx";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Outlet } from "react-router";
import {  Header,  Instruction,  Introduction,  Footer,  Loading,} from "./utils.jsx";

export default function Linguaskill() {
  let answers = Object();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const formRef = useRef(null);
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
    // Desativa os botões durante carregamento
    if (currentQuestion < 2 && currentQuestion > 1) {
      return "";
    }
    setCurrentQuestion((prevState) => prevState - 1);
    // Atualiza o valor da questão com base
    setQuestionId(historicoId.at(-2));
    historicoId.pop();

    // Caso tenha o ID pular a de cadastro de tentativa
    if (localStorage.getItem("id") != null && currentQuestion == 2) {
      // Reinicia o contador
      setQuestionId(1);
      historicoId = [];
      setCurrentQuestion((prevState) => prevState - 1);
    }
  };

  const questions = [
    <Introduction title={"Linguaskill - Reading"}>
      Linguaskill is an adaptive test <br />
      This demonstration will show you what the Reading questions look like.{" "}
      <br />
      To move through the questions, click the arrows in the bottom-right
      corner of the screen <br />
      Click <strong>start</strong> in the bottom-right corner of the screen
      to begin the demonstration.
    </Introduction>,
    <>
      <Instruction>
              Click on each gap then choose the correct answer.
      </Instruction>
      <TwoCollumnQuestion
              formRef={formRef}
              title="Blue spaces"
              subtitle="Why time spent near water is the secret of happiness"
              questions={[
                {
                  heading:
                    "What do we learn about Kelly in the first paragraph",
                  alternatives: [
                    "She wanted to take up sailing",
                    "She wanted to get a better job",
                    "She decided to leave her country",
                    "She felt she had to live by the sea.",
                  ],
                },
                {
                  heading:
                    "What did Kelly realise by the end of her stay on the coast of Ireland?",
                  alternatives: [
                    "The academic research she had read was correct.",
                    "She had been wrong to doubt the benefits of rural life.",
                    "Living there had enabled her to make a full recovery.",
                    "She could never be happy living so far from other people",
                  ],
                },
                {
                  heading:
                    "What is suggested about spending time in countryside areas?",
                  alternatives: [
                    "It is less beneficial than being close to water.",
                    "There are no health benefits unless there is water nearby.",
                    "There is no evidence that it improves people's health.",
                    "It is always healthier than being in urban green zones.",
                  ],
                },
                {
                  heading: "What does 'one of the best ever' refer to?",
                  alternatives: [
                    "a health benefit of blue space",
                    "a particular academic study",
                    "a feeling of happiness",
                    "a natural environment",
                  ],
                },
                {
                  heading:
                    "The writer suggests that the easiest way to feel better is by",
                  alternatives: [
                    "taking an interest in art.",
                    "regularly going to the coast.",
                    "using mobile phones far less.",
                    "living quite close to the sea.",
                  ],
                },
                {
                  heading: "What does Kelly suggest in the last paragraph?",
                  alternatives: [
                    "Everybody relaxes when they are by the sea.",
                    "Travelling frequently to the seaside can be stressful.",
                    "Spending time next toa river is as good as being nearthe sea.",
                    "The only way to feel any better is to live on the coast.",
                  ],
                },
              ]}
            >
              <p>
                After the sudden loss of a close relative, Catherine Kelly heard
                the call of the sea. She was in her 20s and had been working as
                a geographer in London away from her native Ireland, She spent a
                year in Dublin with her family, then accepted an academic
                position on the Irish west coast, near Westport. 'l thought: "l
                need to go and get my head cleared in this place, to be blown
                away by the wind and natura"'
              </p>
              <p>
                Kelly bought a little house in a remote area and surfed, swam
                and walked a three-mile-long beach twice a day, 'l guess the
                five or six years that I spent there on the wild Atlantic coast
                'ust healed me, really.' She didn't understand why that might be
                until some years later, when she started to see scientific
                literature that proved what she had long felt to be true: that
                she felt much better by the sea. For the past eight years, Kelly
                has been based in the British seaside resort of Brighton,
                researching 'outdoor well-being' and the therapeutic effects of
                nature - particularly of water.
              </p>
              <p>
                In recent years, stressed-out people from urban areas have been
                seeking peace and quiet in green spaces, for which the proven
                positive impacts on physical and mental health are often cited
                in arguments for more inner-city parks and accessible woodlands.
                The benefits of 'blue space' the sea and coastline, but also
                rivers, lakes, canals, waterfalls, even fountains - are less
                well publicised, yet for at least a decade the science has
                confirmed that being by water is good for body and mind.
              </p>
              <p>
                Spending time near water - especially the sea - is associated
                with many positive measures of physical and mental well-being,
                from higher levels of vitamin D to better social relations,
                'Many of the processes are exactly the same as with green space
                - with some added benefits,' says Dr Mathew White, a senior
                lecturer at the University of Exeter and an environmental
                psychologist with BlueHealth, a programme researching the health
                and well-being benefits of blue space across 18 (mostly
                European) countries.
              </p>
              <p>
                An extensive study on happiness in natural environments - to
                White's mind, <strong>'one of the best ever'</strong> - asked 20,000 smartphone
                users to record their sense of well-being and their immediate
                environment at random intervals. Marine and coastal regions were
                found by some distance to be the happiest locations, with
                responses approximately six points higher than in a continuous
                urban environment. The researchers said it was similar to 'the
                difference between attending an art exhibition and doing
                housework'.
              </p>
              <p>
                Although living within 1 km of the coast- and to a lesser
                extent, within 5 km - has been associated with better general
                and mental health, it seems that making frequent visits is key.
                'We find people Who visit the coast, for example, at least twice
                weekly tend to experience better general and mental health,'
                says Dr Lewis Elliott, also of the University of Exeter and
                BlueHealth. 'Some of our research suggests around two hours a
                week is probably beneficial, across many parts of society.' Even
                sea views have been associated with better mental health.
              </p>
              <p>
                'People work with what they have,' says Kelly. When she lived in
                London, she would head for the River Thames when she had a spare
                ten minutes 'and think things over', Then, four times a year,
                she would go to Brighton 'and the benefits would keep me going
                for the nextfew months -so I didn't get into a place of being
                overwhelmed or stressed'. She adds: 'To go to the coast means
                taking it easy. lt could be lying on a beach or somebody handing
                you a cool drink. For somebody else, it could be a wild, empty
                shoreline. But there is this really human sense of: "0h, look,
                there's the sea" —and the shoulders drop.'
              </p>
              {/* <BoxText title='title'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ad explicabo quidem quo similique rem nulla aut impedit accusantium. Accusantium iste aliquam illo culpa dolorum quia totam aperiam nihil accusamus.</BoxText>
            <BoxText title='title 2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid asperiores nobis dolorum fugit velit sed, accusantium iste nam iusto debitis voluptatibus! Aliquam voluptate amet fugiat quasi quia deleniti cupiditate cumque?</BoxText> */}
      </TwoCollumnQuestion>
    </>,
    <>
      <Instruction>
              Click on each gap then type the word which you think fits best.
              Type only one word in each gap.
      </Instruction>
      <OneCollumnQuestion formRef={formRef} title={"Open gap fill"}>
              If you <InlineOpen></InlineOpen> ice, it melts <br />
              If she <InlineOpen /> hard, she will pass the exam <br />
              If I <InlineOpen /> more confidente, I would speak in the meeting.{" "}
              <br />
              If they invite me, I <InlineOpen /> to the party <br />
              If we <InlineOpen /> earlier, we wouldn't have missed the train.{" "}
              <br />
              if I <InlineOpen /> the answer, I would have told you You will
              feel better if you <InlineOpen /> some rest.
              <br />
              If he{" "}
              <InlineClosed
                alternatives={[
                  "alternativa 1",
                  "alternativa 2",
                  "alternativa 3",
                  "alternativa 4",
                ]}
              />{" "}
              the meeting yesterday, he would know the plan now.
      </OneCollumnQuestion>
    </>,
    <>
      <Instruction>
        Click on each gap then type the word which you think fits best.
      </Instruction>
      <OneQuestionMultipleChoice
        formRef={formRef}
        alternatives={["Test1", "test2", "test3", "test4"]}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
        ratione quaerat quae dolores cupiditate aut sint corrupti, ullam
        facere aperiam impedit quisquam libero nulla nihil officiis saepe?
        Autem, veniam praesentium.
      </OneQuestionMultipleChoice>
    </>,
    <>
      <Instruction>
            The following text has some parts removed from it. <br />
            Click and drag the options to the apropriate place.
      </Instruction>
      <DragQuestion
        formRef={formRef}
            propAlternatives={[
              "teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1teste 1",
              "teste 2",
              "teste 3",
              "teste 4",
              "teste 5",
            ]}
            paragraphs={[
              [
                "Lorem ipsun et dolor Lorem ipsun et dolorLorem ipsun et dolorLorem ipsun et dolorLorem ipsun et dolorLorem ipsun et dolor ",
                "drop",
                "testing Lorem ipsun et dolorLorem ipsun et dolor",
                "drop",
                "mytest2 Lorem ipsun et dolorLorem ipsun et dolor",
                "drop",
              ],
              ["", "drop"],
              ["testing", "drop", "my big text tenisghseugbseuog"],
            ]}
            title="Question Title"
            subtitle="Sub-title">
      </DragQuestion>
    </>,
    <Introduction title="Linguaskill - Listening section">
              Linguaskill is an adaptive test. <br />
              This demonstration will show you what the Listening questions look
              like. <br />
              To move through the questions, click the arrows in the
              bottom-right corner of the screen. <br />
              You will have time to read the questions. The audio will begin
              when the reading time is finished. You will hear the audio twice.{" "}
              <br />
              Click <strong>Start</strong> in the bottom-right corner of the
              screen to begin the demonstration.
    </Introduction>,
    <>
      <Instruction>
        For this question, choose the correct answer. <br /> You have 10
        seconds to read the question. You will hear the recording twice.
      </Instruction>
      <ListeningClosed
        formRef={formRef}
        audioPath={"/audios/audiotest.mp3"}
        title={"The sport of BASE jumping"}
      >
        <AudioAlternative
          heading={"Question, so nice"}
          alternatives={["A", "B", "C", "D"]}
        ></AudioAlternative>
        <AudioAlternative
          heading={"My question"}
          alternatives={["A", "B", "C", "D"]}
        ></AudioAlternative>
        <AudioAlternative
          heading={"My question"}
          alternatives={["A", "B", "C", "D"]}
        ></AudioAlternative>
      </ListeningClosed>
    </>,
    <>
      <Instruction>
        For these questions, complete the sentences with no more than
        three words in each gap. <br />
        You have 45 seconds to read the sentences. You will hear the
        recording twice. <br /> <br />
        Listen to a woman called Lucy Townsend talking about an extreme
        sport called BASE Jumping.
      </Instruction>
      <ListeningGap
        formRef={formRef}
        audioPath="/audios/audiotest.mp3"
        title="The sport of BASE jumping"
      >
        <p>
          test beforehand <InlineOpen removeSpace="false" /> testing
        </p>
        <p>
          test beforehand <InlineOpen removeSpace="false" /> testing
        </p>
        <p>
          test beforehand <InlineOpen removeSpace="false" /> testing
        </p>
      </ListeningGap>
    </>,
    <>
      <Instruction>
        For these questions, complete the sentences with no more than
        three words in each gap. <br />
        You have 45 seconds to read the sentences. You will hear the
        recording twice. <br /> <br />
        Listen to a woman called Lucy Townsend talking about an extreme
        sport called BASE Jumping.
      </Instruction>
      <form kind='listening Tables'
        className="w-10/12 h-full overflow-y-auto pt-0 pb-8"
        ref={formRef}
      >
        <ListeningTable
          audioPath="/audios/audiotest.mp3"
          question="What does each person say was the main benefit to them of studying literature?"
          rows={[
            "I learnt to detect what was hidden beneath the surface.",
            "It impressed a number of different employers.",
            "It helped me to bring ideas together and express them clearly.",
            "I gained the confidence to challenge established writers’ work.",
            "It made me reconsider what to do with my life.",
            "I became completely objective in my approach.",
            "It revealed some solutions to common problems.",
            "It led me to a greater understanding of other people.",
          ]}
          columns={[
            "Speaker 1",
            "Speaker 2",
            "Speaker 3",
            "Speaker 4",
            "Speaker 5",
          ]}
        ></ListeningTable>
        <ListeningTable
          audioPath="/audios/audiotest.mp3"
          question="What does each person say was the main benefit to them of studying literature?"
          rows={[
            "parental disapproval",
            "a persistent injury",
            "the negative attitude of friends",
            "inconveniently located sports facilities",
            "maintaining a strict diet",
          ]}
          columns={[
            "Speaker 1",
            "Speaker 2",
            "Speaker 3",
            "Speaker 4",
            "Speaker 5",
          ]}
        ></ListeningTable>
      </form>
    </>,
    <Introduction title="Linguaskill - Writing Section">
      Linguaskill is an adaptive test. <br />
      There are two questions in this test. <br />
      You have 55 minutes. <br />
      Click <strong>Start</strong> in the bottom-right corner of the
      screen to continue.
    </Introduction>,
    <>
      <Instruction>You have 45 minutes for this task.</Instruction>
      <WritingTask formRef={formRef}>
        Read the following statement: <br />
        <BoxText>
          <strong>
            The attention paid to celebrities these days has a negative
            effect on society.
          </strong>
        </BoxText>
        <br />
        Write an <strong>essay</strong> in which you: <br />
        <IndentedItem decorator={"disk"}>
          discuss and evaluate arguments both for and against the
          statement above. </IndentedItem>
        <IndentedItem decorator={"disk"}>
          indicate to what extent you agree or disagree with the
          statement. </IndentedItem>
        <IndentedItem decorator={"disk"}>
          indicate to what extent you agree or disagree with the
          statement. </IndentedItem>
        
        <br />
        Below are some different views you may wish to consider in your
        essay: <br />

        <IndentedItem>
          "Celebrity success inspires young people to aim high in their
          own lives."{" "} </IndentedItem>
        <IndentedItem>
          "Celebrity culture encourages the idea that success is usually
          instant."{" "} </IndentedItem>
        <IndentedItem>
          "Even when promoting good causes, celebrities are only promoting
          themselves." </IndentedItem>
        <br />
        You can also include any other ideas you think are relevant.{" "}
        <br />
        Write <strong>at least 250 words.</strong> <br />
        Use your own words as far as possible.
      </WritingTask>
    </>

  ]
  
  function renderQuestions() {
    if (currentQuestion < questions.length) {
      return(questions[currentQuestion])
    }
    else {
      return (
        <h1>Essa página {currentQuestion} não existe</h1>
      );
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
      >
      </Footer>
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
