import {InlineOpen, InlineClosed, FourAlternatives, RadioTableInput, IdBox, OneQuestionAlternative} from './Alternatives.jsx'

export function OneCollumnQuestion({formRef}) {
  let idCount = 0
  
  function incrementId() {
    idCount++
    return idCount
}  
  return (
    <div className="flex flex-col gap-10 px-6 w-full max-w-5xl flex-1 mt-5" >
        <TextTitle>Question Title</TextTitle>
        <form id='formQuestion' ref={formRef} className='mb-3 text-xl'> With this kind of question you can have inline opens <InlineOpen id={incrementId()}></InlineOpen>
        or inline closed <InlineClosed id={incrementId()} alternatives={['You','have to', 'pass the alternatives','as a array prop']}></InlineClosed>
        </form>
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
    <div className="flex gap-8 items-start p-8 w-full h-full">
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

// Small components
function OneCollumnParagraph() {
    return(
        <p className='mb-3 text-xl'></p>
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

