'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'

const relaxMethods = [
  {
    id: 1,
    title: '呼吸练习',
    description: '4-7-8呼吸法：吸气4秒，屏息7秒，呼气8秒。重复4次。',
    icon: '🫁'
  },
  {
    id: 2,
    title: '渐进式肌肉放松',
    description: '从脚趾开始，依次绷紧并放松每个肌肉群，感受紧张和放松的差异。',
    icon: '💆'
  },
  {
    id: 3,
    title: '正念冥想',
    description: '找一个安静的地方，专注于呼吸，让思绪平静下来。',
    icon: '🧘'
  },
  {
    id: 4,
    title: '写写画画',
    description: '准备一本笔记本，随意涂鸦或写下心情。',
    icon: '✏️'
  },
  {
    id: 5,
    title: '音乐疗愈',
    description: '聆听舒缓的音乐，让心情随着旋律放松。',
    icon: '🎵'
  },
  {
    id: 6,
    title: '泡一杯茶',
    description: '慢慢品味一杯温热的茶，感受温暖和平静。',
    icon: '🫖'
  }
]

export default function RelaxMethods() {
  const router = useRouter()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800 p-2 -ml-2"
            >
              ← 返回
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-green-600">
              解压小方法
            </h1>
            <div className="w-10" /> {/* 占位，保持标题居中 */}
          </div>

          {/* 方法列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-2">
            {relaxMethods.map(method => (
              <div
                key={method.id}
                className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <span className="text-3xl md:text-4xl mr-3 md:mr-4">{method.icon}</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 温馨提示 */}
          <div className="mt-8 text-center text-sm md:text-base text-gray-600 px-4">
            <p className="mb-2">记住，每个人的解压方式都不同，选择最适合你的方法。</p>
            <p>如果感到持续的压力，建议寻求专业帮助。</p>
          </div>
        </div>
      </div>
    </>
  )
} 