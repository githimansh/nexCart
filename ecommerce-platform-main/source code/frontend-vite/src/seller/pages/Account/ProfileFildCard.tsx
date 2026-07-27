/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "@mui/material";

const ProfileFildCard = ({ value, keys }: any) => {
  return (
    <div className="flex items-start bg-white hover:bg-slate-50 transition-all duration-300 px-5 py-4 rounded-lg">

      {/* Label */}
      <div className="w-28 lg:w-44 font-medium text-gray-600">
        {keys}
      </div>

      <Divider orientation="vertical" flexItem />

      {/* Value */}
      <div className="pl-5 flex-1">
        <p className="font-semibold text-gray-900 break-words">
          {value && value.toString().trim() !== ""
            ? value
            : "Not Provided"}
        </p>
      </div>

    </div>
  );
};

export default ProfileFildCard;