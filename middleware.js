import { NextResponse } from "next/server";

// Redirect to /vision if the user is not logged in
export function middleware(request) {
    let cookie = request.cookies.get("next-auth.session-token")?.value;
    if (cookie) {
        return NextResponse.next();
    } else {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: "/vision",
    matcher: "/credits",
};
