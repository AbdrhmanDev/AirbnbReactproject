import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

const ChatBox = () => {
    const [messages, setMessages] = useState([
        { sender: "you", text: "Hey, how are you?" },
        { sender: "them", text: "I'm good! How about you?" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() === "") return;
        setMessages([...messages, { sender: "you", text: input }]);
        setInput("");
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                marginTop: 50,
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                height: 500,
                border: "1px solid #ccc",
                borderRadius: 2,
                p: 2,
            }}
        >
            <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: msg.sender === "you" ? "flex-end" : "flex-start",
                            mb: 1,
                        }}
                    >
                        <Paper
                            elevation={2}
                            sx={{
                                p: 1,
                                bgcolor: msg.sender === "you" ? "#ff385c" : "#f0f0f0",
                                color: msg.sender === "you" ? "white" : "black",
                                maxWidth: "70%",
                            }}
                        >
                            <Typography variant="body2">{msg.text}</Typography>
                        </Paper>
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault(); // Prevent newline
                            handleSend();
                        }
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& fieldset": {
                                borderColor: "#6A6A6A",
                            },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "gray",
                        },
                    }}
                />

                <Button variant="contained" sx={{ background: "#ff385c" }} onClick={handleSend}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatBox;
