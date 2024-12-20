'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import strings from '@/common/strings'
import { useRouter } from 'next/navigation'


export default function ProfilePage() {
    const { Profile, Profilepage, Logout, Nothing, GetUserDetails } = strings
    const router = useRouter()
    const [data, setData] = useState("nothing")

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = async () => {
        try {
            const response = await axios.get('/api/users/me')
            console.log(response.data)
            setData(response.data?.data?._id)
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
            router.push('/login')
        }
    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        console.log("ProfilePage", data),

        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{Profile}</h1>
            <hr />
            <p>{Profilepage}</p>
            <h2 className="p-1 rounded bg-green-500">{data === "nothing" ? Nothing : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button
                onClick={logout}
                className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >{Logout}</button>

            <button
                onClick={getUserDetails}
                className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >{GetUserDetails}</button>
        </div>
    )
}

