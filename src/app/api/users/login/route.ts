import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found or does not exist!" }, { status: 400 });
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jsonwebtoken.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({ message: "Logged In successful", success: true }, { status: 200 });

        response.cookies.set('token', token, { httpOnly: true });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}