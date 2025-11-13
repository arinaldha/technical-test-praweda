"use server"

import { cookies } from 'next/headers';
import { getIronSession } from "iron-session"
import { LoginResponse, SessionData } from '@/models/response/auth/auth_response';
import { sessionOptions } from '@/config/session_config';

export const getSession = async () => {
    return await getIronSession<LoginResponse>(cookies(), sessionOptions)
}

export const saveSession = async (data: SessionData) => {
    const { id, access_token } = data
    const session = await getSession()
    session.id = id,
        session.access_token = access_token
    await session.save()

    return session
}

export const destroySession = async () => {
    const session = await getSession()
    session.destroy()
}

export const getSessionData = async () => {
    const session = await getSession()
    const sessionData: SessionData = {
        id: session.id ?? "",
        access_token: session.access_token ?? "",

    }

    return sessionData;
}