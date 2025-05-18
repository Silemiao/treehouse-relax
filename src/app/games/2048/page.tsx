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

// 获取方块颜色
const getTileColor = (value: number): string => {
  switch (value) {
    case 2:
      return 'bg-yellow-100 text-gray-700';
    case 4:
      return 'bg-yellow-200 text-gray-700';
    case 8:
      return 'bg-orange-300 text-white';
    case 16:
      return 'bg-orange-400 text-white';
    case 32:
      return 'bg-orange-500 text-white';
    case 64:
      return 'bg-orange-600 text-white';
    case 128:
      return 'bg-yellow-400 text-white';
    case 256:
      return 'bg-yellow-500 text-white';
    case 512:
      return 'bg-green-500 text-white';
    case 1024:
      return 'bg-green-600 text-white';
    case 2048:
      return 'bg-blue-600 text-white';
    default:
      return 'bg-blue-700 text-white';
  }
};

export default function Game2048() {
  const router = useRouter()
  const [grid, setGrid] = useState<Tile[]>([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [cheatMode, setCheatMode] = useState(false)
  const [selectedTile, setSelectedTile] = useState<string | null>(null)
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null)
  const [gameOver, setGameOver] = useState(false)

  // 初始化游戏
  useEffect(() => {
    const savedHighScore = localStorage.getItem('2048_high_score')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore))
    }
    initGame()
  }, [])

  // 更新最高分
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('2048_high_score', score.toString())
    }
  }, [score, highScore])

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
    const minSwipeDistance = 50

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
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
    setGameOver(false)
    setSelectedTile(null)
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
        id: Date.now().toString() + Math.random(),
        position
      })
    }
  }

  // 检查游戏是否结束
  const checkGameOver = (currentGrid: Tile[]): boolean => {
    // 检查是否有空位
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (!currentGrid.some(tile => tile.position[0] === i && tile.position[1] === j)) {
          return false
        }
      }
    }

    // 检查是否有相邻的相同数字
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const currentTile = currentGrid.find(tile => tile.position[0] === i && tile.position[1] === j)
        if (currentTile) {
          // 检查右边
          if (j < 3) {
            const rightTile = currentGrid.find(tile => tile.position[0] === i && tile.position[1] === j + 1)
            if (rightTile && rightTile.value === currentTile.value) return false
          }
          // 检查下边
          if (i < 3) {
            const bottomTile = currentGrid.find(tile => tile.position[0] === i + 1 && tile.position[1] === j)
            if (bottomTile && bottomTile.value === currentTile.value) return false
          }
        }
      }
    }

    return true
  }

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return
      
      switch (e.key) {
        case 'ArrowUp':
          handleMove('up')
          break
        case 'ArrowDown':
          handleMove('down')
          break
        case 'ArrowLeft':
          handleMove('left')
          break
        case 'ArrowRight':
          handleMove('right')
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameOver])

  // 处理方块移动
  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return

    setGrid(prevGrid => {
      let newGrid = [...prevGrid]
      let moved = false
      let newScore = score

      // 获取一行或一列的方块
      const getLine = (index: number): Tile[] => {
        if (direction === 'up' || direction === 'down') {
          return newGrid
            .filter(tile => tile.position[1] === index)
            .sort((a, b) => direction === 'up' ? a.position[0] - b.position[0] : b.position[0] - a.position[0])
        } else {
          return newGrid
            .filter(tile => tile.position[0] === index)
            .sort((a, b) => direction === 'left' ? a.position[1] - b.position[1] : b.position[1] - a.position[1])
        }
      }

      // 合并相同数值的方块
      const mergeLine = (line: Tile[]): Tile[] => {
        const merged: Tile[] = []
        let i = 0
        while (i < line.length) {
          if (i + 1 < line.length && line[i].value === line[i + 1].value) {
            const newValue = line[i].value * 2
            merged.push({
              value: newValue,
              id: Date.now().toString() + Math.random(),
              position: line[i].position
            })
            newScore += newValue
            i += 2
            moved = true
          } else {
            merged.push(line[i])
            i += 1
          }
        }
        return merged
      }

      // 填充空位
      const fillLine = (line: Tile[], index: number): Tile[] => {
        const newLine: Tile[] = []
        line.forEach((tile, i) => {
          const newPosition: [number, number] = direction === 'up' || direction === 'down'
            ? [direction === 'up' ? i : 3 - i, index]
            : [index, direction === 'left' ? i : 3 - i]
          newLine.push({ ...tile, position: newPosition })
        })
        return newLine
      }

      // 处理每一行或列
      for (let i = 0; i < 4; i++) {
        const line = getLine(i)
        if (line.length > 0) {
          const mergedLine = mergeLine(line)
          const filledLine = fillLine(mergedLine, i)
          newGrid = newGrid.filter(tile => !line.some(t => t.id === tile.id))
          newGrid.push(...filledLine)
          if (line.length !== filledLine.length) moved = true
        }
      }

      if (moved) {
        addNewTile(newGrid)
        setScore(newScore)
        
        // 检查游戏是否结束
        if (checkGameOver(newGrid)) {
          setGameOver(true)
          setTimeout(() => {
            alert(`游戏结束！最终得分：${newScore}`)
          }, 100)
        }
      }

      return newGrid
    })
  }

  // 处理作弊模式删除方块
  const handleTileClick = (tileId: string) => {
    if (!cheatMode || gameOver) return

    if (selectedTile === tileId) {
      setGrid(prev => {
        const selectedTileData = prev.find(tile => tile.id === tileId)
        if (!selectedTileData) return prev

        // 从分数中减去被删除方块的值
        setScore(currentScore => Math.max(0, currentScore - selectedTileData.value))

        const newGrid = prev.filter(tile => tile.id !== tileId)
        // 确保游戏板上始终有方块
        if (newGrid.length === 0) {
          addNewTile(newGrid)
        } else if (Math.random() < 0.3) { // 30%概率添加新方块
          addNewTile(newGrid)
        }
        return newGrid
      })
      setSelectedTile(null)
    } else {
      setSelectedTile(tileId)
    }
  }

  return (
    <>
      <Head>
        <title>2048 - 树屋解压</title>
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
              className={`px-4 py-2 rounded-lg flex-1 ${cheatMode ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {cheatMode ? '退出作弊' : '作弊模式'}
            </button>
          </div>

          {/* 分数显示区 */}
          <div className="max-w-md mx-auto mb-4 flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
            <div>
              <p className="text-gray-500 text-sm">当前分数</p>
              <p className="text-2xl font-bold text-green-600">{score}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">最高分数</p>
              <p className="text-2xl font-bold text-blue-600">{highScore}</p>
            </div>
          </div>

          {/* 游戏区域 */}
          <div className="relative w-full max-w-md mx-auto aspect-square bg-white/80 backdrop-blur-sm rounded-xl p-2 mb-4 shadow-lg">
            {grid.map(tile => (
              <div
                key={tile.id}
                className={`absolute w-1/4 h-1/4 p-1 transition-all duration-100 
                  ${cheatMode ? 'cursor-pointer hover:scale-105' : ''}
                  ${cheatMode && selectedTile === tile.id ? 'ring-2 ring-red-500' : ''}`}
                style={{
                  transform: `translate(${tile.position[1] * 100}%, ${tile.position[0] * 100}%)`
                }}
                onClick={() => handleTileClick(tile.id)}
              >
                <div
                  className={`w-full h-full flex items-center justify-center
                    rounded-lg text-2xl font-bold shadow-md
                    ${getTileColor(tile.value)}
                    transition-all duration-200 
                    ${cheatMode ? 'hover:opacity-75' : ''}`}
                >
                  {tile.value}
                </div>
              </div>
            ))}
          </div>

          {/* 游戏状态提示 */}
          <div className="max-w-md mx-auto text-center text-gray-500 text-sm">
            {gameOver ? (
              <p className="text-red-500 font-bold">游戏结束！点击"重新开始"继续游戏</p>
            ) : (
              <>
                <p>使用方向键或滑动屏幕移动方块</p>
                {cheatMode && <p className="mt-1 text-green-500">点击方块两次将其消除</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

