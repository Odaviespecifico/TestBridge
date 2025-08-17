import {InlineOpen, InlineClosed} from './Alternatives.jsx'

export function OneCollumnQuestion({formRef}) {
  let idCount = 0
  function incrementId() {
    idCount++
    console.log(localStorage.getItem(idCount))
    return idCount
  }  
  function inputValue(id) {
    console.log(localStorage.getItem(id))
  }
  return (
    <div className="flex flex-col gap-10 px-6 w-full max-w-5xl flex-1" >
        <h1 className="font-bold text-2xl text-center">Teste</h1>
        <form id='formQuestion' ref={formRef} className='mb-3 text-xl'> I've read the same weekend newspaper for years. I make sure I manage to read it every week, or I feel out of touch. I started reading my favourite paper a couple of years <InlineOpen id={incrementId()}/>. <InlineOpen id={incrementId()}/> 
        I agree with many things in it, the paper also challenges me. It makes me look at things in <InlineOpen id={incrementId()}/> 
        different way. I usually find the reviews interesting - but I must admit some weeks I can't bear them as they've <InlineOpen id={incrementId()}/> 
        written in a very sarcastic style. The regular writers have made me shake my head with anger too, on occasions, or smile <InlineOpen id={incrementId()}/> 
        complete agreement. I've even posted comments on the site - something I thought I'd never do.
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