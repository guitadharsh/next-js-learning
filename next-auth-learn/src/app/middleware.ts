import { NextResponse, NextRequest } from "next/server";
import { authMiddleware } from "./middleware/auth";

export function middlware(req: NextRequest) {
    if(authMiddleware) return authMiddleware;

    return NextResponse.next();
}
