import { ProfileResponse } from "@/models/response/auth/auth_response"
import { SessionOptions } from "iron-session"

export const defaultSession: ProfileResponse = {
    id: "",
    username: "",
    employee_id: "",
    group_id: "",
    is_active: 0,
    employee: null,
}

export const sessionOptions: SessionOptions = {
    password: process.env.NEXT_PUBLIC_SESSION_SECRET_KEY!,
    cookieName: "auth-session",
    cookieOptions: {
        httpOnly: true,
        secure: false,
        maxAge : 60* 60
    }
}
