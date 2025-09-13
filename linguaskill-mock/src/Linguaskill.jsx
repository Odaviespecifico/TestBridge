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

export default function Linguaskill() {
  let answers = Object();
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const formRef = useRef(null);

  useEffect(() => {
    // check if there is an Id
    if (!localStorage.getItem('id')) {
      navigate('/')
    }
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
          The identity of <InlineOpen /> was the first person to discover gold in
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
          ["I asked John how he got started and what requirements there are. 'Well, to be a professional dancer it's useful to have had acting lessons or some background in drama. If you want to succeed in musical theatre you have to have a good singing voice as well. When you approach an agent you should take a portfolio with your CV, your statistics sheet and some good photos and reviews of past performances. You'll need dance clothes, ballet shoes, tap shoes, and even roller skates depending on what kind of show you are going to go for.'","","'Of course, you need to be extremely fit if you want to be a professional dancer. I dance or move about for about six hours a day. There are great health benefits to being a dancer. I can eat a lot of pasta without gaining weight because dancing increases your metabolism so much.'",],
          ["","drop"],
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

    <>
      <Instruction>
        Read the text given and check the correct answer to each question on the
        right.
      </Instruction>
      <TwoCollumnQuestion
        formRef={formRef}
        title="Home Confort"
        subtitle=""
        questions={[
          {
            heading:
              "Rebecca's mood at the start of the story is",
            alternatives: ["calm and reflective.","cross and irritable.", "restless and agitated.", "sad and upset."]
          },
          {
            heading: "What action does Rebecca take with her daughter?",
            alternatives: ["She reprimands Katy for making a mess on the floor.", "She asks David to speak to Katy.", "She appeals to Katy to play a wider range of music.", "She does nothing in order to avoid a fuss."]
          },
          {
            heading:
              "What is Rebecca's attitude to the letter lying on the table?",
            alternatives: ["The adverb's claims are misleading.", "She hopes it will prompt her to take up exercise.", "It makes her feel more motivated.", "She thinks the slimming club is good value for money."]
          },
          {
            heading:
              "When David first leaves the sitting room, Rebecca is",
            alternatives: ["relieved that her baby is awake.", "surprised to hear her baby chattering.", "guilty that she's being lazy.", "glad to have got her own way."]
          },
          {
            heading: "Rebecca is worried when her husband brings in the drinks because",
            alternatives: ["he might trip over Katy's equipment.", "he doesn't like the smell of her tea.", "tea is dripping from the saucer.", "he might damage an item of furniture."]
          },
          {
            heading: "The curtain referred to in Katy's bedroom",
            alternatives: ["is identical in design to one from a previous generation.", "makes a tinkling sound.", "is made up of unusual colours.", "keeps out the light at night."]
          },
        ]}
      >
        <p>
          It was a lazy Sunday afternoon, the lull before the storm of Monday morning madness of alarm clocks, traffic jams and deadlines. The clock struck three and Rebecca's elbow still rested on the arm of the tapestry-covered sofa. With her fingertips she began caressing the rough piping that ran along its seams. Simultaneously, the toes of her left foot moved back and forth across the edges of the sheepskin rug. This action Rebecca found comforting; it reminded her of being at home as a child when she used to sit in the family sitting room, her toes playing with the fringes of another kind of rug. Her mother would snap at her to stop it, so of course she did it all the more.
        </p>
        <p>
          Rebecca had a sudden whiff of the glue that Katy was applying to make one of her artistic creations. Her daughter was seated on a cushion right in the middle of the room, looking like an island, surrounded by a sea of cardboard cut-offs, sequins, felt-tip pens, and pristine sheets of white A4 paper that she had disobediently pinched from her father's study. She really should be working at the kitchen table, Rebecca thought, but I don't have the appetite for the outburst that might happen if my genius-daughter-at-work is disturbed. Every three minutes and 50 seconds Katy got up to replay Kylie Minogue's version of 'The Locomotion'.
        </p>
        <p>
          "Why don't you listen to the CD all the way through, Katy?" her dad said, who was sprawled out on the other sofa. "You'd like the other songs as well." "Nah, too boring."
        </p>
        <p>
          Rebecca glanced at David and then said, "I could do with something to perk me up." Her words trailed off with a heavy sigh, and then a yawn. It was the first in a series of hints that she would like him to get up and make her a cup of tea.
        </p>
        <p>
          On the lamp table next to the sofa, she noticed a letter that had been delivered a week ago, advertising exercises classes and a slimming club. She had kept it on the table as a reminder, or perhaps to conjure up the same kind of magical effect that people believe in when they splash out on membership to a fancy gym without going near the place more than once every two months.
        </p>
        <p>
          "Have you seen this flyer?" she said to her husband. "Just the thought of going for a workout makes me want to go and lie down." Once more she didn't get a response. "Who's going to make the tea then?" was her third and most blatant attempt to get a drink before she died of thirst.
        </p>
        <p>
          He stood up. "I suppose it's my turn. Again." He went off into the kitchen while Rebecca, the victor, snuggled a bit further into the sofa. Charlie, who'd been asleep on the sheepskin rug, now started up with his own brand of baby chatter. He was attempting to cover the whole repertoire of vowel sounds this afternoon, like a singer performing warm-up exercises. Then, occasionally, he jammed his fingers into his mouth to make a sound approaching an elongated 'w'.
        </p>
        <p>
          He lay underneath a baby gym, which consisted of a tubular frame in patriotic colours of red, white and blue and a top bar, from which dangled two clowns, one on a swing and one in a position that Rebecca thought was called a pike. (It was a long time ago that she had achieved her gold star award in the trampoline.) Once Charlie made eye contact with Rebecca, his happy babbling began to turn into a grizzle.
        </p>
        <p>
          "Does Charlie want feeding again?" Rebecca asked in the baby voice that irritated them all, herself included. She bent down to scoop her son up. "Mum, he doesn't want feeding again. You've only just fed him," Katy said. "I'll try - just in case he's hungry." In the kitchen she warmed through the mush of potatoes and broccoli that Charlie liked and took it back through to be with Katy.
        </p>
        <p>
          Luckily, the baby was actually ready for a feed, which meant that Rebecca not only saved face with her daughter, but showed that she had no need to feel guilty about sending her husband to make the tea. David walked back in the sitting room that very minute, her cup of Earl Grey with its delicate scent of bergamot wobbling in its saucer. In his other hand he clutched a large mug. Rebecca gave him a warning look that dared him not to put the cups down on the oak blanket box that served as their coffee table. Its surface was already scarred by two rings where hot drinks had been carelessly placed directly onto it.
        </p>
        <p>
          "Thanks. You're a treasure." She settled down to feed Charlie, knowing that her tea would be the perfect temperature to drink in one go by the time he had had enough. "Where's Katy got to?" David said, after a few minutes. The answer came from upstairs as they heard the sound of their older child passing through the curtain in the doorway of her bedroom. It was like those beaded curtains that used to be in fashion when Rebecca was a child, but instead of beads this one was formed from a dazzling collection of pink, purple and silver shimmering plastic squares. She couldn't remember which one of them had named it the 'jingle-jangler' but it was very apt.
        </p>
      </TwoCollumnQuestion>
    </>,


    <>
    {/* https://www.flo-joe.co.uk/cae/students/tests/CAE-Part-7-Gapped-Text-Practice-Test.htm */}
      <Instruction> 
        You are going to read an extract from a magazine article. Six paragraphs have been removed from the extract. Choose from the paragraphs A-G the one which fits each gap (1-6). There is one extra paragraph which you do not need to use.
      </Instruction>
      <DragQuestion
        formRef={formRef}
        propAlternatives={["The recruitment of men to the armed forces during the conflict in Europe from 1914 to 1918 meant there was very little persecution, since gamekeepers went off to fight. As the number of gamekeepers decreased, the wildcat began to increase its range, recolonising many of its former haunts. Extinction was narrowly averted.", "The wildcat waits for a while in rapt concentration, ears twitching and eyes watching, seeing everything and hearing everything, trying to detect the tell-tale movement of a vole or a mouse. But there is nothing, and in another leap he disappears into the gloom.", "The results, which are expected shortly, will be fascinating. But anyone who has seen a wildcat will be in little doubt that there is indeed a unique and distinctive animal living in the Scottish Highlands, whatever his background.", "They probably used deciduous and coniferous woodland for shelter, particularly in winter, and hunted over more open areas such as forest edge, open woodland, thickets and scrub, grassy areas and marsh. The wildcat was probably driven into more mountainous areas by a combination of deforestation and persecution.", "As the animals emerge, their curiosity is aroused by every movement and rustle in the vegetation. Later they will accompany their mother on hunting trips, learning quickly, and soon become adept hunters themselves.", "This is what makes many people think that the wildcat is a species in its own right. Research currently being undertaken by Scottish Natural Heritage is investigating whether the wildcat really is distinct from its home- living cousin, or whether it is nothing more than a wild-living form of the domestic cat.", "It is a typical image most folk have of the beast, but it is very much a false one, for the wildcat is little more than a bigger version of the domestic cat, and probably shows his anger as often"]}
        paragraphs={[
          ['On my living-room wall I have a painting of a wildcat by John Holmes of which I am extremely fond. It depicts a snarling, spitting animal, teeth bared and back arched: a taut coiled spring ready to unleash some unknown fury.'],
          ['', 'drop'],
          ['However, the physical differences are tangible. The wildcat is a much larger animal, weighing in some cases up to seven kilos, the same as a typical male fox. The coat pattern is superficially similar to a domestic tabby cat but it is all stripes and no spots. The tail is thicker and blunter, with three to five black rings. The animal has an altogether heavier look.'],
          ["The Scottish wildcat was originally distinguished as a separate subspecies in 1912, but it is now generally recognised that there is little difference between the Scottish and other European populations. According to an excellent report on the wildcat printed in 1991, the animals originally occurred in a variety of habitats throughout Europe."],
          ['', 'drop'],
          ["It was during the nineteenth century, with the establishment of many estates used by landowners for hunting, that the wildcat became a nuisance and its rapid decline really began; 198 wildcats were killed in three years in the area of Glengarry, for example. However, things were later to improve for the species."],
          ['', 'drop'],
          ["The future is by no means secure, though, and recent evidence suggests that the wildcat is particularly vulnerable to local eradication, especially in the remoter parts of northern and western Scotland. This is a cause for real concern, given that the animals in these areas have less contact with domestic cats and are therefore purer."],
          ['', 'drop'],
          ["Part of the problem stems from the fact that the accepted physical description of the species originates from the selective nature of the examination process by the British Natural History Museum at the start of the century, and this has been used as the type-definition for the animal ever since. Animals that did not conform to that large blunt-tailed 'tabby' description were discarded as not being wildcats. In other words, an artificial collection of specimens was built up, exhibiting the features considered typical of the wildcat."],
          ["The current research aims to resolve this potential problem. It is attempting to find out whether there are any physical features which characterise the so-called wild-living cats."],
          ['', 'drop'],
          ["But what of his lifestyle? Wildcat kittens are usually born in May/June in a secluded den, secreted in a gap amongst boulders. Another favourite location is in the roots of a tree."],
          ['', 'drop'],
          ["Rabbits are a favourite prey, and some of the best areas to see wildcats are at rabbit warrens close to the forest and moorland edge. Mice, small birds and even insects also form a large part of the diet, and the animal may occasionally take young deer."],
          ["The wildcat is one of the Scottish Highlands' most exciting animals. Catch a glimpse of one and the memory will linger forever."]
        ]}
        // Add paragraphs
        title="Scottish Wildcat"
        subtitle=""
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
