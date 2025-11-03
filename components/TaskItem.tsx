"use client";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Modal } from "@mui/material";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/schemas/taskschema";
import type { TTaskForm } from "@/schemas/taskschema";
import axios from "axios";
import { UpdateTask } from "@/types/updatetask";
import CrossIcon from "./CrossIcon";

type TaskItemProps = {
    id: string;
    title: string;
    description: string;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: UpdateTask) => void;
};
export default function TaskItem({
    id,
    title,
    description,
    onDelete,
    onUpdate,
}: TaskItemProps) {
    const [open, setIsOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const handleOpen = () => {
        reset({ title, description });
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const onSubmit = async (data: TTaskForm) => {
        try {
            const TaskData = {
                title: data.title,
                description: data.description,
            };
            await axios.put(`http://localhost:3000/api/tasks/${id}`, TaskData);
            onUpdate(id, TaskData);
            handleClose();
        } catch (err) {
            alert(err);
        }
    };

    const handleCheckbox = async () => {
        try {
            const taskDone = {
                completed: true,
            };
            await axios.put(`http://localhost:3000/api/tasks/${id}`, taskDone);
            onUpdate(id, { completed: true });
        } catch (err) {
            alert(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/tasks/${id}`);
            onDelete(id);
        } catch (err) {
            alert(err);
        }
    };

    const textContainerStyles = {
        flexGrow: 1,
        maxHeight: 220,
        overflowY: "auto",
        wordWrap: "break-word",
        marginBottom: "10px",
    };

    const actionsContainerStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: "auto",
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            padding={"10px"}
            gap="10px"
            boxShadow={"1"}
            sx={{
                border: "1px solid gray",
                padding: "15px",
                width: "20%",
                mt: 5,
                borderRadius: 2,
            }}
        >
            <Box sx={textContainerStyles}>
                <Typography
                    variant="h5"
                    sx={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "pre-wrap",
                        mt: 2
                    }}
                >
                    {description}
                </Typography>
            </Box>

            <Box sx={actionsContainerStyles}>
                <Checkbox
                    onClick={handleCheckbox}
                    sx={{
                        color: "grey",
                    }}
                />
                <Button onClick={handleOpen}>Editar</Button>
                <IconButton
                    onClick={handleOpenDelete}
                    size="small"
                    color="error"
                >
                    <CrossIcon fontSize="small"></CrossIcon>
                </IconButton>
                <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="modal-delete-title"
                    aria-describedby="modal-delete-description"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap="10px"
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            padding: "15px",
                            backgroundColor: "black",
                            border: "1px solid gray",
                            borderRadius: 2,
                        }}
                    >
                        <Typography id="modal-delete-title" variant="h6">
                            Confirmar eliminación
                        </Typography>
                        <Typography id="modal-delete-description">
                            ¿Estás seguro de que querés eliminar esta tarea?
                        </Typography>
                        <Box
                            display="flex"
                            mt={2}
                            justifyContent="space-between"
                        >
                            <Button
                                onClick={handleCloseDelete}
                                variant="outlined"
                                size="small"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={async () => {
                                    await handleDelete();
                                    handleCloseDelete();
                                }}
                                color="error"
                                variant="contained"
                                size="small"
                            >
                                Eliminar
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap="10px"
                        boxShadow={"1"}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            padding: "15px",
                            backgroundColor: "black",
                            border: "1px solid gray",
                            borderRadius: 2,
                        }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                id="outlined"
                                variant="standard"
                                spellCheck={false}
                                slotProps={{
                                    input: { disableUnderline: true },
                                }}
                                {...register("title")}
                                fullWidth
                            />
                            <TextField
                                id="outlined-multiline"
                                multiline
                                variant="standard"
                                spellCheck={false}
                                {...register("description")}
                                maxRows={4}
                                slotProps={{
                                    input: { disableUnderline: true },
                                }}
                                fullWidth
                            />
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                mt={2}
                            >
                                <Button
                                    size="small"
                                    onClick={handleClose}
                                    variant="outlined"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    size="small"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
}
