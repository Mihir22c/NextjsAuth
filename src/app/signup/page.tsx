'use client' // The 'use client' pragma is required for this file to be compiled by the client-side compiler
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import strings from '@/common/strings'
import Link from 'next/link'


export default function SignUpPage() {
    const router = useRouter()
    const { Processing, SignUp, NoSignUp, Success, username, email, password, VisitLoginPage } = strings
    const [user, setUser] = useState({
        email: '',
        password: '',
        username: ''
    })

    const [btnDisabled, setBtnDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignUp = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Sign up Success", response.data);
            router.push("/login")

        } catch (error: any) {
            console.log("Sign up error", error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    }, [user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? Processing : SignUp}</h1>
            <hr />
            <label htmlFor="username">{username}</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder='username'
            />
            <label htmlFor="email">{email}</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='email'
            />
            <label htmlFor="password">{password}</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
                type="text"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='password'
            />
            <button onClick={onSignUp} disabled={btnDisabled} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
                {btnDisabled ? NoSignUp : SignUp}
            </button>
            <Link href="/login">{VisitLoginPage}</Link>
        </div>
    )
}
