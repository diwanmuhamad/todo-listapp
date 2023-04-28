import { useState } from 'react'
import { Navbar, MainMenu } from './component'
import './App.css'

function App() {
  
  return (
    <>
      <div className='app'>
        <Navbar title="TO DO LIST APP" />
        <MainMenu/>
      </div>
    </>
  )
}

export default App
