import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import {  Header,  Instruction,  Introduction,  Footer,  Loading,} from "./utils.jsx";
import { RegisterAttempt, SubmitAttempt, ResultsDisplay } from './questions.jsx';
import { Tokens } from './tokens.jsx';
import Linguaskill from './Linguaskill.jsx'
import Linguaskill2 from './Linguaskill2.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/test' element={<Linguaskill/>}/>
        <Route path='/test/submit' element={<SubmitAttempt></SubmitAttempt>}/>
        <Route path='/test/result' element={<ResultsDisplay></ResultsDisplay>}/>
      <Route path='/' element={<RegisterAttempt/>}/>
      <Route path='/token' element={<Tokens/>}></Route>
      <Route path='/writing' element={<Linguaskill2/>}></Route>
    </Routes>
  </BrowserRouter>
)
