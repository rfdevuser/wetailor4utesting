import Image from 'next/image'
import React from 'react'

const WeddingCategoryPage = ({ params }: { params: { id: string } }) => {

  return (
    <>
    <div className='flex justify-center text-2xl mt-4 bg-[#f5f5f4] p-4 rounded-md'>
      {params.id}
      </div>
      <div className='flex flex-col lg:flex-row justify-center mt-10 mb-10'>
      <div className="grid grid-cols-3 gap-4 lg:gap-8 shadow-md ">
      <Image
      src='/Backgrounds/wedding/men1.png'
      alt='loading Image'
      height={300}
      width={300}
      loading='lazy'
      
      />

<Image
      src='/Backgrounds/wedding/women1.png'
      alt='loading Image'
      height={300}
      width={300}
      loading='lazy'
      
      />

<Image
      src='/Backgrounds/wedding/boy1.png'
      alt='loading Image'
      height={300}
      width={300}
      loading='lazy'
      
      />

<Image
      src='/Backgrounds/wedding/girl1.png'
      alt='loading Image'
      height={300}
      width={300}
      loading='lazy'
      
      />

<Image
      src='/Backgrounds/wedding/toddler1.png'
      alt='loading Image'
      height={300}
      width={300}
      loading='lazy'
      
      />

<Image
      src='/Backgrounds/wedding/guest1.png'
      alt='loading Image'
      height={300}
      width={300}
      loading='lazy'
      
      />
    </div>
    </div>
  
    </>
  )
}

export default WeddingCategoryPage
