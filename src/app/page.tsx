'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const features = [
  {
    id: 'spot-difference',
    name: '趣味找茬',
    icon: '🔍',
    path: '/games/spot-difference',
    description: '考验眼力的趣味小游戏'
  },
  {
    id: '2048',
    name: '2048解压',
    icon: '🎮',
    path: '/games/2048',
    description: '经典数字游戏，支持存档和作弊模式'
  },
  {
    id: 'find-cat',
    name: '寻找小猫',
    icon: '🐱',
    path: '/games/find-cat',
    description: '在图片中寻找可爱的小猫咪'
  },
  {
    id: 'relax-methods',
    name: '解压方法',
    icon: '🌿',
    path: '/relax-methods',
    description: '收集整理的实用解压方法'
  }
]

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      {/* Logo区域 */}
      <div className="flex justify-center mb-8 pt-8">
        <h1 className="text-4xl font-bold text-green-600 animate-bounce">
          树屋
        </h1>
      </div>

      {/* 搜索框 */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white rounded-full shadow-lg p-4 flex items-center gap-4">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="搜索解压游戏和方法..."
            className="flex-1 outline-none text-gray-600"
          />
          <button className="w-8 h-8 flex items-center justify-center text-gray-400">
            🎯
          </button>
        </div>
      </div>

      {/* 功能区 */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map(feature => (
          <Link 
            key={feature.id} 
            href={feature.path}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <h2 className="font-medium text-gray-800 mb-1">{feature.name}</h2>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </Link>
        ))}
      </div>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-4xl mx-auto flex justify-around p-3">
          <button className="flex flex-col items-center text-green-600">
            <span className="text-xl">📚</span>
            <span className="text-xs">首页</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <span className="text-xl">🎮</span>
            <span className="text-xs">游戏</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <span className="text-xl">☁️</span>
            <span className="text-xs">收藏</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <span className="text-xl">⚙️</span>
            <span className="text-xs">设置</span>
          </button>
        </div>
      </nav>
    </main>
  )
} 