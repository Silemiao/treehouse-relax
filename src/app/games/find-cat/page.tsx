'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Head from 'next/head'

// 示例场景数据
const scenes = [
  {
    id: 1,
    title: '温馨树屋',
    image: '/images/find-cat/scene1.jpg',
    cat: { x: 250, y: 300, radius: 30 },
    hint: '看看那个舒适的角落...'
  }
  // 添加更多场景
]

export default function FindCat() {
  const router = useRouter()
  const [currentScene, setCurrentScene] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [found, setFound] = useState(false)
  const [clicks, setClicks] = useState<{ x: number; y: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const scene = scenes[currentScene]
    const distance = Math.sqrt(
      Math.pow(scene.cat.x - x, 2) + Math.pow(scene.cat.y - y, 2)
    )

    setClicks([...clicks, { x, y }])

    if (distance <= scene.cat.radius) {
      setFound(true)
    }
  }

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1)
      setFound(false)
      setClicks([])
      setShowHint(false)
    } else {
      setCurrentScene(0)
      setFound(false)
      setClicks([])
      setShowHint(false)
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800 p-2 -ml-2"
            >
              ← 返回
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-green-600">
              寻找躲猫猫的小猫
            </h1>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-green-600 hover:text-green-700 p-2 -mr-2"
            >
              提示
            </button>
          </div>

          {/* 游戏区域 */}
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
            <div
              className="relative aspect-w-16 aspect-h-9 cursor-crosshair"
              onClick={handleClick}
            >
              <Image
                src={scenes[currentScene].image}
                alt="寻找小猫场景"
                layout="fill"
                objectFit="contain"
                priority
              />
              {/* 显示点击位置 */}
              {clicks.map((click, index) => (
                <div
                  key={index}
                  className="absolute w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: click.x, top: click.y }}
                />
              ))}
              {/* 找到后显示小猫位置 */}
              {found && (
                <div
                  className="absolute w-6 h-6 md:w-8 md:h-8 border-4 border-green-500 rounded-full animate-pulse transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: scenes[currentScene].cat.x,
                    top: scenes[currentScene].cat.y
                  }}
                />
              )}
            </div>
          </div>

          {/* 提示和状态 */}
          <div className="mt-4 text-center px-4">
            {showHint && (
              <p className="text-green-600 mb-2 text-sm md:text-base">{scenes[currentScene].hint}</p>
            )}
            {found && (
              <div className="space-y-2">
                <p className="text-lg md:text-xl text-green-600 font-bold">
                  太棒了！你找到了小猫！
                </p>
                {currentScene < scenes.length - 1 && (
                  <button
                    onClick={nextScene}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    下一关
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}