'use client'
import React, { useState, useEffect, TouchEvent } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'

interface Tile {
  value: number
  id: string
  position: [number, number]
}

interface TouchPosition {
  x: number
  y: number
}

export default function Game2048() {
  const router = useRouter()
  const [grid, setGrid] = useState<Tile[]>([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [cheatMode, setCheatMode] = useState(false)
  const [selectedTile, setSelectedTile] = useState<string | null>(null)
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null)

  // 初始化游戏
  useEffect(() => {
    const savedHighScore = localStorage.getItem('2048_high_score')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore))
    }
    initGame()
  }, [])

  // 处理触摸开始
  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY
    })
  }

  // 处理触摸结束
  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStart) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y

    // 判断滑动方向
    if (Math.abs(deltaX) > 30 || Math.abs(deltaY) > 30) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        handleMove(deltaX > 0 ? 'right' : 'left')
      } else {
        handleMove(deltaY > 0 ? 'down' : 'up')
      }
    }

    setTouchStart(null)
  }

  // 防止移动端缩放
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault()
    document.addEventListener('touchmove', preventDefault, { passive: false })
    return () => document.removeEventListener('touchmove', preventDefault)
  }, [])

  // 初始化游戏板
  const initGame = () => {
    const newGrid: Tile[] = []
    addNewTile(newGrid)
    addNewTile(newGrid)
    setGrid(newGrid)
    setScore(0)
  }

  // 添加新方块
  const addNewTile = (currentGrid: Tile[]) => {
    const emptyPositions: [number, number][] = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (!currentGrid.some(tile => tile.position[0] === i && tile.position[1] === j)) {
          emptyPositions.push([i, j])
        }
      }
    }
    if (emptyPositions.length > 0) {
      const position = emptyPositions[Math.floor(Math.random() * emptyPositions.length)]
      currentGrid.push({
        value: Math.random() < 0.9 ? 2 : 4,
        id: Date.now().toString(),
        position
      })
    }
  }

  // 处理方块移动
  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    // 实现方块移动逻辑
    // ...（这里需要实现具体的移动和合并逻辑）
  }

  // 处理作弊模式删除方块
  const handleTileClick = (tileId: string) => {
    if (cheatMode && selectedTile === tileId) {
      setGrid(grid.filter(tile => tile.id !== tileId))
      setSelectedTile(null)
    } else if (cheatMode) {
      setSelectedTile(tileId)
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div 
        className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-md mx-auto">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800 p-2 -ml-2"
            >
              ← 返回
            </button>
            <div className="text-right">
              <div className="text-sm text-gray-600">最高分: {highScore}</div>
              <div className="text-lg font-bold text-orange-600">得分: {score}</div>
            </div>
          </div>

          {/* 游戏控制 */}
          <div className="flex justify-between mb-4 gap-2">
            <button
              onClick={initGame}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex-1"
            >
              重新开始
            </button>
            <button
              onClick={() => setCheatMode(!cheatMode)}
              className={`px-4 py-2 rounded-lg flex-1 ${
                cheatMode ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {cheatMode ? '退出作弊' : '作弊模式'}
            </button>
          </div>

          {/* 游戏板 */}
          <div className="bg-orange-100 p-4 rounded-xl">
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, index) => {
                const tile = grid.find(
                  t => t.position[0] === Math.floor(index / 4) && t.position[1] === index % 4
                )
                return (
                  <div
                    key={index}
                    onClick={() => tile && handleTileClick(tile.id)}
                    className={`aspect-square rounded-lg flex items-center justify-center font-bold text-xl
                      ${tile ? 'bg-orange-300' : 'bg-orange-200'} 
                      ${cheatMode && tile && selectedTile === tile.id ? 'ring-2 ring-red-500' : ''}
                      ${cheatMode && tile ? 'cursor-pointer hover:opacity-90' : ''}`}
                  >
                    {tile?.value}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 操作说明 */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p className="mb-1">滑动屏幕或使用方向键移动方块</p>
            {cheatMode && <p className="text-red-500">点击方块两次删除它</p>}
          </div>
        </div>
      </div>
    </>
  )
} 