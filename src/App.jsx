import './App.css'
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram.js";
import Header from "./components/Header/Header.jsx";
function App() {
    const {onToggleButton,tg}=useTelegram();
    useEffect(()=>{
        tg.ready();
    },[])



  return (
    <div>
        <Header/>
        <button onClick={onToggleButton}>Трахнуть меня</button>

    </div>
  )
}

export default App
