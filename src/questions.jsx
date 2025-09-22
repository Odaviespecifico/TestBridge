import {InlineOpen, InlineClosed, FourAlternatives, RadioTableInput, IdBox, OneQuestionAlternative, DragAlternative, DropAlternative, AudioAlternative} from './Alternatives.jsx'
import {DndContext, pointerWithin} from '@dnd-kit/core';
import {DragOverlay} from '@dnd-kit/core';
import { useState, useEffect, createContext, useId, useRef} from 'react';
import { getNextId } from "./Linguaskill";
import { adicionarTentativa } from "./supabase.js";
import { useFormState } from 'react-dom';
import { useNavigate } from "react-router";
import {  Header,  Footer,  Loading, Instruction, Introduction} from "./utils.jsx";
import { adicionarResposta, calcularPontuacao, verificarToken, verificarSessão } from './supabase.js';

export function RegisterAttempt() {
  const formRef = useRef()
  const session = useRef(null)
  const token = useRef(null)
  const [state, setState] = useState('form')
  const [validity,setvalidity] = useState([false,false])

  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('id')) {
      navigate("/test")
    }
  },[])

  async function handleClick() {
    if (state == 'form' && formRef.current.reportValidity()) {
      let myform = new FormData(formRef.current);
      let myformObj = Object.fromEntries(myform.entries());
      if (validity[0] == false) {
        console.log(session.current.reportValidity())
        session.current.reportValidity()
        return
      }
      if (validity[1] == false) {
        token.current.reportValidity()
        return
      }
      
      setState('loading')
      let id = await adicionarTentativa(
        myformObj.studentName,
        myformObj.teacherName,
        myformObj.sessionId,
        myformObj.accessToken,
      );
      console.log(id)

      if (id.error != null) {
        alert("One error has occurred. Restarting the page" + id.error.code);
        setTimeout(() => {
          localStorage.clear();
          window.location.reload(true);
        }, 1500);
      }
      else {
        setTimeout(() => {
          setState('success')
        }, 500);
        localStorage.setItem("id", id.data.id);
        localStorage.setItem("versão",id.data.versão)
        setTimeout(() => {
          navigate("/test")
        }, 3000);
      }
    }
  }

  async function verifyToken(tokenNumber) {
    if (tokenNumber.length != 7) {
      token.current.setCustomValidity("The token needs to be 7 characters long")
      return false}
    else {
      token.current.setCustomValidity('')
    }
    if (!verifySession(session.current.value)) {
      return false
    }
    let tokenValidity = await verificarToken(
        tokenNumber,
        session.current.value,
      )
    
    if (!tokenValidity.valid) {
      token.current.setCustomValidity(tokenValidity.message)
      setTimeout(() => {
        token.current.setCustomValidity("")
        token.current.focus()
      }, 1000);
      token.current.reportValidity()
      let validityArray = Array.from(validity)
      validityArray[1] = false 
      setvalidity(validityArray)
      return false
    }
    else {
      let validityArray = Array.from(validity)
      validityArray[1] = true 
      setvalidity(validityArray)
      return tokenValidity
    }
  }

  async function verifySession(sessionNumber) {
    if (sessionNumber.length != 5) {
      session.current.setCustomValidity("The session needs to be 5 characters long")
      return false}
    else{
      session.current.setCustomValidity("")
    }
    let sessionValidity = await verificarSessão(sessionNumber)
      if (sessionValidity.error) {
        session.current.setCustomValidity('Invalid session code')
        setTimeout(() => {
          session.current.setCustomValidity("")
          session.current.focus()
        }, 1000); 
        session.current.reportValidity()
        let validityArray = Array.from(validity)
        validityArray[0] = false 
        setvalidity(validityArray)
        return false
      }
      else {
        let validityArray = Array.from(validity)
        validityArray[0] = true 
        setvalidity(validityArray)
        return true
      }
  }
  
  function renderContent() {
    switch (state) {
      case 'form':
        return (<RegisterForm formRef={formRef} sessionRef={session} tokenRef={token} verifyToken={verifyToken} verifySession={verifySession}></RegisterForm>)
      case 'loading':
        return(<Loading></Loading>)
      case 'success':
        return(<Loading status="sucess"></Loading>)
      default:
        break;
    }
  }
  return (
    <div className='flex items-center flex-col h-full w-screen justify-stretch'>
      <Header></Header>
      {renderContent(formRef, session, token)}
      <div className='flex w-full min-h-14 bg-gray-950 flex-row-reverse px-10 justify-self-end mt-auto z-2'>
        <button
          type="button"
          className="text-gray-100 font-medium text-2xl hover:text-gray-300"
          onClick={handleClick}>
          Start
        </button>
      </div>
  </div>
  )
}

function RegisterForm({formRef, sessionRef, tokenRef, verifySession, verifyToken}) {
  function handleIdInput(e,maxLength) {
    /** @type {string} */
    let value = e.target.value

    if (value.length > maxLength) {
      e.target.value = value.substring(0,maxLength)
    }
    e.target.value = e.target.value.toUpperCase()
    let verifyId = setTimeout(() => {
      
    },200)

  }
  return(
    <form ref={formRef} className="flex flex-col gap-4 p-4 w-96 mx-auto h-full justify-start">
        <h1 className="text-2xl font-bold text-center mb-4">Register attempt</h1>
        <label className="flex flex-col font-semibold text-lg">
          Your name
          <input
            required
            minLength='3'
            type="text"
            name="studentName"
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Your name"
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
            placeholder="Teacher's name"
            />
        </label>
        <label className="flex flex-col font-semibold text-lg">
          Session ID
          <input
            required
            minLength='5'
            maxLength='5'
            type="text"
            name="sessionId"
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="AB123"
            ref={sessionRef}
            onInput={(e) => {handleIdInput(e,5)
              verifySession(e.target.value)
            }}
          />
        </label>
        <label className="flex flex-col font-semibold text-lg">
          Access token
          <input
            required
            minLength='7'
            maxLength='7'
            type="text"
            name="accessToken"
            onInput={(e) => {handleIdInput(e,7)
              verifyToken(e.target.value)
            }}
            ref={tokenRef}
            className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="ABCD123"
          />
        </label>
      </form>
  )
}

export function SubmitAttempt({}) {
  let state = useRef('uploading')
  const navigate = useNavigate()
  useEffect(() => {
    async function postAnswers() {
      // Check if it is loaded
      const id = localStorage.getItem('id')
      const answers = localStorage
      let resposta = await adicionarResposta(id,answers)
      if (resposta.error) {
        if (resposta.error.code == 23505) {
          console.log('Resposta dessa tentativa já no banco de dados. Avançando para próxima etapa')
        } } 
      localStorage.setItem('id',id)
      state = 'uploaded'
      setTimeout(() => {
        navigate('/test/result')
      }, 2000);
      }
    postAnswers()
  }, [])
  return (
    <div className='flex items-center flex-col h-full w-screen justify-stretch'>
      <Header></Header>
      <div className="text-2xl font-bold text-center mb-4 p-20 h-full flex flex-col justify-start items-center">
        Sending your attempt to the cloud
        {
          (state == 'uploading') ? <Loading status='sucess'></Loading> : <Loading></Loading>} 
      </div>
      <div className='flex w-full min-h-14 bg-gray-950 flex-row-reverse px-10 justify-self-end mt-auto z-2'></div>
    </div>
  )
}

export function ResultsDisplay() {
  let [pontos, setPontos] = useState()  
  let [texto, setTexto] = useState('Loading...')
  const navigate = useNavigate()
  useEffect(() => {(async () => {
    console.log('calculando pontuação')
    let resultado = await calcularPontuacao(localStorage.getItem('id'),'1.0.1')
    setPontos(resultado)
    setTimeout(() => {
      localStorage.setItem('concluido', true)
    }, 100);
    switch(resultado.nivel) {
      case "A1":
        setTexto("Great start! You can understand and use simple everyday expressions and introduce yourself. To keep improving, practice common phrases and listen to short dialogues. Try speaking a little every day.");
        break;
      case "A2":
        setTexto("Well done! You can handle simple conversations about familiar topics like family, shopping, or work. To improve, read short texts and practice writing simple sentences. Focus on building your vocabulary step by step.");
        break;
      case "B1":
        setTexto("Impressive progress! You can talk about experiences, opinions, and plans with more confidence. To level up, watch TV shows or podcasts in English and try writing short paragraphs or diary entries.");
        break;
      case "B2":
        setTexto("Great work! You can interact fluently on many topics and understand the main ideas in complex texts. Keep pushing by debating, reading articles, and expanding your academic or professional vocabulary.");
        break;
      case "C1":
        setTexto("Excellent! You can express yourself naturally, with detail and nuance, even on complex subjects. To refine your skills, focus on advanced vocabulary, idioms, and academic writing. Try reading books or joining discussions.");
        break;
      case "C2":
        setTexto("Outstanding achievement! You understand almost everything with ease and can express yourself precisely in any situation. Keep sharp by exploring specialized materials, teaching others, or practicing professional-level communication.");
        break;
    }
  })();
  }, [])

  function handleClick(e) {
    localStorage.clear()
    navigate('/')
  }
  
  return (
    <div className='flex items-center flex-col h-full w-screen justify-stretch'>
      <Header></Header>
      <div className='flex items-center flex-col h-full w-screen justify-stretch'>
        <div className="flex h-full w-lg flex-col justify-center items-center gap-5">
          <h1 className='text-2xl font-bold text-center flex flex-col justify-start items-center'>
            Your estimate CEFR level
          </h1>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className="w-96 text-[30vh] text-center font-medium -my-20 text-amber-400">  
                {pontos ? pontos.nivel : <Loading />}
            </div>
            <p className='text-lg text-justify font-medium'>{texto}</p>
          </div>
          <button onClick={handleClick} className='bg-gray-950 text-white font-bold rounded-sm w-64 text-xl p-2 hover:cursor-pointer hover:bg-gray-800 hover:shadow-amber-400/45 hover:shadow-lg transition duration-100 active:bg-gray-600'>Back to the start</button>
        </div>
      </div>
      <div className='flex w-full min-h-14 bg-gray-950 flex-row-reverse px-10 justify-self-end mt-auto z-2'></div>
    </div>
  )
}
export function OneCollumnQuestion({formRef, title, children, instruction}) {
  return (
    <>
    <Instruction>
        {instruction}
    </Instruction>
    <div className="flex flex-col gap-10 px-6 max-w-5xl flex-1 mt-5" >
        <TextTitle>{title}</TextTitle>
        <form id='formQuestion' ref={formRef} className='mb-3 text-xl/loose'> 
        {children}
        </form>
        {/* <InlineClosed id={incrementId()} alternatives={['You','have to', 'pass the alternatives','as a array prop']}></InlineClosed> */}
    </div>
    </>
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
      <div className="grid grid-cols-2 gap-5 w-full flex-1 pt-5 px-5 h-full min-h-0">
        <div className='flex flex-col gap-5 overflow-y-scroll h-full min-h-0'>
          <div>
            <TextTitle center={false}>{title}</TextTitle>
            <em className='text-[18px]'>{subtitle}</em>
          </div>
          {children}
        </div>
        <form id='formQuestion' ref={formRef} className='px-5 pt-5 overflow-y-auto'>
          {questions.map((question) => {
            return (
              <FourAlternatives
              heading={question.heading}
              alternatives={question.alternatives}
              handleToggle={handleToggle}
              key={question.heading + question.alternatives}
              ></FourAlternatives>
            )
          })}
        </form> 
    </div>
  )
}

export function OneQuestionMultipleChoice({formRef, children, alternatives, instruction}) {
  const questionId = getNextId()
  return (
    <>
    <Instruction>{instruction}</Instruction>
    <div className="flex gap-8 items-start p-8 w-full max-w-5xl">
      <IdBox>{questionId}</IdBox>
      <div className='border-4 rounded-2xl p-2 max-w-96 text-base'>{children}</div>
      <form ref={formRef} className='flex-1'>
        {alternatives.map((alternative) => {
          return (<OneQuestionAlternative id={questionId} key={questionId + alternative}>{alternative}</OneQuestionAlternative>)
        })}
      </form>
    </div>
    </>
  )
}

export function DragQuestion({formRef, propAlternatives, title, subtitle, paragraphs}) {
  const [alternatives, setAlternatives] = useState(Array.from(propAlternatives))
  const [draggedText, setDraggedText] = useState(null);
  let dragId = 0
  // Remover alternativas já populadas
  const [ids, setIds] = useState([])
  useEffect(() => {
      let ammountDrop = Math.floor(paragraphs.reduce((total, arr) => total + arr.length, 0)/2)
      for (let index = 0; index < ammountDrop-1; index++) {
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
          toggleSpanDisplay(span)
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

    function handleDragStart(e) {
      setDraggedText(e.active.data.current)
    }

    function handleOver(e) {
      clearSpanShadows()
      try {
        const dropElement = document.getElementById(e.over.id)
        if (dropElement) {
          dropElement.classList.add('shadow-xl','shadow-yellow-300','z-20')
          // Adicionar caso para colision.length == 2
        }
      } catch (error) {
        try {
          document.getElementById(e.collisions[1].id).classList.add('shadow-xl','shadow-yellow-300','z-20')
        } catch (error) {
        }
      }
    }
    
    function clearSpanShadows() {
      const textSpans = document.querySelectorAll('span')
      textSpans.forEach((span) => span.classList.remove('shadow-xl','shadow-yellow-300','z-20'))
    }

    function handleDragEnd (e) {
      clearSpanShadows()

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
        toggleSpanDisplay(span)

        dropPreviousContent = document.querySelector(`[id="${dropId}"]`).innerHTML 
        // Modifica o input para ter o valor do grabbedText
        document.querySelector(`[id="${dropId}"]`).textContent = grabbedText
        // Remove das alternativas o que tiver o mesmo texto
        let removeIndex = alternatives.indexOf(grabbedText)
        alternatives.splice(removeIndex,1)
        setAlternatives([...alternatives])
        // If there was already one answer in the box
        if (dropPreviousContent) {
          alternatives.push(dropPreviousContent)
          alternatives.sort((a, b) => {return propAlternatives.indexOf(a) - propAlternatives.indexOf(b)})
          setAlternatives([...alternatives])
          toggleSpanDisplay(span)
        }

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
      if (e.target.textContent != '') {
        // Change it back to inline-Block TODO: Change it to depend only on the content of the span
        const span = document.querySelector(`span[id="${e.target.id}"]`)
        toggleSpanDisplay(span)
        // Add back to alternatives
        alternatives.push(e.target.textContent)
        alternatives.sort((a, b) => {return propAlternatives.indexOf(a) - propAlternatives.indexOf(b)})
        setAlternatives([...alternatives])

        // Remove os valores
        e.target.textContent = ''
        document.querySelector(`input[name="${e.target.id}"`).value = ''
      }
}

    function getDragId() {
      return dragId++
    }

    return (
      <DndContext autoScroll={false} onDragEnd={(e) => handleDragEnd(e)} onDragStart={(e) => handleDragStart(e)} onDragOver={(e) => handleOver(e)} collisionDetection={pointerWithin} readOnly>
        <div className='grid grid-cols-2 gap-5 w-full flex-1 p-5 h-full min-h-0'>
          <div className='flex flex-col relative gap-5 overflow-y-scroll z-0'>
            <div>
              <TextTitle center={false}>{title}</TextTitle>
              <em className='text-[18px]'>{subtitle}</em>
            </div>
            <form action="" ref={formRef}>
              {paragraphs.map((paragraph, pIndex) => {
                return(
                  <OneCollumnParagraph>
                  {paragraph.map((element, eIndex) => {
                    if ((eIndex % 2) == 0) {
                      return(<span className='pr-2'>{element}</span>)
                    }
                    else {
                      return(<DropAlternative id={ids.at(getDragId())} handleclick={handleAlternativeRemoval}/>)
                    }
                  })}
                </OneCollumnParagraph>
                )
              })}
            </form>
          </div>
          <div className='flex flex-col gap-2 overflow-y-auto'>
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
            className="opacity-50 scale-100 rotate-1 bg-blue-500 text-lg text-white p-2 rounded-xl">
          {draggedText}
      </DragOverlay>
        </div>
    </DndContext>
  )
  function toggleSpanDisplay(span) {
    span.classList.toggle('inline')
    span.classList.toggle('inline-block')
  }
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
      <form ref={formRef} className='flex flex-col items-start justify-start max-w-5xl pt-5 pb-5 px-10 text-xl gap-10 overflow-y-auto'>
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
              {columns.map((column,colIndex) => (<td readonly onClick={(e) => handleTdClick(e)} data-row={rowIndex} data-column={colIndex}><input type="radio" disabled name={`${questionId}.${colIndex}`}  id="" /><img src="/check.svg" alt="check" height='30px' width='30px' className='m-auto invert'/></td>))}
            </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export function WritingTask({formRef,children}) {
  const questionId = useRef(getNextId()).current
  useEffect(() => {
    let textarea = document.querySelector('textarea')
    let localText = localStorage.getItem(`${questionId}`)
    if (localText) {
      textarea.value = localText
      let ammountSpaces = textarea.value.trim().split(/\s+/).length
      setWordCount(ammountSpaces)
    }
    else {
      setWordCount(0)
    }
    let saveLoop = setInterval(() => {
      let textarea = document.querySelector('textarea')
      localStorage.setItem(`${questionId}`,textarea.value)
    }, 15000);
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
          <textarea name={questionId} id={questionId} spellCheck="false" className='resize-none w-full h-full border-x-blue-200 border-x-2 focus:bg-blue-50 p-1' onInput={(e) => handleTextInput(e)} onKeyDown={(e) => handleKeyDown(e)}></textarea>
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
        <p className='relative mb-5 text-lg/relaxed text-justify pr-5 select-none' readOnly>{children}</p>
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