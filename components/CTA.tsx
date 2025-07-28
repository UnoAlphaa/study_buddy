import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Cta = () => {
  return (
    <section className='cta-section'>
        <div className='cta-badge'>Learn your own way</div>
        <h2 className='text-2xl font-bold'>
            Build and Personalize Learning Companion
        </h2>
        <p>Pick a name, subject, voice, & Personality - and start learning through voice consversations that feel neutral and fun</p>

        <Image src="images/cta.svg" alt='cta' width={352} height={232} />

        <button className='bg-[#FE5933] flex items-center justify-center px-3 py-2 rounded-md gap-2'>
            <Image src="icons/plus.svg" alt='plus' width={12} height={12} />
            <Link href="/companions/new">
                <p className='font-bold'>Build a New Companion</p>
            </Link> 
        </button>
    </section>
  )
}

export default Cta