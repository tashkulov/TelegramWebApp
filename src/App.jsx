import './App.css'
import {useEffect} from "react";
const tg = window.Telegram.WebApp
function App() {

    useEffect(()=>{
        tg.ready();
    },[])


    const onClose=()=>{
        tg.close()
    }
  return (
    <div>
        <button onClick={onClose}>Трахнуть меня</button>

    </div>
  )
}

export default App
