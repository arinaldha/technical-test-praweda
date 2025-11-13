"use server"

import { cookies } from "next/headers"

const cookieToken = () => {
    const token = cookies().get("access_token")?.value ?? ""


    return token
}

export default cookieToken