import { getSessionData } from "@/shared/helpers/session";
import { NextRequest, NextResponse } from "next/server";
import { authenticatedPaths, guestPaths } from "@/shared/constants/protected_path";

export const middleware = async (req: NextRequest, res: NextResponse) => {
    const getSession = await getSessionData();
    const { pathname } = req.nextUrl;
    if (getSession.id !== "" && getSession.access_token !== "") {
        if (guestPaths.includes(pathname)) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    } else {
        if (authenticatedPaths.includes(pathname)) {
            return NextResponse.redirect(new URL("/auth/login", req.url))
        }
    }
}


