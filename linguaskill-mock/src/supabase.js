import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lwxhswosqyfujmjspryh.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function verificarSessão(sessionId) {
  const { data, error } = await supabase  
  .from('sessions')
  .select('*')
  .eq('session_code', sessionId)
  .single()
  return {data, error}
}
export async function verificarToken(token,sessionId) {
  const session = await supabase
  .from('tokens')
  .select(`token, sessions (
    session_code, versão, id)`)
  .eq('token', token)
  .eq('sessions.session_code', sessionId)
  .single()
  if (session.error) {
    if (session.error.code === 'PGRST116') {
      return { valid: false, message: "Token ou Session ID inválido." }
    }
  }
  else {
    return { valid: true, message: "Token e Session ID válidos.", data: session.data }
  }
}
export async function adicionarTentativa(nomeAluno, nomeProfessor, attemptId, token) {
  const session = await supabase
  .from('tokens')
  .select(`token, sessions (
    session_code, versão, id)`)
  .eq('token', token)
  .single()

  const { data, error } = await supabase
  .from('tentativas')
  .insert([
    { nome_aluno: nomeAluno, nome_professor: nomeProfessor , versão: session.data.sessions.versão,  session_id: session.data.sessions.id, access_token: session.data.token, valido: true},
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

export async function calcularPontuacao(idTentativa, versão) {
  const resposta = await supabase
  .from('resposta')
  .select('respostas')
  .eq('tentativa', idTentativa)
  .single()
  if (resposta.error) {
    console.error('Erro ao buscar respostas da tentativa:', resposta.error, "Tentativa ID:", idTentativa, "Versão:", versão)
    return null
  }
  const gabarito = await supabase
  .from('gabarito')
  .select('respostas')
  .eq('versão', versão)
  .single()

  // Calcular a pontuação
  let respostasAluno = Object.entries(resposta.data.respostas)
  let acertos = 0
  let erros = 0
  for (let [key, element] of respostasAluno) {
    if (element === gabarito.data.respostas[key]) {
      acertos++
    }
    else {
      erros++
    }
  }
  let pontuação = (acertos/(acertos + erros)).toFixed(2)
  
  return {pontuação: pontuação, acertos: acertos, erros: erros, nivel: percentageToCEFR(pontuação)}
}

function percentageToCEFR(score) {
if (score < 0 || score > 1) {
  return "Invalid score (must be 0–100)";
}

if (score <= .25) return "A1";
if (score <= .40) return "A2";
if (score <= .60) return "B1";
if (score <= .90) return "B2";
return "C1";
}