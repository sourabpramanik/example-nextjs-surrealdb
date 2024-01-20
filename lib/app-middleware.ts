import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function AppMiddleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = (await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })) as {
        email?: string;
        user?: {
            createdAt?: string;
        };
    };


    if (!token?.email && path !== "/auth") {
        return NextResponse.redirect(
            new URL(
                `/auth${path !== "/" ? `?next=${encodeURIComponent(path)}` : ""}`,
                req.url,
            ),
        );

        // if there's a token
    } else if (token?.email) {
        if (
            token?.user?.createdAt &&
            new Date(token?.user?.createdAt).getTime() > Date.now() - 10000 &&
            path !== "/"
        ) {
            return NextResponse.redirect(new URL("/", req.url));

        } else if (path === "/auth") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }
}