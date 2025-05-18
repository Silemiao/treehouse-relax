'use client'
import React, { useState } from 'react'
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
    <main className="min-h-screen p-4 bg-gradient-to-b from-green-50 to-white">
      {/* Logo区域 */}
      <div className="flex flex-col items-center mb-8 pt-8">
        <div className="relative">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-500 hover:scale-110 transition-transform duration-300">
            树屋
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-50"></div>
        </div>
        <p className="mt-3 text-gray-500 text-sm animate-pulse">让心灵找到栖息的港湾</p>
      </div>

      {/* 搜索框 */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <span className="text-gray-400 text-xl">🔍</span>
          <input
            type="text"
            placeholder="把问题和任务告诉我"
            className="flex-1 outline-none text-gray-600 bg-transparent placeholder-gray-400"
          />
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-green-500 transition-colors">🎤</button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-green-500 transition-colors">📷</button>
          </div>
        </div>
      </div>

      {/* 功能区 */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {features.map(feature => (
          <Link 
            key={feature.id} 
            href={feature.path}
            className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-green-200 hover:-translate-y-1"
          >
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
            <h2 className="font-medium text-gray-800 mb-2 group-hover:text-green-600 transition-colors">{feature.name}</h2>
            <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">{feature.description}</p>
          </Link>
        ))}
      </div>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex justify-around p-3">
          <button className="flex flex-col items-center text-green-600 hover:scale-110 transition-transform">
            <span className="text-2xl">📚</span>
            <span className="text-xs mt-1">首页</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-green-600 hover:scale-110 transition-all">
            <span className="text-2xl">🎮</span>
            <span className="text-xs mt-1">游戏</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-green-600 hover:scale-110 transition-all">
            <span className="text-2xl">☁️</span>
            <span className="text-xs mt-1">收藏</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-green-600 hover:scale-110 transition-all">
            <span className="text-2xl">⚙️</span>
            <span className="text-xs mt-1">设置</span>
          </button>
        </div>
      </nav>
    </main>
  )
}