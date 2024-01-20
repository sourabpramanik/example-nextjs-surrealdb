import { Task } from "@/lib/schema";
import { surrealDatabase } from "../lib/surreal";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// Create new task
export async function POST(request: Request) {
    const payload = await request.json();
    const taskId = nanoid(5)
    const session = await getServerSession(authOptions);

    const response = await surrealDatabase.query<[Task]>(
        `CREATE task:${taskId} SET title='${payload.title}', description='${payload.description}', status='${payload.status}', label='${payload.label}', priority='${payload.priority}', author='user:${session?.user.id}';`
    );

    return NextResponse.json({
        success: true,
        data: response[0],
    });
}

// Fetch all tasks
export async function GET() {
    const response = await surrealDatabase.query<Task[]>(
        "SELECT * FROM type::table($tb);",
        {
            tb: "task",
        }
    );

    return NextResponse.json({
        success: true,
        data: response[0].result,
    });
}