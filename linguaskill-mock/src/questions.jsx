import {InlineOpen, InlineClosed, FourAlternatives, RadioTableInput, IdBox, OneQuestionAlternative, DragAlternative, DropAlternative, AudioAlternative} from './Alternatives.jsx'
import {DndContext} from '@dnd-kit/core';
import {DragOverlay} from '@dnd-kit/core';
import { useState, useEffect, createContext, useId} from 'react';
import { getNextId } from "./Linguaskill";


export function RegisterAttempt({formRef}) {
  return (
    <form ref={formRef} className="flex flex-col gap-4 p-4 max-w-md mx-auto h-full justify-center -mt-35">
      <h1 className="text-2xl font-bold text-center mb-4">Register attempt</h1>
      <label className="flex flex-col font-semibold text-lg">
        Your name
        <input
          required
          minLength='3'
          type="text"
          name="studentName"
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Digite seu nome"
        />
      </label>
      <label className="flex flex-col font-semibold text-lg">
        Your English Teacher
        <input
          required
          minLength='3'
          type="text"
          name="teacherName"
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Digite o nome do professor"
        />
      </label>
      <label className="flex flex-col font-semibold text-lg">
        Session ID
        <input
          required
          minLength='5'
          type="text"
          name="sessionId"
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Digite o nome do professor"
        />
      </label>
    </form>
  )
}
export function OneCollumnQuestion({formRef, title, children}) {
  return (
    <div className="flex flex-col gap-10 px-6 w-full max-w-5xl flex-1 mt-5" >
        <TextTitle>{title}</TextTitle>
        <form id='formQuestion' ref={formRef} className='mb-3 text-xl/loose'> 
        {children}
        </form>
        {/* <InlineClosed id={incrementId()} alternatives={['You','have to', 'pass the alternatives','as a array prop']}></InlineClosed> */}
    </div>
    )
  }
  
  export function TwoCollumnQuestion({formRef, title, subtitle, questions, children}) {
    function handleToggle(e) {
      e.target.closest('button').classList.toggle('bg-blue-600')
      e.target.closest('button').classList.toggle('text-white') 
      e.target.closest('button').children[0].classList.toggle('rotate-180')
      e.target.closest('button').children[0].classList.toggle('invert')
      e.target.closest('div').children[1].classList.toggle('hidden')
      let targetID = e.target.closest('button').id

      let buttons = document.querySelectorAll('button[id]')
      buttons.forEach((button) => {
        if (button.id != targetID) {
          button.classList.remove('bg-blue-600')
          button.classList.remove('text-white')
          button.children[0].classList.add('rotate-180')
          button.children[0].classList.remove('invert')
          button.parentElement.children[1].classList.add('hidden')
        }
      })
    }
    return (
      <div className="grid grid-cols-2 gap-5 w-full flex-1 p-5 max-h-10/12">
        <div className='flex flex-col gap-5 overflow-y-scroll'>
          <div>
            <TextTitle center={false}>{title}</TextTitle>
            <em className='text-[18px]'>{subtitle}</em>
          </div>
          {children}
        </div>
        <form id='formQuestion' ref={formRef} className='p-5 overflow-y-auto'>
          {questions.map((question) => {
            return (
              <FourAlternatives
              heading={question.heading}
              alternatives={question.alternatives}
              handleToggle={handleToggle}
              ></FourAlternatives>
            )
          })}
        </form> 
    </div>
  )
}

export function OneQuestionMultipleChoice({formRef, children, alternatives}) {
  const questionId = getNextId()
  return (
    <div className="flex gap-8 items-start p-8 w-full max-w-5xl h-full">
      <IdBox>{questionId}</IdBox>
      <div className='border-4 rounded-2xl p-2 max-w-96 text-base'>{children}</div>
      <form ref={formRef} className='flex-1'>
        {alternatives.map((alternative) => {
          return (<OneQuestionAlternative id={questionId}>{alternative}</OneQuestionAlternative>)
        })}
      </form>
    </div>
  )
}

export function DragQuestion({formRef, propAlternatives, title, subtitle, content}) {
    const [alternatives, setAlternatives] = useState(Array.from(propAlternatives))
    const [draggedText, setDraggedText] = useState(null);
    // Remover alternativas já populadas
    useEffect(() => {
          let inputs = document.querySelectorAll('input')
          inputs.forEach((input) => {
            let removeIndex = alternatives.indexOf(input.value)
            if (removeIndex != -1) {
              alternatives.splice(removeIndex,1)
              setAlternatives([...alternatives])
            }
          })
           
    }, [])

    function handleDragStart(event) {
      setDraggedText(event.active.data.current)
    }
  
    function handleDragEnd (e) {
      let over = e.over
      let dragContent 
      if (over) {
         dragContent = document.querySelector(`[id="${e.over.id}"]`).value 
      }
      let text = document.querySelector(`#${e.active.id}`).innerHTML
      
      if (over != null) {
        document.querySelector(`[id="${over.id}"]`).value = text
        if (alternatives.indexOf(text) != -1) {
          let removeIndex = alternatives.indexOf(text)
          alternatives.splice(removeIndex,1)
          setAlternatives([...alternatives])
        }
        if (dragContent != '') {
          alternatives.push(dragContent)
          alternatives.sort((a, b) => {return propAlternatives.indexOf(a) - propAlternatives.indexOf(b)})
          setAlternatives([...alternatives])
        }
      }
      if (!over) {
        const draggedElement = document.getElementById(e.active.id);
        if (draggedElement) {
          draggedElement.style.transition = 'all 0.3s ease-in-out';
          draggedElement.style.transform = 'translate3d(0px, 0px, 0)';
          draggedElement.style.opacity = '100'
          
          setTimeout(() => {
            draggedElement.style.transition = '';
          }, 300);
        }
        setDraggedText(null)
    return;
  }
    }
    
    function handleAlternativeRemoval(e) {
      if (e.target.value != '') {
        alternatives.push(e.target.value)
        alternatives.sort((a, b) => {return propAlternatives.indexOf(a) - propAlternatives.indexOf(b)})
        setAlternatives([...alternatives])
        e.target.value = ''
      }
}

    return (
      <DndContext autoScroll={false} onDragEnd={(e) => handleDragEnd(e)} onDragStart={(e) => handleDragStart(e)}>
        <div className='grid grid-cols-2 gap-5 w-full flex-1 p-5 max-h-10/12'>
          <div className='flex flex-col relative gap-5 overflow-y-scroll z-0'>
            <div>
              <TextTitle center={false}>{title}</TextTitle>
              <em className='text-[18px]'>{subtitle}</em>
            </div>
            <form action="" ref={formRef}>
              <OneCollumnParagraph>Lorem ipsum dolor sit amet, <DropAlternative id={getNextId()} handleclick={handleAlternativeRemoval}/>consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
              <OneCollumnParagraph>Lorem ipsum dolor sit amet, <DropAlternative id={getNextId()} handleclick={handleAlternativeRemoval}/>consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
              <OneCollumnParagraph>Lorem ipsum dolor <DropAlternative id={getNextId()} handleclick={handleAlternativeRemoval}/> sit amet, consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
            </form>
          </div>
          <div className='flex flex-col gap-2'>
            {alternatives.length >= 1 ? alternatives.map((alt) => <DragAlternative id={alt.replaceAll(' ','')} key={alt.replaceAll(' ','')}>{alt}</DragAlternative>) : 'vazio'}
          </div>

          <DragOverlay dropAnimation={{
              duration: 200,
              easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            }}
            style={{
              transformOrigin: '0 0',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
            }}
            className="opacity-70 scale-100 rotate-1 bg-blue-500 text-lg text-white p-2 rounded-xl">
          {draggedText}
      </DragOverlay>
        </div>
    </DndContext>
  )
}

export function ListeningClosed({formRef, audioPath, children}) {
  useEffect(() => {
    console.log('rodando audio')
    let audio = new Audio(audioPath)
    audio.play()
    return () => {
      console.log('Pausando audio')
      audio.currentTime = 0
      audio.pause()
    }
  }, [])

  return(
    <form ref={formRef} className='flex flex-col items-center justify-start w-4xl pt-5 pb-15 gap-5 overflow-y-scroll h-full'>
      {children}
    </form>
  )
}

export function ListeningGap({formRef, audioPath = '', children, title}) {
  useEffect(() => {
    console.log('rodando audio')
    let audio = new Audio(audioPath)
    audio.play()
    return () => {
      console.log('Pausando audio')
      audio.currentTime = 0
      audio.pause()
    }
  }, [])

  return(
      <form ref={formRef} className='flex flex-col items-start justify-start w-5xl pt-5 pb-5 text-xl gap-10 overflow-y-auto'>
        <strong className='text-xl text-left'>{title}</strong>
        {children}
      </form>
  )   
}

export function ListeningTable({formRef, audioPath, children}) {
  useEffect(() => {
    console.log('rodando audio')
    let audio = new Audio(audioPath)
    audio.play()
    return () => {
      console.log('Pausando audio')
      audio.currentTime = 0
      audio.pause()
    }
  }, [])

  return (
    <form ref={formRef}>
      <table>
        <thead>
          <tr>
            <th>Teste1</th>
            <th>Teste2</th>
            <th>Teste3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Speaker 1</th>
            <th>Speaker 2</th>
            <th>Speaker 3</th>
          </tr>
            <th>Speaker 1</th>
            <th>Speaker 2</th>
            <th>Speaker 3</th>
          <tr>
          </tr>
        </tbody>
      </table>
    </form>
  )
}
// Small components
export function OneCollumnParagraph({children}) {
    return(
        <p className='relative mb-3 text-lg '>{children}</p>
    )
}

function TextTitle({children, center=true}) {
  if (center == true) {
    return(
      <h1 className="font-bold text-2xl text-center">{children}</h1>
    )
  }
  else {
    return(
      <h1 className="font-bold text-2xl text-left">{children}</h1>
    )
  }
}

export function BoxText({children, title}) {
  return(
    <div className="border-2 mb-10 p-2">
      <h2 className='font-bold text-xl text-left'> {title}</h2>
      <p className='mt-5'>{children}</p>
    </div>
  )
}

