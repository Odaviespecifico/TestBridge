import { useState, useRef, Children } from "react";
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

export default function Linguaskill() {
  let answers = Object();
  const navigate = useNavigate()
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
      To move through the questions, click the arrows in the bottom-right corner
      of the screen <br />
      Click <strong>start</strong> in the bottom-right corner of the screen to
      begin the demonstration.
    </Introduction>,

    <>
      <Instruction>Choose the correct answer.</Instruction>
      <OneQuestionMultipleChoice
        formRef={formRef}
        alternatives={[
          "Students who have morning lectures will need to go to a different venue tomorrow.",
          "Students in the afternoon need to read the notice board until repairs are completed.",
          "Students will hear which room their lecture will be in by lunchtime tomorrow.",
        ]}
      >
        <strong>To all physics students</strong> <br />
        The lecture tomorrow is in Room 23B due to maintenance works in room
        88C. Works should be completed by lunchtime, but you should check the
        notice board just in case other arrangements are required for afternoon
        classes.
      </OneQuestionMultipleChoice>
    </>,

    <>
      <Instruction>
        Read the text given and check the correct answer to each question on the
        right.
      </Instruction>
      <OneCollumnQuestion formRef={formRef} title={""}>
        In all occupations there are
        <InlineClosed
          alternatives={["elements", "components", "factors", "volumes"]}
        />
        of creativity, albeit there are more in some compared to others.
      </OneCollumnQuestion>
    </>,

    <>
      <Instruction>Choose the correct answer.</Instruction>
      <OneQuestionMultipleChoice
        formRef={formRef}
        alternatives={[
          "The path is presently too dangerous to be walked on.",
          "Walkers can only take this path with a guide.",
          "If walkers choose this path, they need to be extra careful.",
        ]}
      >
        <strong>Alert</strong> <br />
        This pathway can be very slippery, especially when the weather is bad.
        Alternative routes are posted online, or speak to one of our guides for
        other easy-access options.
      </OneQuestionMultipleChoice>
    </>,

    <>
      <Instruction>
        Read the text given and check the correct answer to each question on the
        right.
      </Instruction>
      <OneCollumnQuestion formRef={formRef} title={""}>
        Most people of the public did not agree with the court's lenient
        sentence as they believed that all it did was to
        <InlineClosed
          alternatives={["trivialise", "exonerate", "lighten", "vindicate"]}
        />
        the seriousness of the crime that has been committed.
      </OneCollumnQuestion>
    </>,

    <>
      <Instruction>
        Read the text given and check the correct answer to each question on the
        right.
      </Instruction>
      <TwoCollumnQuestion
        formRef={formRef}
        title="A Book Review"
        subtitle=""
        questions={[
          {
            heading:
              "In the first paragraph, what effect of digitalisation is discussed?",
            alternatives: [
              "people are easily led into silly weight reduction programmes.",
              "people are sometimes suspicious of information that is useful.",
              "people are attracted to foods that are unhealthy.",
              "people think and behave irrationally when it comes to eating.",
            ],
          },
          {
            heading: "In the second paragraph, what is the reviewer doing?",
            alternatives: [
              "disagreeing with an opinion that has been given.",
              "anticipating a critical response to a specific viewpoint.",
              "defending Plumlee on an arguable issue.",
              "praising Plumlee for his unique insights.",
            ],
          },
          {
            heading:
              "The fourth paragraph explains that people who are interested in healthy eating fashions...",
            alternatives: [
              "set a concerning precedent for themselves.",
              "deserve to be punished from being deceived.",
              "are well within their rights for doing so.",
              "cause problems for other people around them.",
            ],
          },
          {
            heading:
              "In the last paragraph, the reviewer criticises health gurus because...",
            alternatives: [
              "health gurus are cynical people.",
              "health gurus are attention-seeking people.",
              "health gurus are stubbornly persistent people.",
              "health gurus are self-centered people.",
            ],
          },
          {
            heading: "Throughout this article, the reviewer...",
            alternatives: [
              "references experts about the claims being made.",
              "describes Plumlee as a person whose views have changed over time.",
              "uses irony and humour to agree with Plumlee's position.",
              "takes care not to sound critical of people whose views he disagrees with.",
            ],
          },
        ]}
      >
        <p>
          Mason Plumlee is far from the first to observe that in the digital
          age, "the more information we consume, the less informed we seem to
          be." Yet, in this engaging and thought-provoking book, he convincingly
          argues that this phenomenon is especially evident in the realm of food
          and diet, an area that used to be relatively straightforward. When it
          comes to eating habits, many of us, as one psychology professor
          Plumlee cites, have become strikingly "insensitive to evidence." How
          else can we explain the surge of people without coeliac disease making
          the scientifically baseless choice to avoid gluten? Or the widespread
          influence of health websites peddling dubious claims like "wild
          blueberries remove heavy metals from brain tissue"? Plumlee highlights
          the absurdity of the detox industry, which thrives by rejecting three
          basic facts: the modern world does not expose us to unprecedented
          levels of toxins; a healthy body naturally eliminates toxins in its
          usual unglamorous ways; and no single food, not even blueberries, can
          perform this function for us.
        </p>
        <p>
          At this point, though, Plumlee is merely warming up. In subsequent
          chapters, he systematically dismantles a host of food myths with
          scientific precision and a touch of mischievous delight. Take, for
          example, proponents of the Paleo Diet, who claim humans aren’t
          biologically adapted to eat anything beyond what hunter-gatherers once
          consumed—despite the fact that nobody knows exactly what that was. Or
          the baseless fear of sugar, which Plumlee assures us won’t harm us in
          moderation.
        </p>
        <p>
          Early on, Plumlee's tone is more measured than furious—though it’s
          easy to see why "The Relatively Measured Chef" might not have been the
          most marketable title. He even remains composed while debunking the
          simplistic "natural versus chemical" dichotomy promoted by self-styled
          wellness gurus, who seem to forget that all of nature is made up of
          chemicals.
        </p>
        <p>
          As the book progresses, however, Plumlee delves deeper into what he
          describes as the "dark heart" of dietary fads. On the surface, faking
          enthusiasm for kale smoothies and quinoa might appear to be harmless,
          if self-indulgent, nonsense. But Plumlee warns these trends can act as
          a "gateway", leading individuals into more dangerous forms of
          credulity.
        </p>
      </TwoCollumnQuestion>
    </>,

    <>
      <Instruction>
        Read the text given and check the correct answer to each question on the
        right.
      </Instruction>
      <OneCollumnQuestion formRef={formRef} title={""}>
        <h1>
          <strong>The San Francisco Gold Rush</strong>
        </h1>
        <p>
          The identity of <InlineOpen /> the first person to discover gold in
          San Francisco remains a topic of debate, and it <InlineOpen /> be fair
          to say that we will likely never know for certain. However, the
          discovery of gold in 1848 set off the San Francisco Gold Rush, one of
          the largest in history. Thousands of people flocked to the gold
          fields, both <InlineOpen /> within San Francisco and from overseas.
        </p>
        <p>
          Life for the prospectors was incredibly challenging. There were{" "}
          <InlineOpen /> proper roads nor shops, housing was rudimentary, and
          illness was widespread. <InlineOpen />
          some miners struck it lucky and amassed great wealth, the majority did
          not. Those who profited the most were the tradespeople who sold
          essential supplies and tools or the landowners who sold property to
          prospectors who, after the rush, chose to settle down and make San
          Francisco their home.
        </p>
      </OneCollumnQuestion>
    </>,

    <>
      <Instruction>
        Read the text given and click each gap to select <thead></thead> correct
        answer.
      </Instruction>
      <OneCollumnQuestion formRef={formRef} title={""}>
        <h1>
          <strong>Board Game Culture in Singapore</strong>
        </h1>
        <p>
          Across cities in Singapore, you might notice the growing number of
          cafés{" "}
          <InlineClosed
            alternatives={["devoted", "designated", "attached", "applied"]}
          />{" "}
          entirely to board games. Many of these establishments have{" "}
          <InlineClosed
            alternatives={["leapt", "sprouted", "hopped", "sprung"]}
          />{" "}
          up within the past few years. Singapore, where board game cafés seem
          to be on almost every corner, has become a leading example for other
          cities aiming to{" "}
          <InlineClosed
            alternatives={["affirm", "justify", "build", "foster"]}
          />{" "}
          their own board game scene.
        </p>
        <p>
          These cafés offer more than just games; they also serve an array of
          unique teas and coffees. Step inside, and you'll encounter a{" "}
          <InlineClosed
            alternatives={["noisy", "convival", "outgoing", "dynamic"]}
          />{" "}
          environment filled with animated conversation, laughter, and the
          clatter of dice. One thing you’re unlikely to see is anyone{" "}
          <InlineClosed
            alternatives={["fixed on", "tied to", "stuck on", "glued to"]}
          />{" "}
          their phone screens.
        </p>
      </OneCollumnQuestion>
    </>,

    <>
      <Instruction>
        You are going to read a magazine article about John Prince, a dancer, dance teacher and choreographer. Six sentences have been removed from the article on the left. Choose the most suitable sentence from the list A-G on the right for each part (1-6) of the article. There is one extra sentence which you do not need to use.
      </Instruction>
      <DragQuestion
        formRef={formRef}
        propAlternatives={[
          "It's fine, but I try not to give out too much advice as it gets irritating!",
          "And if nothing you like comes out of it, then come back and be an actor or dancer.",
          "Without a strict daily timetable like this you find yourself wasting too much time.",
          "After that it's back to England to start a new term of dance classes.",
          "When it comes to coping with stress, I find that exercise helps me to cope with my problems, so I stay in good shape mentally as well.",
          "Like any profession where you're always travelling, you tend to acquire something new almost every day.",
          "Being fully equipped with all this stuff beforehand makes it easier when you go for auditions.",
        ]}
        paragraphs={[
          ["I asked John how he got started and what requirements there are. 'Well, to be a professional dancer it's useful to have had acting lessons or some background in drama. If you want to succeed in musical theatre you have to have a good singing voice as well. When you approach an agent you should take a portfolio with your CV, your statistics sheet and some good photos and reviews of past performances. You'll need dance clothes, ballet shoes, tap shoes, and even roller skates depending on what kind of show you are going to go for.'","","'Of course, you need to be extremely fit if you want to be a professional dancer. I dance or move about for about six hours a day. There are great health benefits to being a dancer. I can eat a lot of pasta without gaining weight because dancing increases your metabolism so much.'"],
          ["John has a very busy schedule in the next few months. He took time out to speak to me today from the making of a pop video to promote N-ergy's latest record. 'I choreographed the dance routine for the boys and they only had 2 days in which to learn it! I am going to be working on a video for another well known band - but that's top secret. Next month I'll be touring Spain in a production of a musical that was written by a friend of mine, Michaela Evans.'",""],
          ["As for the future, I've come to realise that I would never be content to be just a chorus dancer - I'm too much of an individual for that. Like all artists I'd love to become a household name by writing and choreographing my own musicals.' John was born in Jamaica to a Jamaican father and a Scottish mother but the family emigrated to England 20 years ago. 'I have a little sister I adore, who is also training to be a dancer.' How does it feel to have someone else following in your footsteps?",""],
          ["Has he much more to learn, I wondered. \"I've spent an incredible amount of my life training to get where I am. I went to college for two years in England, I trained for six months in Paris and about eight months in America. But you never really stop training or learning your art.\"",""],
          ["So, would you say it's been plain sailing? \"I feel I've been lucky to a degree; many people hit problems breaking into the arts. It can be a vicious circle really. You can't become a member of Equity, which is the actors' and dancers' union, without good contracts. and you can't get good contracts without being a member of Equity. My advice to people who want to get into the arts would be to go out into the world, and try everything else first.",""],
          [`What has a dance career done for you as a person? "Thanks to dancing, I've visited and performed in 23 countries so far. This has opened my eyes to the world, and I've been able to understand issues like racism and inequality from a wider perspective. Hopefully this has enabled me to become a better and more tolerant person as a result. "So all in all I'm really happy to be a dancer!"`],
        ]}
        title="Career success in the arts"
        subtitle="John Prince, famous dancer and choreographer, gives advice on how to succeed in a career in the arts."
      />
    </>,
  ];

  function renderQuestions() {
    if (currentQuestion < questions.length) {
      return questions[currentQuestion];
    } else if (currentQuestion == questions.length){
     navigate("/test/submit")
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
