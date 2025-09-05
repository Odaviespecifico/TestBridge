import { useId, useRef, useState, useEffect, use } from "react";
import {useDroppable} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';
import { getNextId } from "./Linguaskill";

export function InlineOpen({removeSpace = 'true'}) {
  // Get the previous answer
  const questionId = getNextId();
  useEffect(() => {
    let inputs = document.querySelectorAll('input')
    inputs.forEach((input) => input.value = localStorage.getItem(input.getAttribute('name'))) 
  }, [])
  
  function removeSpace(e) { 
    if (removeSpace == 'true') {
      e.target.value = e.target.value.replaceAll(' ', '')
    }
  } 

  return (
    <span className="group inline-flex gap-0.5 items-center">
      <IdBox>{questionId}</IdBox>
      <input
        className="h-9 bg-blue-100 lg:w-64 sm:w-40 outline-0 border-2 font-base border-white box-border group-has-focus:bg-white focus:border-blue-500 text-center"
        type="text"
        name={questionId}
        onInput={(e) => removeSpace(e)}
      />
    </span>
  );
}

export function InlineClosed({alternatives}) {
  // Get the previous answer
  const questionId = useRef(getNextId()).current
  useEffect(() => {
    let inputs = document.querySelectorAll('input')
    inputs.forEach((input) => input.value = localStorage.getItem(input.getAttribute('name'))) 
  }, [])

  let alternativeDiv = useRef(null)
  let alternativeInput = useRef(null)
  
  function hideOptions(e) {
    alternativeDiv.current.className = alternativeDiv.current.className.replaceAll('hover:flex', '')
    alternativeInput.current.value = e.target.innerText
  }

  function handleInputClick(e) {
    /** @type {HTMLDivElement} **/
    const alternativeDiv = e.target.parentElement.children[2]
    console.log(alternativeDiv)
    alternativeDiv.classList.replace('hidden','flex')
  }
  
  function handleFocusOut(e) {
    /** @type {HTMLDivElement} **/
    const alternativeDiv = e.target.parentElement.children[2]
    alternativeDiv.classList.replace('flex','hidden')
  }
  return (
    <>
    <span className="peer group inline-flex gap-1 items-center min-w-32 ml-2">
      <span className="size-8 bg-neutral-900 text-white text-base inline-flex justify-center items-center font-bold group-has-focus:bg-blue-700">
        {questionId}
      </span>
      <input name={questionId}
        className="h-9 lg:w-64 sm:w-52 bg-blue-100 outline-0 border-2 font-base border-white box-border group-has-focus:bg-white focus:border-blue-500 text-center"
        type="text"
        ref={alternativeInput}
        readOnly
        onFocus={() => alternativeDiv.current.className = alternativeDiv.current.className + ' hover:flex'}
        onClick={(e) => handleInputClick(e)}
        onBlur={(e) => handleFocusOut(e)}
      />
      <div className="hidden absolute bottom-[56px] left-0 w-full h-24 bg-blue-600 animate-(--animate-comeTop)"
          ref={alternativeDiv}>
            {alternatives.map((element) => <button type='button' className="flex w-full justify-center items-center font-medium text-white text-md hover:bg-blue-700" onClick={(e) => hideOptions(e)}>{element}</button>)}
      </div>
    </span>
    </>
  )
}

export function FourAlternatives({alternatives,heading, handleToggle}) {
  const questionId = getNextId()
  return(
    <div readonly className="w-full select-none">
      <button type="button" readonly className="flex items-start gap-1 py-2 w-full transition all duration-300" onClick={(e) => handleToggle(e)} id={questionId}>
        <img src="/triangleArrow.png" alt="arrow" className="size-8 inline rotate-180 transition all duration-300"/>
        <IdBox>{questionId}</IdBox>
        <h1 className="text-lg text-left">{heading}</h1>
      </button>
      <div className="hidden w-full">
        <div className="w-full">
          {alternatives.map((alternative) => <RadioTableInput id={questionId} readonly key={questionId + alternative}>{alternative}</RadioTableInput>)}
        </div>
      </div>
    </div>
  )
}

export function AudioAlternative({alternatives,heading}) {
  const questionId = getNextId()
  return(
    <div className="w-full">
      <button type="button" className="flex items-start gap-3 py-2 w-full">
        <IdBox>{questionId}</IdBox>
        <h1 className="text-lg text-left">{heading}</h1>
      </button>
      <table className="w-full">
        <tbody className="w-full">
          {alternatives.map((alternative) => <RadioTableInput id={questionId}>{alternative}</RadioTableInput>)}
        </tbody>
      </table>
    </div>
  )
}


export function IdBox({children}) {
  return(
  <span className="h-8 w-8 aspect-square bg-neutral-900 border-white border-2 p-0.5 text-white justify-center items-center inline-flex font-bold text-lg group-has-focus:bg-blue-700">
    {children}      
  </span>
  )
}

export function RadioTableInput({children, id}) {
  // Get the previous answer
  useEffect(() => {
    let inputs = document.querySelectorAll('input[type=radio]')
    inputs.forEach((input) => {
      let correct = localStorage.getItem(input.getAttribute('name'))
      if (input.getAttribute('value') == correct) {
        input.click()
      }
    }) 
  }, [])

  function handleFocus(e) {
    e.unfocus()
  }
  return (
    <div className='flex gap-8 items-center px-8 odd:bg-gray-100 min-h-14 w-full hover:cursor-pointer' key={children} onClick={(e) => {if (e.target.children[0]) {e.target.children[0].click()}}}>
      <input onClick={(e) => handleFocus(e)} type="radio" name={id} id={"input-"+id+children+'id'} value={children} className="size-6 aspect-square hover:cursor-pointer"/>
      <label htmlFor={"input-"+id+children+'id'} className="hover:cursor-pointer">{children}</label>
    </div>
  )
}

export function OneQuestionAlternative({children,id}) {
  // get previous values 
  useEffect(() => {
    let inputs = document.querySelectorAll('input[type=radio]')
    inputs.forEach((input) => {
      let correct = localStorage.getItem(input.getAttribute('name'))
      if (input.getAttribute('value') == correct) {
        input.click()
      }
    }) 
  }, [])

  function handleClick(e) {
    let div = e.target.closest('div')
    div.children[0].click()
  }
  return(
    <div className='flex gap-8 items-center px-8 odd:bg-gray-100 min-h-14 w-full select-none' readOnly onClick={(e) => handleClick(e)}>
          <input type="radio" name={id} id={id+children} className="size-6 hover:cursor-pointer" value={children}/>
          <label htmlFor={id+children} className="hover:cursor-pointer">{children}</label>
    </div>
  )
}

export function DragAlternative({children, id,}) {
  const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
    id: id,
    data: children,
  });

  return (
      <div id={id} ref={setNodeRef} {...listeners} {...attributes} className="w-full relative bg-blue-500 text-lg text-white p-2
        rounded-xl hover:cursor-grab active:cursor-grabbing
        transition-colors duration-200 ease-in-out
        hover:bg-blue-600 active:bg-blue-700
        shadow-md hover:shadow-lg"
        >
        {children}
      </div>
  )
}

export function DropAlternative({children, id, handleclick, inlineStyle}) {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  
  function handleChange(e) {
    console.log('mudou')
  }
  return (
    <span className=""> 
      <IdBox>{id}</IdBox>
      <span type='text' id={id} className="inline-block field-sizing-content w-32 relative align-middle h-9 bg-blue-100 outline-0 mr-2 font-base ml-2 p-1  border-white box-border text-center hover:cursor-pointer"
      ref={setNodeRef}
      readOnly
      onClick={(e) => handleclick(e)}
      onChange={(e) => handleChange(e)}
      >
      </span>

      <input type="text" 
      name={id}
      hidden
      />
      
    </span>
  );
}