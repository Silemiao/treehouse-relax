'use client'
import React, { useState } from 'react'

interface Bubble {
  id: number
  x: number
  y: number
}

export default function PopBubble() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [score, setScore] = useState(0)

  const createBubble = () => {
    const newBubble: Bubble = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100)
    }
    setBubbles([...bubbles, newBubble])
  }

  const popBubble = (id: number) => {
    setBubbles(bubbles.filter(bubble => bubble.id !== id))
    setScore(score + 1)
  }

  return (
    <div className="relative w-full h-[500px] bg-blue-50 rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full shadow-md">
        得分: {score}
      </div>
      <button
        onClick={createBubble}
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        添加气泡
      </button>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          onClick={() => popBubble(bubble.id)}
          className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 cursor-pointer transform hover:scale-110 transition-transform animate-bounce"
          style={{
            left: bubble.x,
            top: bubble.y
          }}
        />
      ))}
    </div>
  )
} 