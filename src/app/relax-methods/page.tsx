'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'

const relaxMethods = [
  {
    id: 1,
    title: '深呼吸练习',
    description: '4-7-8呼吸法：吸气4秒，屏息7秒，呼气8秒。每天练习4次，帮助平静心情。',
    icon: '🫁',
    link: 'https://www.zhihu.com/question/20215728'
  },
  {
    id: 2,
    title: '渐进式肌肉放松',
    description: '从脚趾开始，依次绷紧并放松每个肌肉群，感受紧张和放松的差异。建议晚上练习，有助于睡眠。',
    icon: '💆',
    link: 'https://www.bilibili.com/video/BV1FW411y7R3/'
  },
  {
    id: 3,
    title: '正念冥想',
    description: '每天固定时间进行5-10分钟的冥想，专注呼吸，不评判任何想法，让思绪自然流动。',
    icon: '🧘',
    link: 'https://www.headspace.com/meditation/basics'
  },
  {
    id: 4,
    title: '情绪日记',
    description: '记录每天的心情和想法，写下困扰你的事情，也写下让你开心的小事。通过写作整理思绪。',
    icon: '✏️',
    link: 'https://www.xiaohongshu.com/explore/63c4e2b1000000001f00a9e9'
  },
  {
    id: 5,
    title: '音乐疗愈',
    description: '选择舒缓的音乐或大自然声音，闭上眼睛，让心情随着旋律放松。推荐：雨声、海浪声、森林声。',
    icon: '🎵',
    link: 'https://www.calm.com/music'
  },
  {
    id: 6,
    title: '茶道放松',
    description: '泡一杯温热的茶，专注于茶的香气和温度，感受当下的宁静。推荐：洋甘菊茶、薰衣草茶。',
    icon: '🫖',
    link: 'https://www.xiaohongshu.com/explore/6389f31e000000001f027b85'
  },
  {
    id: 7,
    title: '户外散步',
    description: '选择绿化好的路线散步15-20分钟，呼吸新鲜空气，观察周围的自然景色，让心情放松。',
    icon: '🚶',
    link: 'https://www.zhihu.com/question/319048339'
  },
  {
    id: 8,
    title: '艺术创作',
    description: '尝试简单的绘画、折纸或手工艺品制作，专注于创作过程，暂时忘记烦恼。',
    icon: '🎨',
    link: 'https://www.xiaohongshu.com/explore/63f3421e000000001300dcf5'
  }
]

export default function RelaxMethods() {
  const router = useRouter()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
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
              <a
                key={method.id}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-1"
              >
                <div className="flex items-start">
                  <span className="text-3xl md:text-4xl mr-3 md:mr-4 group-hover:scale-110 transition-transform duration-300">{method.icon}</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2 group-hover:text-green-600 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700">
                      {method.description}
                    </p>
                  </div>
                </div>
              </a>
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