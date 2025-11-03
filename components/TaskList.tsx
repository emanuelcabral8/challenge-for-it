"use client";

import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { Box} from "@mui/material";
import { TaskData } from "@/types/task";
import axios from "axios";
import { UpdateTask } from "@/types/updatetask";
import TaskForm from "./TaskForm";

export default function TaskList() {
    const [data, setData] = useState<TaskData[] | null>(null);

    const handleDelete = (id: string) => {
        setData(data!.filter((task) => task.id !== id));
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get<TaskData[]>(
                    "http://localhost:3000/api/tasks"
                );
                setData(res.data);
            } catch (err) {
                alert(err);
            }
        };
        fetchTasks();
    }, []);
    const handleUpdate = (id: string, updates: UpdateTask) => {
        setData(
            (prev) =>
                prev?.map((task) =>
                    task.id === id ? { ...task, ...updates } : task
                ) ?? null
        );
    };

    const handleAdd = (newTask: TaskData) => {
    setData((prev) => (prev ? [newTask, ...prev] : [newTask]));
};
    if (!data) return <p>Cargando...</p>;

    return (
        <div>
        <TaskForm onAdd = {handleAdd}></TaskForm>
        <Box display={"flex"} gap="16px" flexWrap="wrap" padding={"20px"}>
            {data.filter(task => !task.completed).map(task => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            ))}
        </Box>
        </div>
    );
}
