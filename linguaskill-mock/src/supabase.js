import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lwxhswosqyfujmjspryh.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, 'supabaseKey ')

export async function adicionarTentativa(nomeAluno, nomeProfessor) {
    const { data, error } = await supabase
  .from('Tentativa')
  .insert([
    { nome_aluno: nomeAluno, nome_professor: nomeProfessor , versão: '1.0.1' },
  ])
  .select('id')
  .single()
  return data
}

export async function adicionarResposta(idTentativa, idQuestão, resposta,) {
    const { data, error } = await supabase
  .from('Resposta')
  .insert([
    { id_tentativa: idTentativa, resposta: resposta },
  ])
  .select('id')
  .single()
  return data
}