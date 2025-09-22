import { useEffect, useRef, useState } from "react"
import { getTokens } from "./supabase"

export function Tokens() {
    let [tokens, setTokens] = useState(null)
    useEffect(() => {
        async function fetchTokens() {
            console.log('teste');
            let tokensTemp = await getTokens()
            console.log(tokensTemp)
            setTokens(tokensTemp)
            console.log(tokens);
        }
        fetchTokens();
    }, []);
    return(
        <>
        <div>Teste</div>
        <div className="overflow-x-auto print:overflow-visible">
        <table className="overflow-auto">
            <thead>
            <tr>
                <th>teste</th>
                <th>teste</th>
                <th>teste</th>
            </tr>
            </thead>
            <tbody className="overflow-auto">
            {tokens ? tokens.data.map((token) => {
                return(
                    <tr>
                        <td className="select-all">{token.token}</td>
                        <td>{token.session_code}</td>
                        <td>{token.used ? 'Usado': 'Disponível'}</td>
                    </tr>
                )
            }): <p>Carregando</p>}
            </tbody>
        </table>
        </div>
        </>
    )
}