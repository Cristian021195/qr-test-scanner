import { useState } from "react"
import { Scanner } from './components/Scanner';

function App() {
  const [msg, setMsg] = useState<string|unknown>("");
  return (
    <>
      <h1>Escaner de precios</h1>
      <div style={{width:400, height:400}}>
        <Scanner fn={(v:string|unknown)=>setMsg(v)}/>
      </div>      
      <p>{JSON.stringify(msg)}</p>
    </>
  )
}

export default App
