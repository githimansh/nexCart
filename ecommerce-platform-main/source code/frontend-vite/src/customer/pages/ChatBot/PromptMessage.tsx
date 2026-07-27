import React from "react";
import { Avatar } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

interface PromptMessageProps {
  message: string;
  index: number;
}

const PromptMessage = ({ message }: PromptMessageProps) => {
  return (
    <div className="flex justify-end mb-4">

      <div className="flex items-end gap-3 max-w-[85%]">

        <div className="bg-[#0F766E] text-white rounded-2xl rounded-br-md px-4 py-3 shadow-md">

          <p className="text-sm leading-6 whitespace-pre-wrap">
            {message}
          </p>

        </div>

        <Avatar
          sx={{
            bgcolor: "#0F766E",
            width: 36,
            height: 36,
          }}
        >
          <PersonRoundedIcon fontSize="small" />
        </Avatar>

      </div>

    </div>
  );
};

export default PromptMessage;