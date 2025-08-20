import {InlineOpen, InlineClosed, FourAlternatives, RadioTableInput, IdBox, OneQuestionAlternative, DragAlternative, DropAlternative} from './Alternatives.jsx'
import {DndContext} from '@dnd-kit/core';
import {DragOverlay} from '@dnd-kit/core';
import { useState, useEffect} from 'react';


export function RegisterAttempt({formRef}) {
  return (
    <form ref={formRef} className="flex flex-col gap-4 p-4 max-w-md mx-auto h-full justify-center -mt-35">
      <h1 className="text-2xl font-bold text-center mb-4">Registrar tentativa</h1>
      <label className="flex flex-col font-semibold text-lg">
        Seu nome
        <input
          type="text"
          name="studentName"
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Digite seu nome"
        />
      </label>
      <label className="flex flex-col font-semibold text-lg">
        Nome do seu professor
        <input
          type="text"
          name="teacherName"
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Digite o nome do professor"
        />
      </label>
    </form>
  )
}
export function OneCollumnQuestion({formRef}) {
  let idCount = 0
  
  function incrementId() {
    idCount++
    return idCount
}  
  return (
    <div className="flex flex-col gap-10 px-6 w-full max-w-5xl flex-1 mt-5" >
        <TextTitle>Open gap fill</TextTitle>
        <form id='formQuestion' ref={formRef} className='mb-3 text-xl/loose'> 
        <p>If you <InlineOpen id={incrementId()}></InlineOpen> ice, it melts <br></br></p> 
        <hr />
        If she <InlineOpen id={incrementId()}/> hard, she will pass the exam <br />
        <hr />
        If I <InlineOpen id={incrementId()}/> more confidente, I would speak in the meeting. <br />
        <hr />
        If they invite me, I <InlineOpen id={incrementId()}/> to the party <br />
        <hr />
        If we <InlineOpen id={incrementId()}/> earlier, we wouldn't have missed the train. <br />
        <hr />
        if I <InlineOpen id={incrementId()}/> the answer, I would have told you
        <hr />
        You will feel better if you <InlineOpen id={incrementId()}/> some rest.<br />
        <hr />
        If he <InlineOpen id={incrementId()}/> the meeting yesterday, he would know the plan now.
        </form>
        {/* <InlineClosed id={incrementId()} alternatives={['You','have to', 'pass the alternatives','as a array prop']}></InlineClosed> */}
    </div>
    )
  }
  
  export function TwoCollumnQuestion({formRef}) {
    let idCount = 2
    function incrementId() {
      idCount++
      return idCount
    } 

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
            <TextTitle center={false}>Question Title</TextTitle>
            <em className='text-[18px]'>Sub-title</em>
          </div>
          <BoxText title='title'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore ad explicabo quidem quo similique rem nulla aut impedit accusantium. Accusantium iste aliquam illo culpa dolorum quia totam aperiam nihil accusamus.</BoxText>
          <BoxText title='title 2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid asperiores nobis dolorum fugit velit sed, accusantium iste nam iusto debitis voluptatibus! Aliquam voluptate amet fugiat quasi quia deleniti cupiditate cumque?</BoxText>
          
        </div>
        <form id='formQuestion' ref={formRef} className='p-5 overflow-y-auto'>
          <FourAlternatives heading={'My question'} alternatives={['A','B','C','D']} id={incrementId()} handleToggle={handleToggle}></FourAlternatives>
          <FourAlternatives heading={'My second question'} alternatives={['E','F','G','H']} id={incrementId()} handleToggle={handleToggle}></FourAlternatives>
        </form> 
    </div>
  )
}

export function OneQuestionMultipleChoice({formRef}) {
  let idCount = 4
  const incrementId = () => {
    idCount++
    localStorage.getItem(idCount)
    return idCount
  } 

  return (
    <div className="flex gap-8 items-start p-8 w-full max-w-5xl h-full">
      <IdBox>{incrementId()}</IdBox>
      <div className='border-4 rounded-2xl p-2 max-w-96 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur debitis at, quis quos incidunt error voluptas tempora suscipit magni eius dolores fuga deleniti nihil eum ducimus laboriosam autem ullam reiciendis!</div>
      <form ref={formRef} className='flex-1'>
        <OneQuestionAlternative id={idCount}>test1</OneQuestionAlternative>
        <OneQuestionAlternative id={idCount}>test2</OneQuestionAlternative>
        <OneQuestionAlternative id={idCount}>test3</OneQuestionAlternative>
        <OneQuestionAlternative id={idCount}>test4</OneQuestionAlternative>
      </form>
    </div>
  )
}

export function DragQuestion({formRef}) {
    let idCount = 5
    function incrementId() {
      idCount++
      return idCount
    } 

    let alternativeOriginal = ['teste 1', 'teste 2', 'teste 3','teste 4','teste 5']
    const [alternatives, setAlternatives] = useState(['teste 1', 'teste 2', 'teste 3','teste 4','teste 5'])
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
          alternatives.sort((a, b) => {return alternativeOriginal.indexOf(a) - alternativeOriginal.indexOf(b)})
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
        alternatives.sort((a, b) => {return alternativeOriginal.indexOf(a) - alternativeOriginal.indexOf(b)})
        setAlternatives([...alternatives])
        e.target.value = ''
      }
}

    return (
      <DndContext autoScroll={false} onDragEnd={(e) => handleDragEnd(e)} onDragStart={(e) => handleDragStart(e)}>
        <div className='grid grid-cols-2 gap-5 w-full flex-1 p-5 max-h-10/12'>
          <div className='flex flex-col relative gap-5 overflow-y-scroll z-0'>
            <div>
              <TextTitle center={false}>Question Title</TextTitle>
              <em className='text-[18px]'>Sub-title</em>
            </div>
            <form action="" ref={formRef}>
              <OneCollumnParagraph>Lorem ipsum dolor sit amet, <DropAlternative id={incrementId()} handleclick={handleAlternativeRemoval}></DropAlternative>consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
              <OneCollumnParagraph>Lorem ipsum dolor sit amet, <DropAlternative id={incrementId()} handleclick={handleAlternativeRemoval}></DropAlternative>consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
              <OneCollumnParagraph>Lorem ipsum dolor <DropAlternative id={incrementId()} handleclick={handleAlternativeRemoval}></DropAlternative> sit amet, consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
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
// Small components
function OneCollumnParagraph({children}) {
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

function BoxText({children, title}) {
  return(
    <div className="border-2 mb-10 p-2">
      <h2 className='font-bold text-xl text-left'> {title}</h2>
      <p className='mt-5'>{children}</p>
    </div>
  )
}

