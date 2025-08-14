import { useState } from 'react'
import './index.css'

export default function Linguaskill() {
  let instruction = ''
  return (
    <div className='flex justify-start items-center flex-col h-full'>
      <Header />
      <Instruction text={instruction}/>
      <Content etapa={0}/>
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
  return (
    text ? <div className="flex items-center p-7 h-12 text-lg w-full bg-neutral-700 text-white ">
    {text}  
    </div> :
    <div className="hidden"></div>
  )
}
export function Content({etapa}) {
  console.log(etapa)
  if (etapa == 0) {
    return (
    <div className="grid grid-cols-1 gap-10 py-7 w-fit xl:-ml-48 px-6" >
      <img src="https://content.metritests.com/ftp_delivery_QA/logos/Linguaskill-ident.jpg" alt="Linguaskill Logo" className='h-[65px]' />
      <div>
        <h1 className='text-4xl font-bold mb-7'>Reading - Mock 1</h1>
        <p className='mb-3 text-xl'>Linguaskill is an adaptive test</p>
        <p className='mb-3 text-xl'>This demonstration will show you what the Reading questions look like.</p >
        <p className='mb-3 text-xl'>To move through the questions, click the arrows in the bottom-right corner of the screen.</p >
        <p className='mb-3 text-xl'>Click <strong>Start</strong> in the bottom-right corner of the screen to begin the demonstration.</p>
      </div>
    </div>
    )
  }
  else {
    return(
      <>
        <h1 className='text-4xl font-bold mb-7'>Teste</h1>
      </>
    )
  }
}

export function Footer() {
  function handleClick() {
    alert('Você passou para o próximo')
  }
  return (
    <div className="flex w-screen h-14 bg-gray-950 mt-auto flex-row-reverse px-10">
      <a href="" className='text-gray-100 font-medium text-2xl hover:text-gray-300' onClick={handleClick}>Start</a>
    </div>
  )
}