import { NextRequest } from "next/server";
import AppMiddleware from "./lib/app-middleware";

export const config = {
    matcher: [
        "/((?!api/|_next/|_proxy/|_auth/|_static|_vercel|favicon.ico|sitemap.xml).*)",
    ],
};


export default async function middleware(req: NextRequest) {

    return AppMiddleware(req);
}