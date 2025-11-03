"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { taskSchemaRequired, TTaskFormRequired } from "@/schemas/taskschema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { TaskData } from "@/types/task";

interface TaskFormProps {
    onAdd: (task: TaskData) => void;
}
export default function TaskForm({ onAdd }: TaskFormProps) {
    const [open, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        reset();
    };
    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        resolver: zodResolver(taskSchemaRequired),
        defaultValues: {
            title: "",
            description: "",
        },
    });
    const onSubmit = async (data: TTaskFormRequired) => {
        try {
            const TaskData = {
                title: data.title,
                description: data.description,
            };
            const newTask = await axios.post(
                `http://localhost:3000/api/tasks`,
                TaskData
            );
            handleClose();
            onAdd(newTask.data);
            reset();
        } catch (err) {
            alert(err);
        }
    };
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="20px"
            boxShadow={"1"}
            sx={{
                border: "1px solid gray",
                margin: "auto",
                padding: "15px",
                width: "40%",
                mt: 5,
                borderRadius: 2,
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                {open && (
                    <TextField
                        id="outlined"
                        variant="standard"
                        spellCheck={false}
                        {...register("title")}
                        placeholder="Título"
                        sx={{ mb: 1 }}
                        slotProps={{ input: { disableUnderline: true } }}
                        fullWidth
                    />
                )}
                <TextField
                    onClick={handleOpen}
                    id="outlined-multiline"
                    multiline
                    spellCheck={false}
                    variant="standard"
                    placeholder={"Añade una tarea..."}
                    {...register("description")}
                    maxRows={4}
                    slotProps={{ input: { disableUnderline: true } }}
                    fullWidth
                />
                {open && (
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button onClick={handleClose} variant="outlined">
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Guardar
                        </Button>
                    </Box>
                )}
            </form>
        </Box>
    );
}
