import strings from '@/common/strings'
import React from 'react'

export default function ProfilePage({ params }: any) {
    console.log("params", params);

    const { Profile, Profilepage } = strings
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{Profile}</h1>
            <hr />
            <p className='text-4xl'>{Profilepage}</p>
            <span className='p-2 ml-2 rounded bg-orange-500 text-black'>{params?.id}</span>
        </div>
    )
}

