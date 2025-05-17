'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Head from 'next/head'

// 示例找茬数据
const spotDifferenceData = [
  {
    id: 1,
    title: '树屋的秘密',
    originalImage: '/images/spot-diff/scene1-original.jpg',
    modifiedImage: '/images/spot-diff/scene1-modified.jpg',
    differences: [
      { x: 100, y: 150, radius: 20 },
      { x: 300, y: 200, radius: 20 },
      // 添加更多差异点
    ]
  }
  // 添加更多场景
]

export default function SpotDifference() {
  const router = useRouter()
  const [currentScene, setCurrentScene] = useState(0)
  const [foundDifferences, setFoundDifferences] = useState<number[]>([])
  const [showHint, setShowHint] = useState(false)

  const handleClick = (image: 'original' | 'modified', x: number, y: number) => {
    const scene = spotDifferenceData[currentScene]
    const clickedDifference = scene.differences.findIndex(diff => {
      const distance = Math.sqrt(Math.pow(diff.x - x, 2) + Math.pow(diff.y - y, 2))
      return distance <= diff.radius
    })

    if (clickedDifference !== -1 && !foundDifferences.includes(clickedDifference)) {
      setFoundDifferences([...foundDifferences, clickedDifference])
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800 p-2 -ml-2"
            >
              ← 返回
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-purple-600">
              找出不同之处
            </h1>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-purple-600 hover:text-purple-700 p-2 -mr-2"
            >
              提示
            </button>
          </div>

          {/* 游戏区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg shadow-lg overflow-hidden">
                {/* 原始图片 */}
                <Image
                  src={spotDifferenceData[currentScene].originalImage}
                  alt="原始图片"
                  layout="fill"
                  objectFit="contain"
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    handleClick('original', e.clientX - rect.left, e.clientY - rect.top)
                  }}
                />
                {showHint && foundDifferences.map(index => (
                  <div
                    key={`original-${index}`}
                    className="absolute w-6 md:w-8 h-6 md:h-8 border-2 border-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: spotDifferenceData[currentScene].differences[index].x,
                      top: spotDifferenceData[currentScene].differences[index].y
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg shadow-lg overflow-hidden">
                {/* 修改后的图片 */}
                <Image
                  src={spotDifferenceData[currentScene].modifiedImage}
                  alt="修改后的图片"
                  layout="fill"
                  objectFit="contain"
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    handleClick('modified', e.clientX - rect.left, e.clientY - rect.top)
                  }}
                />
                {showHint && foundDifferences.map(index => (
                  <div
                    key={`modified-${index}`}
                    className="absolute w-6 md:w-8 h-6 md:h-8 border-2 border-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: spotDifferenceData[currentScene].differences[index].x,
                      top: spotDifferenceData[currentScene].differences[index].y
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 进度显示 */}
          <div className="mt-4 text-center">
            <div className="text-lg text-purple-600">
              已找到 {foundDifferences.length} / {spotDifferenceData[currentScene].differences.length} 处不同
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 