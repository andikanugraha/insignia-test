import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="mt-12 mb-6">
        <Image
          src="/icon_insignia.jpg"
          width="200"
          height="200"
          alt="Insignia"
        ></Image>
      </div>
      <div className="my-6 text-xl font-bold">Insignia Admin Dashboard</div>
      <div className="my-6 text-xl">Loading...</div>
    </div>
  )
}

export default Loading