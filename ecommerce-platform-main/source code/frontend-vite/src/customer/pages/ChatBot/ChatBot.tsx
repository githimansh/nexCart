import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { chatBot } from "../../../Redux Toolkit/Customer/AiChatBotSlice";

import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";

import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import PromptMessage from "./PromptMessage";
import ResponseMessage from "./ResponseMessage";

interface ChatBotProps {
  handleClose: (e: any) => void;
  productId?: number;
}

const ChatBot = ({ handleClose, productId }: ChatBotProps) => {

  const dispatch = useAppDispatch();

  const { aiChatBot } = useAppSelector((store) => store);

  const [prompt, setPrompt] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handlePromptChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrompt(e.target.value);
  };

  const handleGivePrompt = () => {

    if (!prompt.trim()) return;
    
    dispatch(
      chatBot({
        prompt: {
          prompt: prompt.trim(),
        },
        productId,
      })
    );

    setPrompt("");

  };

  useEffect(() => {

    chatContainerRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [aiChatBot.messages]);
  return (

<div className="rounded-2xl overflow-hidden shadow-2xl bg-white w-full lg:w-[430px] h-[82vh] flex flex-col">

    {/* Header */}

    <div className="h-[72px] bg-gradient-to-r from-[#0F766E] to-[#115E59] flex items-center justify-between px-5">

        <div className="flex items-center gap-3">

            <Avatar
                sx={{
                    bgcolor: "#fff",
                    color: "#0F766E",
                }}
            >
                <SmartToyRoundedIcon />
            </Avatar>

            <div>

                <h2 className="text-white font-bold text-lg">
                    NexCart AI
                </h2>

                <p className="text-white/80 text-xs">
                    Powered by Groq
                </p>

            </div>

        </div>

        <IconButton
            onClick={handleClose}
            sx={{ color: "#fff" }}
        >
            <CloseRoundedIcon />
        </IconButton>

    </div>

    {/* Chat */}

    <div className="flex-1 overflow-y-auto bg-slate-50 px-5 py-5 flex flex-col gap-4">

        <div className="rounded-2xl bg-white p-4 shadow-sm border">

            <div className="flex gap-3">

                <Avatar
                    sx={{
                        bgcolor: "#0F766E",
                    }}
                >
                    <SmartToyRoundedIcon />
                </Avatar>

                <div>

                    <h3 className="font-bold text-gray-800">
                        Welcome 👋
                    </h3>

                    <p className="text-sm text-gray-600 mt-2 leading-6">

                        {productId
                            ? "Ask anything about this product."
                            : "Ask about products, orders, cart or delivery."}

                    </p>

                </div>

            </div>

        </div>

        {aiChatBot.messages.map((item: any, index: number) =>

            item.role === "user" ? (

                <div
                    key={index}
                    className="self-end"
                    ref={chatContainerRef}
                >
                    <PromptMessage
                        message={item.message}
                        index={index}
                    />
                </div>

            ) : (

                <div
                    key={index}
                    className="self-start"
                    ref={chatContainerRef}
                >
                    <ResponseMessage
                        message={item.message}
                    />
                </div>

            )

        )}

        {aiChatBot.loading && (

            <div className="flex items-center gap-3">

                <CircularProgress
                    size={18}
                />

                <span className="text-sm text-gray-500">
                    AI is thinking...
                </span>

            </div>

        )}

    </div>

    {/* Footer */}

    <div className="border-t bg-white p-3 flex gap-3">

        <input

            value={prompt}

            onChange={handlePromptChange}

            onKeyDown={(e) => {

                if (e.key === "Enter" && !e.shiftKey) {

                    e.preventDefault();

                    handleGivePrompt();

                }

            }}

            placeholder="Ask anything..."

            className="flex-1 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-[#0F766E]"

        />

        <Button

            disabled={aiChatBot.loading}

            onClick={handleGivePrompt}

            variant="contained"

            sx={{

                minWidth: "56px",

                borderRadius: "12px",

                bgcolor: "#0F766E",

                "&:hover": {

                    bgcolor: "#115E59",

                },

            }}

        >

            <SendRoundedIcon />

        </Button>

    </div>

</div>

);

};

export default ChatBot;