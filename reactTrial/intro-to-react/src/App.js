import React, { useState } from 'react'
import Child from './Child.jsx'

function App() {
  const [input, setInput] = useState("")

  return (
    <div className="App">
      <h1>App Component</h1>
      <h3>User Input: {input}</h3>
      <input
        type="text"
        placeholder="Type Something Cool"
        onChange={(e) => setInput(e.target.value)} />
      <Child userInput={input} />
    </div>
  )
}

export default App
