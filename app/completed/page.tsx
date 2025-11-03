"use client";

import { useState, useEffect } from "react";
import { TaskData } from "@/types/task";
import axios from "axios";
import { Box } from "@mui/material";
import TaskCompletedItem from "@/components/TaskCompletedItem";

export default function CompletedTasks() {
    const [data, setData] = useState<TaskData[] | null>(null);

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

    if (!data) return <p>Cargando...</p>;

    return (
        <div>
            <Box display={"flex"} gap="16px" flexWrap="wrap" padding={"20px"}>
                {data.filter(task => task.completed).map(task => (
                    <TaskCompletedItem
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                    />
                ))}
            </Box>
        </div>
    );
}
