import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import {  Header,  Instruction,  Introduction,  Footer,  Loading,} from "./utils.jsx";
import { RegisterAttempt, SubmitAttempt, ResultsDisplay } from './questions.jsx';
import { Tokens } from './tokens.jsx';
import Linguaskill from './Linguaskill.jsx'

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
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
