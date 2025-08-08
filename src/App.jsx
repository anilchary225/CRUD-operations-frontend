import { useState } from 'react'

import './App.css'
import Student from './pages/student'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Student/>
  )
}

export default App
