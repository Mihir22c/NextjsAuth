import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function POST(request: NextRequest) {
    try {
        // extract data from token
        const userId = await getDataFromToken(request);
        // find user by id
        const user = await User.findOne({ _id: userId }).select("-password");

        // check if user exists
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User found", data: user, success: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });


    }
}