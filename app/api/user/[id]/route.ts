import { User } from "@/lib/schema";
import { surrealDatabase } from "../../lib/surreal";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {

    const response = await surrealDatabase.select<User>(
        params.id
    );

    return NextResponse.json({
        success: true,
        data: response[0],
    });
}