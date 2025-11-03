"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import DeltaIcon from "./DeltaIcon";
import { Typography } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
    return (
        <div>
            <AppBar
                position="sticky"
                color="transparent"
                sx={{
                    borderBottom: "1px solid gray",
                }}
            >
                <Toolbar>
                    <Link href="/" >
                        <Box display="flex" alignItems="center">
                            <DeltaIcon sx={{ fontSize: 60, mr: 1 }} />
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    fontFamily: "var(--font-geist-sans)",
                                    fontWeight: 700,
                                }}
                            >
                                Keepify
                            </Typography>
                        </Box>
                    </Link>

                    <Link href="/completed">
                        <Typography variant="h5" sx={{ ml: 10 }}>
                            Ver completadas
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
