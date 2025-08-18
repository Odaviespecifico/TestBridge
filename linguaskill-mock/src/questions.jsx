import {InlineOpen, InlineClosed, FourAlternatives, RadioTableInput, IdBox, OneQuestionAlternative} from './Alternatives.jsx'
import {DndContext} from '@dnd-kit/core';
import {useDroppable} from '@dnd-kit/core';
import {useDraggable} from '@dnd-kit/core';

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
    return (
      <DndContext>
      <div className="grid grid-cols-2 gap-5 w-full flex-1 p-5 max-h-10/12">
        <div className='flex flex-col gap-5 overflow-y-scroll'>
          <div>
            <TextTitle center={false}>Question Title</TextTitle>
            <em className='text-[18px]'>Sub-title</em>
          </div>
          <OneCollumnParagraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
          <OneCollumnParagraph>Lorem ipsum dolor sit amet, <DropAlternative></DropAlternative>consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
          <OneCollumnParagraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus veniam ipsum sint necessitatibus blanditiis voluptate aperiam illo. Qui voluptate similique omnis aliquid, minus veritatis ratione error beatae ex repellendus quas?</OneCollumnParagraph>
        </div>
        <form id='formQuestion' ref={formRef} className='p-5 overflow-y-auto'>
          <DragAlternative>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nam, quaerat quae praesentium aspernatur animi numquam aliquam dolorum fugiat. Nulla quasi consequuntur sint quos, repudiandae odit maxime eum! Dolor, doloremque!</DragAlternative>
        </form> 
      </div>
    </DndContext>
  )
}
// Small components
function OneCollumnParagraph({children}) {
    return(
        <p className='mb-3 text-lg'>{children}</p>
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

function DragAlternative({children}) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  return (
    <div ref={setNodeRef} className="w-full bg-blue-500 text-lg text-white p-2">
      {children}
    </div>
  )
}

function DropAlternative() {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return(
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      texting
    </button>
  );

  // <span className="group inline-flex gap-1 items-center">
  //     <IdBox>66</IdBox>
  //     <input
  //       className="h-9 bg-blue-100 min-w-40 outline-0 border-2 font-base border-white box-border group-has-focus:bg-white focus:border-blue-500 text-center"
  //       type="text"
  //       name={66}
  //       readOnly
  //     />
  //   </span>
}