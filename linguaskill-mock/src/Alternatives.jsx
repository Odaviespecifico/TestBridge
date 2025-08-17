import { useId, useRef, useState } from "react";

export function InlineOpen({id}) {

  function removeSpace(e) { ''
    e.target.value = e.target.value.replaceAll(' ', '')
  }

  return (
    <span className="group inline-flex gap-1 items-center min-w-32">
      <span className="size-8 bg-neutral-900 text-white text-base inline-flex justify-center items-center font-bold group-has-focus:bg-blue-700">
        {id}
      </span>
      <input
        className="h-9 bg-blue-100 outline-0 border-2 font-base border-white box-border group-has-focus:bg-white focus:border-blue-500 text-center"
        type="text"
        name={id}
        onInput={(e) => removeSpace(e)}
      />
    </span>
  );
}

export function InlineClosed({alternatives}) {
  function blockWriting(e) { ''
    e.target.value = e.target.value.replace(/./, '')
  }
  
  function handleAlternativeClick() {
    console.log('teste')
    alert('test')
  }
  return (
    <>
    <span className="peer group inline-flex gap-1 items-center min-w-32">
      <span className="size-8 bg-neutral-900 text-white text-base inline-flex justify-center items-center font-bold group-has-focus:bg-blue-700">
        {question_id}
      </span>
      <input name={question_id}
        className="h-9 bg-blue-100 outline-0 border-2 font-base border-white box-border group-has-focus:bg-white focus:border-blue-500 text-center"
        type="text"
        onInput={(e) => blockWriting(e)}
      />
    </span>
    <div className="absolute bottom-[56px] left-0 w-full h-24 bg-blue-600 grid grid-cols-4 not-peer-has-focus:bottom-[-500px] transition-all 2s z-1">
      <button className="flex justify-center items-center font-medium text-white text-md hover:bg-blue-700" onClick={handleAlternativeClick}>{alternatives[0]}</button>
      <button className="flex justify-center items-center font-medium text-white text-md hover:bg-blue-700">{alternatives[1]}</button>
      <button className="flex justify-center items-center font-medium text-white text-md hover:bg-blue-700">{alternatives[2]}</button>
      <button className="flex justify-center items-center font-medium text-white text-md hover:bg-blue-700">{alternatives[3]}</button>
    </div>
    </>
  )
}