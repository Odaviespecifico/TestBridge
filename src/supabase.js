import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lwxhswosqyfujmjspryh.supabase.co'
const supabaseKey =
  import.meta.env?.VITE_SUPABASE_KEY || process.env.VITE_SUPABASE_KEY
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
  .select(`token, used, sessions (
    session_code, versão, id)`)
  .eq('token', token)
  .eq('sessions.session_code', sessionId)
  .single()
  if (session.error) {
      return { valid: false, message: "Invalid token", response: session}
  }
  if (session.data.used) {
    return { valid: false, message: "This token has already been used", response: session}
  }
  
  return { valid: true, message: "Token and Session ID are valid.", data: session.data }
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
    { nome_aluno: nomeAluno, nome_professor: nomeProfessor , versão: session.data.sessions.versão,  session_id: session.data.sessions.id, access_token: session.data.token, finalizado: false},
  ])
  .select()
  .single()
  if (error) {
    console.error("Error adding attempt:", error, "Student Name:", nomeAluno, "Teacher Name:", nomeProfessor, "Attempt ID:", attemptId, "Token:", token)
    return {data, error}
  }

  // Set token as used
  let tokenReq = await supabase
  .from('tokens')
  .update({ used: true })
  .eq('token', token)
  .select('*')
  .single()

  return {data, error,session}
}

export async function adicionarResposta(idTentativa, resposta,) {
  const { data, error } = await supabase
  .from('tentativas')
  .update([
    { respostas: resposta },
  ])
  .eq('id', idTentativa)
  .select('*')
  return {data, error}
}

export async function calcularPontuacao(idTentativa, versão) {
  const resposta = await supabase
  .from('tentativas')
  .select('respostas')
  .eq('id', idTentativa)
  .single()
  if (resposta.error) {
    console.error('Erro ao buscar respostas da tentativa:', resposta.error, "Tentativa ID:", idTentativa, "Versão:", versão)
    return null
  }

  const gabarito = await supabase
  .from('gabaritos')
  .select('respostas')
  .eq('versão', versão)
  .single()

  // Calcular a pontuação
  const score = calculateScore(resposta.data.respostas,gabarito.data.respostas)
  
  // Salvar a pontuação
  const updateScore = await supabase
  .from('tentativas')
  .update({ grade: percentageToCEFR(score.pontuação), porcentagem: score.pontuação, finalizado: true })
  .eq('id', idTentativa)
  if (updateScore.error) {
    console.error('Erro ao atualizar pontuação da tentativa:', updateScore.error, "Tentativa ID:", idTentativa, "Versão:", versão)
    return null
  }
  return {pontuação: score.pontuação, acertos: score.acertos, erros: score.erros, nivel: percentageToCEFR(score.pontuação)}
}

export function calculateScore(respostasAluno, gabarito) {
  let acertos = 0
  let erros = 0
  for (let [key, element] of Object.entries(gabarito)) {
    let opções = element.split('///')
    opções.forEach(element => {

      if (element.toUpperCase() == respostasAluno[key]?.toUpperCase()) {
        acertos++
      } 
    });
  }
  erros = Object.entries(gabarito).length - acertos
  
  return { acertos, erros, pontuação: parseFloat((acertos / (acertos + erros)).toFixed(2)) }
}

export function percentageToCEFR(score) {
if (score < 0 || score > 1) {
  return "Invalid score (must be 0–100)";
}

if (score < .20) return "A1";
if (score < .35) return "A2";
if (score < .55) return "B1";
if (score < .65) return "B2";
if (score < .75) return "C1";
if (score < .90) return "C2";
return "C2";
}


export async function getTokens() {
  const { data, error } = await supabase
  .from('tokens')
  .select('*')
  return {data, error}
}

export async function getAnswers(id) {
  const {data, error} = await supabase
  .from('tentativas')
  .select('*')
  .eq('id',id)
  .single()
  return data
}