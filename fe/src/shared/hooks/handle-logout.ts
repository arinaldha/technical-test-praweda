'use server'
import { resetUtils } from "@/modules/utils/slices/utils_slice"
import { setContentLoading } from "@/redux/basic_slice"
import { cookies } from "next/headers"
import { showSuccessNotification } from "../helpers/notification"
import { destroySession } from "../helpers/session"
import { Dispatch } from "@reduxjs/toolkit"
import { redirect } from "next/navigation"

const handleLogout = async () => {
    try {
        const cookiesNext = cookies()
        await destroySession()

        cookiesNext.delete("access_token")
        cookiesNext.delete("refresh_token")
        cookiesNext.delete("list_menu")
        cookiesNext.delete("tes_role")
        cookiesNext.delete("ROLE_MODULE")
        redirect("auth/login")

    } catch (error) {
        throw error
    }

}

export default handleLogout