import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lwxhswosqyfujmjspryh.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function adicionarTentativa(nomeAluno, nomeProfessor, attemptId) {
    const { data, error } = await supabase
  .from('Tentativa')
  .insert([
    { nome_aluno: nomeAluno, nome_professor: nomeProfessor , versão: '1.0.1',  session_id: attemptId},
  ])
  .select('id')
  .single()
  return {data, error}
}

export async function adicionarResposta(idTentativa, resposta,) {
  const { data, error } = await supabase
  .from('resposta')
  .insert([
    { tentativa: idTentativa, respostas: resposta },
  ])
  .select('*')
  return {data, error}
}

export async function verificarresposta(idTentativa) {
  const { data, error } = await supabase
  .from('resposta')
  .select('*')
  .eq('tentativa', idTentativa)
  return {data, error}
}