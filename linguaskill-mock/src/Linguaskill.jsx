import { useState } from 'react'
import './index.css'
import {OneCollumnQuestion} from './questions.jsx'
import {} from './Alternatives.jsx'

export default function Linguaskill() {
  let instruction = ['Read the four reviews.', 'Choose the correct reviewer for each of the four questions. You can choose the same reviewer for more than one question.']
  return (
    <div className='flex items-center flex-col h-full justify-stretch'>
      <Header />
      <Instruction text={['Click on each gap then type the word which you think fits best. Type only one word in each gap.']}/>
      {/* <Introduction/> */}
      <OneCollumnQuestion></OneCollumnQuestion>
      <Footer></Footer>
    </div>
  )
}

export function Header() {
  return (
    <div className="flex w-screen h-10 bg-neutral-800">
    </div>
  )
}

export function Instruction({text}) {
  if (text) {
    console.log(text)
    return text.map((line) => <div className="flex items-center p-7 h-12 text-lg w-full bg-neutral-700 font-medium text-white :: --mb-5" key={line}>{line}</div>)
  }
  else {
    <div className="hidden"></div>
  }
}

export function Introduction() {
    return (
    <div className="flex flex-col gap-10 py-7 w-fit xl:-ml-48 px-6 flex-1" >
      <img src="./Logo-Linguaskill.jpg" alt="Linguaskill Logo" className='h-[65px] w-fit' />
      <div>
        <h1 className='text-4xl font-bold mb-7'>Reading - Mock 1</h1>
        <p className='mb-3 text-xl'>Linguaskill is an exam</p>
        <p className='mb-3 text-xl'>This demonstration will show you what the look like.</p >
        <p className='mb-3 text-xl'>To move through the, click the arrows in the bottom-right corner of the screen.</p >
        <p className='mb-3 text-xl'>Click <strong>Start</strong> in the bottom corner of the screen to begin the demonstration.</p>
      </div>
    </div>
    )
}

export function Footer() {
  function handleClick() {
    alert('Você passou para o próximo')
  }
  return (
    <div className="flex w-screen h-14 bg-gray-950 flex-row-reverse px-10 justify-self-end z-2">
      <button type='submit' form='formQuestion1'className='text-gray-100 font-medium text-2xl hover:text-gray-300'>Start</button>
    </div>
  )
}

// Small components
export function QuestionTitle() {

}