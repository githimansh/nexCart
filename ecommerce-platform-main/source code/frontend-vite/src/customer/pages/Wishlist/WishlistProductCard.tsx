import React, { type MouseEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import type { Product } from "../../../types/productTypes";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { addProductToWishlist } from "../../../Redux Toolkit/Customer/WishlistSlice";

interface ProductCardProps {
    item: Product;
}

const WishlistProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const dispatch = useAppDispatch();

    const handleIconClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (item.id) {
            dispatch(addProductToWishlist({ productId: item.id }));
        }
    };

    return (
        <div className="w-60 relative">
            <div className="w-full">
                <img
                    className="object-top w-full"
                    src={item.images[0]}
                    alt={item.title}
                />
            </div>

            <div className="pt-3 space-y-1 rounded-md">
                <p>{item.title}</p>

                <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">
                        ₹{item.sellingPrice}
                    </span>

                    <span className="line-through text-gray-400">
                        ₹{item.mrpPrice}
                    </span>

                    <span className="text-[#0F766E] font-semibold">
                        {item.discountPercent}% off
                    </span>
                </div>
            </div>

            <div className="absolute top-1 right-1">
                <button onClick={handleIconClick}>
                    <CloseIcon
                        className="cursor-pointer bg-white rounded-full p-1 shadow"
                        sx={{
                            color: "#0F766E",
                            fontSize: "2rem",
                        }}
                    />
                </button>
            </div>
        </div>
    );
};

export default WishlistProductCard;