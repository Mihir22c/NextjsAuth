'use client' // The 'use client' pragma is required for this file to be compiled by the client-side compiler
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function SignUpPage() {
    const router = useRouter()
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
            <h1>{loading ? }</h1>
        </div>
    )
}
