import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import {  Header,  Instruction,  Introduction,  Footer,  Loading,} from "./utils.jsx";
import { RegisterAttempt, SubmitAttempt, ResultsDisplay } from './questions.jsx';
import { Tokens } from './tokens.jsx';
import Linguaskill from './Linguaskill.jsx'
import { Home } from './home.jsx';
import { ReviewQuestions } from './review.jsx';

function App() {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const version = localStorage.getItem("version") || "1.0.1";
    import(`./testVersions/${version}.jsx`)
      .then((mod) => setQuestions(mod.questions))
      .catch((err) => console.error("Failed to load questions", err));
  }, []);

  if (!questions) return <Loading />;

  return (
    <Routes>
      <Route path='/test' element={<Linguaskill questions={questions}/>}/>
      <Route path='/test/submit' element={<SubmitAttempt/>}/>
      <Route path='/test/result' element={<ResultsDisplay/>}/>
      <Route path='/' element={<RegisterAttempt/>}/>
      <Route path='/token' element={<Tokens/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/review' element={<ReviewQuestions
      gabarito={{
  "1": "Students who have morning lectures will need to go to a different venue tomorrow.",
  "2": "elements",
  "3": "If walkers choose this path, they need to be extra careful.",
  "4": "trivialise",
  "5": "people think and behave irrationally when it comes to eating.",
  "6": "defending Plumlee on an arguable issue.",
  "7": "set a concerning precedent for themselves.",
  "8": "health gurus are stubbornly persistent people.",
  "9": "uses irony and humour to agree with Plumlee's position.",
  "10": "who",
  "11": "would",
  "12": "from",
  "13": "neither",
  "14": "while",
  "15": "devoted",
  "16": "sprung",
  "17": "foster",
  "18": "convival",
  "19": "glued to",
  "20": "Being fully equipped with all this stuff beforehand makes it easier when you go for auditions.",
  "21": "When it comes to coping with stress, I find that exercise helps me to cope with my problems, so I stay in good shape mentally as well.",
  "22": "After that it's back to England to start a new term of dance classes.",
  "23": "It's fine, but I try not to give out too much advice as it gets irritating!",
  "24": "Like any profession where you're always travelling, you tend to acquire something new almost every day.",
  "25": "And if nothing you like comes out of it, then come back and be an actor or dancer.",
  "26": "calm and reflective.",
  "27": "She does nothing in order to avoid a fuss.",
  "28": "She hopes it will prompt her to take up exercise.",
  "29": "glad to have got her own way.",
  "30": "he might trip over Katy's equipment.",
  "31": "makes a tinkling sound.",
  "32": "It is a typical image most folk have of the beast, but it is very much a false one, for the wildcat is little more than a bigger version of the domestic cat, and probably shows his anger as often",
  "33": "They probably used deciduous and coniferous woodland for shelter, particularly in winter, and hunted over more open areas such as forest edge, open woodland, thickets and scrub, grassy areas and marsh. The wildcat was probably driven into more mountainous areas by a combination of deforestation and persecution.",
  "34": "The recruitment of men to the armed forces during the conflict in Europe from 1914 to 1918 meant there was very little persecution, since gamekeepers went off to fight. As the number of gamekeepers decreased, the wildcat began to increase its range, recolonising many of its former haunts. Extinction was narrowly averted.",
  "35": "This is what makes many people think that the wildcat is a species in its own right. Research currently being undertaken by Scottish Natural Heritage is investigating whether the wildcat really is distinct from its home- living cousin, or whether it is nothing more than a wild-living form of the domestic cat.",
  "36": "The results, which are expected shortly, will be fascinating. But anyone who has seen a wildcat will be in little doubt that there is indeed a unique and distinctive animal living in the Scottish Highlands, whatever his background.",
  "37": "As the animals emerge, their curiosity is aroused by every movement and rustle in the vegetation. Later they will accompany their mother on hunting trips, learning quickly, and soon become adept hunters themselves."
}} resposta={
  {
  "1": "Students in the afternoon need to read the notice board until repairs are completed.",
  "2": "elements",
  "3": "If walkers choose this path, they need to be extra careful.",
  "4": "exonerate",
  "5": "people are easily led into silly weight reduction programmes.",
  "6": "anticipating a critical response to a specific viewpoint.",
  "7": "set a concerning precedent for themselves.",
  "8": "health gurus are cynical people.",
  "9": "uses irony and humour to agree with Plumlee's position.",
  "10": "who",
  "11": "can",
  "12": "from",
  "13": "neither",
  "14": "While",
  "15": "designated",
  "16": "sprouted",
  "17": "build",
  "18": "noisy",
  "19": "stuck on",
  "20": "Being fully equipped with all this stuff beforehand makes it easier when you go for auditions.",
  "21": "When it comes to coping with stress, I find that exercise helps me to cope with my problems, so I stay in good shape mentally as well.",
  "22": "After that it's back to England to start a new term of dance classes.",
  "23": "It's fine, but I try not to give out too much advice as it gets irritating!",
  "24": "Like any profession where you're always travelling, you tend to acquire something new almost every day.",
  "25": "And if nothing you like comes out of it, then come back and be an actor or dancer.",
  "26": "calm and reflective.",
  "27": "She does nothing in order to avoid a fuss.",
  "28": "She hopes it will prompt her to take up exercise.",
  "29": "surprised to hear her baby chattering.",
  "30": "he might damage an item of furniture.",
  "31": "makes a tinkling sound.",
  "32": "It is a typical image most folk have of the beast, but it is very much a false one, for the wildcat is little more than a bigger version of the domestic cat, and probably shows his anger as often",
  "33": "They probably used deciduous and coniferous woodland for shelter, particularly in winter, and hunted over more open areas such as forest edge, open woodland, thickets and scrub, grassy areas and marsh. The wildcat was probably driven into more mountainous areas by a combination of deforestation and persecution.",
  "34": "The recruitment of men to the armed forces during the conflict in Europe from 1914 to 1918 meant there was very little persecution, since gamekeepers went off to fight. As the number of gamekeepers decreased, the wildcat began to increase its range, recolonising many of its former haunts. Extinction was narrowly averted.",
  "35": "This is what makes many people think that the wildcat is a species in its own right. Research currently being undertaken by Scottish Natural Heritage is investigating whether the wildcat really is distinct from its home- living cousin, or whether it is nothing more than a wild-living form of the domestic cat.",
  "36": "The results, which are expected shortly, will be fascinating. But anyone who has seen a wildcat will be in little doubt that there is indeed a unique and distinctive animal living in the Scottish Highlands, whatever his background.",
  "37": "As the animals emerge, their curiosity is aroused by every movement and rustle in the vegetation. Later they will accompany their mother on hunting trips, learning quickly, and soon become adept hunters themselves.",
}}/>}/>
      
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
