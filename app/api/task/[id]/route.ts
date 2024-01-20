import { Task } from "@/lib/schema";
import { surrealDatabase } from "../../lib/surreal";
import { NextResponse } from "next/server";

// Fetch task by id
export async function GET(_: Request, { params }: { params: { id: string } }) {

    const response = await surrealDatabase.select<Task>(
        'task:' + params.id
    );

    return NextResponse.json({
        success: true,
        data: response[0],
    });
}

// Update task by id
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const payload = await request.json();

    const response = await surrealDatabase.merge<Task>(
        'task:' + params.id, payload
    );

    return NextResponse.json({
        success: true,
        data: response[0],
    });
}

// Delete task by id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const response = await surrealDatabase.delete<Task>(
        'task:' + params.id
    );

    return NextResponse.json({
        success: true,
        data: response[0],
    });
}