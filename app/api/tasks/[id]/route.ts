import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma/client";
import { UpdateTask } from "@/types/updatetask";

const prisma = new PrismaClient();

export async function PUT(
    req: NextRequest,
    { params }: { params: Awaited<{ id: string }> }
) {
    try {
        const { id } = await params;
        const task = await prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }
        const payload: UpdateTask = await req.json();
        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                title: payload.title,
                description: payload.description,
                completed: payload.completed,
            },
        });
        return NextResponse.json(updatedTask, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Awaited<{ id: string }> }) {
    try {
        const { id } = await params;
        const task = await prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }
        const deleteTask = await prisma.task.delete({
            where: { id },
        });
        return NextResponse.json(deleteTask);
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}
