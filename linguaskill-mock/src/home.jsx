export function Home() {
  return (
    <div className="max-w-svw w-svw h-screen box-border overflow-x-hidden backdrop-blur-sm">
      <Header></Header>
      <Hero></Hero>
      <Items>
        <CardItem title={'Testes Autênticos'}
        text={'Seus alunos terão a experiência real da prova do Linguaskill, com os mesmos tipos de questão e interface oficial, garantindo uma preparação fiel ao exame.'} src={'https://img.icons8.com/bubbles/100/design.png'}/>
        <CardItem title={'Resultados imediatos'}
        text={'Ao finalizar o simulado, os alunos recebem seus resultados instantaneamente, com feedback imediato sobre sua performance.'} src={'src\\assets\\iconBolt.png'}/>
        <CardItem title={'Baseado no CEFR'}
        text={'Simulados com níveis adaptativos (A1–C1), garantindo que cada aluno seja avaliado de acordo com seu nível real de inglês.'} src={'https://img.icons8.com/bubbles/100/goal.png'}/>
      </Items>
    </div>
  );
}

function Hero(params) {
  return (
    <div className="w-svw text-center bg-[url(src\\assets\\blob-scene-haikei.svg)] bg-no-repeat bg-fixed animate-scaleDown">
      <div className="flex flex-col justify-center items-center h-full  p-40">
        <img src="src\\assets\\TestBridgeText.svg" alt="" className=""/>
        <p className="text-4xl font-bold px-12">A plataforma que prepara os seus alunos para o Linguaskill</p>
      </div>
    </div>
  );
}

function Header(params) {
  return (
    <div className="flex h-16 px-5 sticky top-0 z-10 bg-neutral-100 w-svw shadow-2xl">
      <img src="src\\assets\\testBridgeLogoText.svg" alt="" height={40}/>
      <div className="flex items-center gap-6 justify-end w-full px-5">
        <div className="flex gap-4 items-center">
          <button className="bg-neutral-200 transition-all p-1 px-2 rounded-3xl">
            Sobre
          </button>
          <button className="hover:bg-neutral-200 transition-all p-1 px-2 rounded-3xl">
            Preço
          </button>
          <button className="hover:bg-neutral-200 transition-all p-1 px-2 rounded-3xl">
            FAQ
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <button className="bg-amber-400 font-bold p-1 px-2 rounded-3xl hover:bg-amber-500 transition-all">
            Agende uma demonstração
          </button>
        </div>
      </div>
    </div>
  );
}

function Items({children}) {
    return(
        <section className="flex w-svw px-48 py-16 justify-evenly gap-5 bg-amber-50/10">
            {children}
        </section>
    )
}

function CardItem({src, title, text}) {
    return(
        <div className="text-xl flex flex-col max-w-56 text-center items-center border-2 p-4 backdrop-blur-md border-neutral-100 rounded-4xl shadow-2xs hover:scale-110 transition-all">
            <img src={src} alt="" height={100} width={100}/>
            <h1 className="font-bold mb-5">{title}</h1>
            <p className="text-base">{text}</p>
        </div>
    )
}