import { useId, useRef, useState, useEffect, use } from "react";

export function InlineOpen({id}) {
  // Get the previous answer
  useEffect(() => {
    let inputs = document.querySelectorAll('input')
    inputs.forEach((input) => input.value = localStorage.getItem(input.getAttribute('name'))) 
  }, [])
  
  function removeSpace(e) { ''
    e.target.value = e.target.value.replaceAll(' ', '')
  } 

  return (
    <span className="group inline-flex gap-1 items-center">
      <IdBox>{id}</IdBox>
      <input
        className="h-9 bg-blue-100 lg:w-64 sm:w-40 outline-0 border-2 font-base border-white box-border group-has-focus:bg-white focus:border-blue-500 text-center"
        type="text"
        name={id}
        onInput={(e) => removeSpace(e)}
      />
    </span>
  );
}

export function InlineClosed({alternatives, id}) {
  // Get the previous answer
  useEffect(() => {
    let inputs = document.querySelectorAll('input')
    inputs.forEach((input) => input.value = localStorage.getItem(input.getAttribute('name'))) 
  }, [])

  let alternativeDiv = useRef(null)
  let alternativeInput = useRef(null)
  
  function hideOptions(e) {
    alternativeDiv.current.className = alternativeDiv.current.className.replaceAll('hover:grid', '')
    alternativeInput.current.value = e.target.innerText
  }

  return (
    <>
    <span className="peer group inline-flex gap-1 items-center min-w-32">
      <span className="size-8 bg-neutral-900 text-white text-base inline-flex justify-center items-center font-bold group-has-focus:bg-blue-700">
        {id}
      </span>
      <input name={id}
        className="h-9 lg:w-64 sm:w-40 bg-blue-100 outline-0 border-2 font-base border-white box-border group-has-focus:bg-white focus:border-blue-500 text-center"
        type="text"
        ref={alternativeInput}
        readOnly
        onFocus={() => alternativeDiv.current.className = alternativeDiv.current.className + ' hover:grid'}
      />
    </span>
    <div className="absolute bottom-[56px] left-0 w-full h-24 bg-blue-600 hidden grid-cols-4 peer-has-focus:grid active:grid animate-(--animate-comeTop)"
         ref={alternativeDiv}>
      <button type='button' className="flex justify-center items-center font-medium text-white text-md hover:bg-blue-700" onClick={(e) => hideOptions(e)}>{alternatives[0]}</button>
      <button type='button' className="flex justify-center items-center font-medium text-white text-md hover:bg-blue-700" onClick={(e) => hideOptions(e)}>{alternatives[1]}</button>
      <button type='button' className="flex justify-center items-center font-medium text-white text-md hover:bg-blue-700" onClick={(e) => hideOptions(e)}>{alternatives[2]}</button>
      <button type='button' className="flex justify-center items-center font-medium text-white text-md hover:bg-blue-700" onClick={(e) => hideOptions(e)}>{alternatives[3]}</button>
    </div>
    </>
  )
}

export function FourAlternatives({alternatives,heading,id, handleToggle}) {
  return(
    <div className="w-full">
      <button type="button" className="flex items-start gap-1 py-2 w-full transition all duration-300" onClick={(e) => handleToggle(e)} id={id}>
        <img src="/triangleArrow.png" alt="arrow" className="size-8 inline rotate-180 transition all duration-300"/>
        <IdBox>{id}</IdBox>
        <h1 className="text-lg text-left">{heading}</h1>
      </button>
      <table className="hidden w-full">
        <tbody className="w-full">
          {alternatives.map((alternative) => <RadioTableInput id={id}>{alternative}</RadioTableInput>)}
        </tbody>
      </table>
    </div>
  )
}

export function IdBox({children}) {
  return(
  <span className="min-w-8 min-h-8 bg-neutral-900 text-white text-base inline-flex justify-center items-center font-bold group-has-focus:bg-blue-700">
    {children}  
  </span>
  )
}

export function RadioTableInput({children, id}) {
  // Get the previous answer
  useEffect(() => {
    console.log('test')
    let inputs = document.querySelectorAll('input[type=radio]')
    inputs.forEach((input) => {
      let correct = localStorage.getItem(input.getAttribute('name'))
      if (input.getAttribute('value') == correct) {
        input.click()
      }
    }) 
  }, [])

  return (
    <tr className='flex gap-8 items-center p-8 odd:bg-gray-100 h-14 w-full' key={children} onClick={(e) => e.target.children[0].click()}>
      <input type="radio" name={id} id={"input-"+id+children+'id'} value={children} className="size-6 hover:cursor-pointer"/>
      <label htmlFor={"input-"+id+children+'id'} className="hover:cursor-pointer">{children}</label>
    </tr>
  )
}

export function OneQuestionAlternative({children,id}) {
  // get previous values 
  useEffect(() => {
    console.log('test')
    let inputs = document.querySelectorAll('input[type=radio]')
    inputs.forEach((input) => {
      let correct = localStorage.getItem(input.getAttribute('name'))
      if (input.getAttribute('value') == correct) {
        input.click()
      }
    }) 
  }, [])
  return(
    <tr className='flex gap-8 items-center p-8 odd:bg-gray-100 h-14 w-full'>
          <input type="radio" name={id} id={id+children} className="size-6 hover:cursor-pointer" value={children}/>
          <label htmlFor={id+children} className="hover:cursor-pointer">{children}</label>
    </tr>
  )
}