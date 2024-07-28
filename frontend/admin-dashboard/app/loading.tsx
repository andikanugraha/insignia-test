import Image from 'next/image'
import React from 'react'
import { Atom, ThreeDot } from 'react-loading-indicators'
import { PropagateLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="min-h-screen w-full h-full flex flex-col justify-center items-center">
      {/* <div className="my-6">
        <Image
          src="/icon_insignia.jpg"
          width="200"
          height="200"
          alt="Insignia"
        ></Image>
      </div>
      <div className="my-6 text-xl font-bold">Insignia Admin Dashboard</div>
      <div className="my-6 text-xl">Loading...</div> */}
      <div>
        {/* <ThreeDot variant="bounce" color="#81FE00" size="medium" text="Loading" textColor="#000000" /> */}
        <PropagateLoader color="#81FE00" />
      </div>
      <div className="mt-6">Loading...</div>
    </div>
  )
}

export default Loading