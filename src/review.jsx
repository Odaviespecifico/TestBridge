import { useEffect, useState } from "react";
import { getAnswers } from "./supabase";

export function ReviewQuestions({ gabarito}) {
  let [acertos, setAcertos] = useState(0)
  let [erros, seterros] = useState(0)
  let [name, setName] = useState('loading')
  let [results, setResults] = useState('carregando')
  useEffect(() => {
    let id = prompt('Digite o id')
    async function getData(ìd) {
        let data = await getAnswers(id)
        setResults(Object.keys(gabarito).map((key) => {
            const isCorrect =
            gabarito[key].toUpperCase() === data.respostas[key].toUpperCase();

            if (isCorrect) setAcertos((prev) => prev+1);
            else seterros((prev) => prev+1);

            return (
            <span
                key={key}
                className={`font-bold text-lg block border-2 p-1 print:text-[12px] ${
                isCorrect ? "text-green-700" : "text-red-700"
                }`}
            >
                {key + " - " + data.respostas[key]}
            </span>
            );
        }))
        setName(data.nome_aluno)
    }
    getData(id)
  },[])
  
  return (
    <>
      <h1 className="text-2xl font-bold -mb-2 px-5 text-center">{name}</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-1 p-5 gap-1.5 print:flex print:flex-wrap">
        {results}
      </div>
      <h1 className="text-xl font-bold px-5">Correct: {acertos}</h1>
      <h1 className="text-xl font-bold px-5">Incorrect: {erros}</h1>
      <h1 className="text-xl font-bold px-5">
        Accuracy: {((acertos / (acertos + erros)) * 100).toFixed(1) + "%"}
      </h1>
    </>
  );
}