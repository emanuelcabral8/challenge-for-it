import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma/client";
import { Task } from "@/types/task";

const prisma = new PrismaClient();

export async function GET() {
    const allTasks = await prisma.task.findMany();
    return NextResponse.json(allTasks);
}

export async function POST(req: NextRequest) {
    try {
        const payload: Task = await req.json();
        const newTask = await prisma.task.create({  
            data: {
                title: payload.title,
                description: payload.description,
                completed: false
            },
        });
        return NextResponse.json(newTask, { status: 201 });
    } catch (err)   {
        return NextResponse.error()
    }
}
