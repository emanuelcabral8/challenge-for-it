"use client";

import { Box } from "@mui/material";
import { Typography } from "@mui/material";

type TaskItemProps = {
    id: string;
    title: string;
    description: string;
};
export default function TaskCompletedItem({
    title,
    description,
}: TaskItemProps) {

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
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {description}
            </Typography>
            <Box display={"flex"} justifyContent={"flex-end"}>
            </Box>
        </Box>
    );
}
