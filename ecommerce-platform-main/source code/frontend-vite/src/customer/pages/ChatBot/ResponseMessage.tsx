import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";

import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

interface ResponseMessageProps {
  message: string;
}

const ResponseMessage = ({ message }: ResponseMessageProps) => {

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(message);

      setCopied(true);

      setTimeout(() => {

        setCopied(false);

      }, 2000);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="flex justify-start mb-5">

      <div className="flex items-start gap-3 max-w-[90%]">

        <Avatar
          sx={{
            bgcolor: "#0F766E",
            width: 38,
            height: 38,
          }}
        >
          <SmartToyRoundedIcon fontSize="small" />
        </Avatar>

        <div className="relative bg-white border border-slate-200 rounded-2xl rounded-bl-md shadow-md px-5 py-4">

          <div className="flex items-center justify-between gap-5 mb-3">

            <div>

              <h3 className="text-[#0F766E] font-bold text-sm">
                NexCart AI
              </h3>

              <p className="text-[11px] text-gray-400">

                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}

              </p>

            </div>

            <Tooltip
              title={copied ? "Copied" : "Copy"}
            >

              <IconButton
                size="small"
                onClick={handleCopy}
              >

                {copied ? (

                  <CheckRoundedIcon
                    fontSize="small"
                    color="success"
                  />

                ) : (

                  <ContentCopyRoundedIcon
                    fontSize="small"
                  />

                )}

              </IconButton>

            </Tooltip>

          </div>

          <p className="text-[15px] leading-7 text-gray-700 whitespace-pre-wrap break-words">

            {message}

          </p>

        </div>

      </div>

    </div>

  );

};

export default ResponseMessage;