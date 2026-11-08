import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jocks, setJocks] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/jocks')
      .then(res => {
        setJocks(res.data)
      })
      .catch(err => {
        console.error("Error fetching jocks:", err)
      })
  }, [])

  return (
    <>
      <h1>Rifat test Fullstacks</h1>
      <p>Jocks: {jocks.length}</p>

      {jocks.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  )
}

export default App