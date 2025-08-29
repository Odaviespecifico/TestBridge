import {InlineOpen, InlineClosed, FourAlternatives, RadioTableInput, IdBox, OneQuestionAlternative, DragAlternative, DropAlternative, AudioAlternative} from './Alternatives.jsx'
import {DndContext} from '@dnd-kit/core';
import {DragOverlay} from '@dnd-kit/core';
import { useState, useEffect, createContext, useId} from 'react';
import { getNextId } from "./Linguaskill";
import { useFormState } from 'react-dom';


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
    const [ids, setIds] = useState([])
    useEffect(() => {
      for (let index = 0; index < 4; index++) {
          let element = getNextId()
          ids.push(element)
        }
      setIds([...ids])

      // Detecta todos os inputs
      let inputs = document.querySelectorAll('input')
      
      // Popular os inputs com o ID
      inputs.forEach((input,index) => input.value = localStorage.getItem(ids.at(index))) 
      
      // Popular o Span
      let span = document.querySelectorAll('span.bg-blue-100')
      span.forEach((span,index) => {
        span.textContent = localStorage.getItem(ids.at(index))
        if (span.textContent) {
          span.classList.toggle('inline')
          span.classList.toggle('inline-block')
        }
      }) 

      inputs.forEach((input) => {
        // Remove das alternativas a alternativa que tiver no input (Já que ele é preenchido com LocalStorage)
        let removeIndex = alternatives.indexOf(input.value)
        if (removeIndex != -1) {
          alternatives.splice(removeIndex,1)
          setAlternatives([...alternatives])
        }
      }
    )
    }, [])

    function handleDragStart(event) {
      setDraggedText(event.active.data.current)
    }
  
    function handleDragEnd (e) {
      // Muda o estilo do span para ser inline
      
      // e.active.classList.toggle
      let overDropElement = e.over
      let dropPreviousContent
      let grabbedText = e.active.data.current 
      if (overDropElement || e.collisions[1]) {
        let dropId
        try {
          dropId = e.over.id
        } catch (error) {
          dropId = e.collisions[1].id
        }
        // Muda o estilo
        const span = document.querySelector(`span[id="${dropId}"]`)
        span.classList.toggle('inline')
        span.classList.toggle('inline-block')

        dropPreviousContent = document.querySelector(`[id="${dropId}"]`).innerHTML 
        // Modifica o input para ter o valor do grabbedText
        document.querySelector(`[id="${dropId}"]`).textContent = grabbedText
        // Remove das alternativas o que tiver o mesmo texto
        let removeIndex = alternatives.indexOf(grabbedText)
        alternatives.splice(removeIndex,1)
        setAlternatives([...alternatives])

        // Atualiza o input para condizer com o span
        document.querySelector(`input[name="${dropId}"`).value = grabbedText
      }
      
    // Animação de voltar se não estiver sobre algum elemento
      else if (!overDropElement) {
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
        // Change it back to inline-Block
        const span = document.querySelector(`span[id="${e.target.id}"]`)
        span.classList.toggle('inline')
        span.classList.toggle('inline-block')
        // Add back to alternatives
        alternatives.push(e.target.textContent)
        alternatives.sort((a, b) => {return propAlternatives.indexOf(a) - propAlternatives.indexOf(b)})
        setAlternatives([...alternatives])

        // Remove os valores
        e.target.textContent = ''
        document.querySelector(`input[name="${e.target.id}"`).value = ''
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
              <OneCollumnParagraph>Lorem ipsum dolor sit amet, <DropAlternative id={ids.at(0)} handleclick={handleAlternativeRemoval}/>consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
              <OneCollumnParagraph>Lorem ipsum dolor sit amet, <DropAlternative id={ids.at(1)} handleclick={handleAlternativeRemoval}/>consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
              <OneCollumnParagraph>Lorem ipsum dolor <DropAlternative id={ids.at(2)} handleclick={handleAlternativeRemoval}/> sit amet, consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
            </form>
          </div>
          <div className='flex flex-col gap-2'>
            {/* {alternatives.length >= 1 ? alternatives.map((alt) => <DragAlternative id={alt.replaceAll(' ','')} key={alt.replaceAll(' ','')}>{alt}</DragAlternative>) : 'No alternatives left'} */}
            {alternatives.map((alt) => <DragAlternative id={alt} key={alt}>{alt}</DragAlternative>)}
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
    let audio = new Audio(audioPath)
    audio.play()
    return () => {
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
    let audio = new Audio(audioPath)
    audio.play()
    return () => {
      audio.currentTime = 0
      audio.pause()
    }
  }, [])

  return(
      <form ref={formRef} className='flex flex-col items-start justify-start w-5xl pt-5 pb-5 px-10 text-xl gap-10 overflow-y-auto'>
        <strong className='text-xl text-left'>{title}</strong>
        {children}
      </form>
  )   
}

export function ListeningTable({formRef, audioPath, rows, columns, question}) {
  const questionId = getNextId()
  useEffect(() => {
    // Check the correct inputs
    let inputs = document.querySelectorAll(`input[type=radio][name^='${questionId}']`)
    let answer = []
    columns.forEach((col, index) => {
      answer.push(localStorage.getItem(`${questionId}.${index}`))
    })
    // Check all the ones that were checked in the localStorage
    inputs.forEach((input) => {
      let inputText = input.parentElement.parentElement.children[0].textContent
      let inputCol = input.parentElement.dataset.column
      if (answer[inputCol] == inputText) {
        input.parentElement.classList.add('bg-blue-500')
        input.checked = true
      }
    }) 
    // Change the textinput to reflect what is seen
    let textInput = document.querySelectorAll(`input[type=text][name^='${questionId}']`)
    textInput.forEach((input, index) => {
      input.value = answer.at(index)
    })

    // Play audio
    let audio = new Audio(audioPath)
    audio.play()
    return () => {
      audio.currentTime = 0
      audio.pause()
    }
  }, [])

  function handleTdClick(e) {
    // Remove o fundo azul de todos os td
    let tds = document.querySelectorAll('td')
    tds.forEach((td) => td.classList.remove('bg-blue-500'))

    
    // Selecionar os elementos
    let td = e.target.closest('td')
    let radio = td.children[0]
    let col = td.dataset.column

    // Adiciona o texto no input da resposta
    let textInput = document.querySelector(`input[type='text'][name='${questionId}.${col}']`)
    let texto = td.parentElement.children[0].textContent
    textInput.value = texto
    
    if (radio.checked) {
      radio.checked = false
    }
    else {
      radio.checked = true
    }

    // Adiciona a cor se tiver um check selecionado
    tds.forEach((td) => {
      try {
        if (td.children[0].checked) {
          td.classList.add('bg-blue-500')
        }
      } catch (error) {}
    })

    
  }

  return (
    <div>
    <p className='my-5 text-lg'>{question}</p>
    <div className="flex justify-start">
      <table className="table-auto">
        <thead>
          <tr>
            <th></th>
            {columns.map((column,index) => (<th>Speaker {index + 1}
              <input type="text" name={`${questionId}.${index}`}className='hidden'/>
            </th>))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row,rowIndex) => (
            <>
            <tr>
              <td>{row}</td>
              {columns.map((column,colIndex) => (<td onClick={(e) => handleTdClick(e)} data-row={rowIndex} data-column={colIndex}><input type="radio" disabled name={`${questionId}.${colIndex}`}  id="" /><img src="/check.svg" alt="check" height='30px' width='30px' className='m-auto invert'/></td>))}
            </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export function WritingTask({formRef,children, propQuestionId}) {
  const questionId = propQuestionId
  useEffect(() => {
    let textarea = document.querySelector('textarea')
    let localText = localStorage.getItem(`${questionId}`)
    if (localText != '') {
      textarea.value = localText
      let ammountSpaces = textarea.value.trim().split(/\s+/).length
      setWordCount(ammountSpaces)
    }
    else {
      setWordCount(0)
    }
  }, [])
  const [wordCount, setWordCount] = useState(0)
  function handleTextInput(e) {
    let content = new String(e.target.value)
    let ammountSpaces = content.trim().split(/\s+/).length
    if (e.target.value == '') {
      setWordCount(0)
    }
    else {
      setWordCount(ammountSpaces)
    }
  } 

  function handleKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault()
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value = e.target.value.substring(0, start) + '        ' + e.target.value.substring(end);

      e.target.selectionStart = e.target.selectionEnd = start + 8;
    }
  }

  function handleCut() {
  let textarea = document.querySelector('textarea');
  let selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

  if (selectedText) {
    navigator.clipboard.writeText(selectedText).then(() => {
      let start = textarea.selectionStart;
      let end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start;

      handleTextInput({ target: textarea });
      localStorage.setItem(`${questionId}`, textarea.value);
    });
  }
  textarea.focus();
}

function handleCopy() {
  let textarea = document.querySelector('textarea');
  let selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);

  if (selectedText) {
    navigator.clipboard.writeText(selectedText);
  }
  textarea.focus();
}

function handlePaste() {
  let textarea = document.querySelector('textarea');

  navigator.clipboard.readText().then((clipText) => {
    let start = textarea.selectionStart;
    let end = textarea.selectionEnd;

    textarea.value = textarea.value.substring(0, start) + clipText + textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + clipText.length;

    handleTextInput({ target: textarea });
    localStorage.setItem(`${questionId}`, textarea.value);
  });
  textarea.focus();
}

  return (
    <div className="grid grid-cols-2 w-full h-10/12 p-5 pt-2">
      <div className='text-lg/loose overflow-y-auto h-full p-3'>
      {children}
      </div>
      <div className='flex flex-col text-lg gap-3'>
        <div className='flex gap-10'>
          <IdBox>{questionId}</IdBox>
          <div className='flex gap-2'>
            <button type='button' className='bg-neutral-100 border-2 border-neutral-200 px-2 py-1 rounded-md w-15 hover:bg-gray-200 active:bg-gray-300' onClick={handleCut}>Cut</button>
            <button type='button' className='bg-neutral-100 border-2 border-neutral-200 px-2 py-1 rounded-md w-15 hover:bg-gray-200 active:bg-gray-300' onClick={handleCopy}>Copy</button>
            <button type='button' className='bg-neutral-100 border-2 border-neutral-200 px-2 py-1 rounded-md w-15 hover:bg-gray-200 active:bg-gray-300' onClick={handlePaste}>Paste</button>
          </div>
        </div>
        <form ref={formRef} className='h-full w-11/12 ml-auto'>
          <textarea name={questionId} id={questionId} className='resize-none w-full h-full border-x-blue-200 border-x-2 focus:bg-blue-50 p-1' onInput={(e) => handleTextInput(e)} onKeyDown={(e) => handleKeyDown(e)}></textarea>
        </form>
        <div className='text-center'>
          Word count: {wordCount}
        </div>
      </div>
    </div>
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
    <div className="border-2 p-2 w-fit">
      {title ? <h2 className='font-bold text-xl text-left mb-5'> {title}</h2> : '' }
      <p className='w-fit'>{children}</p>
    </div>
  )
}

export function IndentedItem({children, decorator}) {
    {if (decorator) {
      return(<li className='ml-5 list-disc'>{children}</li>)}
    if (!decorator) {
      return(<li className='ml-5 list-none'>{children}</li>)}
    }
}