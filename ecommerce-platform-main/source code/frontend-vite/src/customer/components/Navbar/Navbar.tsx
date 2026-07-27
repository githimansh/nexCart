import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "./Navbar.css";
import MicIcon from "@mui/icons-material/Mic";
import Tooltip from "@mui/material/Tooltip";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import { ShoppingBag } from "@mui/icons-material";

const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const { user, cart, sellers } = useAppSelector((store) => store);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const becomeSellerClick = () => {
    if (sellers.profile?.id) {
      navigate("/seller");
    } else {
      navigate("/become-seller");
    }
  };

  return (
    <Box
      sx={{ zIndex: 50 }}
      className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm"
    >
      <div className="flex items-center justify-between h-[72px] px-5 lg:px-16 border-b">

        {/* LEFT */}
        <div className="flex items-center gap-12">

          <div className="flex items-center gap-2">

            {!isLarge && (
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            )}

            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag
                sx={{
                  color: "#0F766E",
                  fontSize: 32,
                }}
              />

              <h1 className="logo text-2xl font-bold text-[#0F766E]">
                NexCart
              </h1>
            </div>
          </div>

          {isLarge && (
            <ul className="flex items-center gap-6 font-medium text-gray-700">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  onMouseLeave={() => setShowSheet(false)}
                  className="relative h-[72px] flex items-center cursor-pointer hover:text-[#0F766E] transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-[#0F766E] after:transition-all hover:after:w-full"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
{/* Search */}
{isLarge ? (
  <div className="flex items-center w-[340px] rounded-full bg-gray-100 px-4 py-2 hover:bg-gray-200 transition">

    {/* Search Area */}
    <div
      onClick={() => navigate("/search-products")}
      className="flex items-center flex-1 cursor-pointer"
    >
      <SearchIcon sx={{ color: "#6B7280" }} />

      <span className="ml-2 text-sm text-gray-500">
        Search products...
      </span>
    </div>

    {/* Divider */}
    <div className="mx-2 h-5 w-px bg-gray-300"></div>

    {/* Mic */}
    <Tooltip title="Voice Search">
      <IconButton
        size="small"
        onClick={() => navigate("/search-products")}
      >
        <MicIcon sx={{ color: "#0F766E" }} />
      </IconButton>
    </Tooltip>

  </div>
) : (
  <div className="flex items-center gap-1">
    <IconButton onClick={() => navigate("/search-products")}>
      <SearchIcon />
    </IconButton>

    <IconButton onClick={() => navigate("/search-products")}>
      <MicIcon sx={{ color: "#0F766E" }} />
    </IconButton>
  </div>
)}

          {/* Login */}
          {user.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2"
            >
              <Avatar
                sx={{ width: 34, height: 34 }}
                src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg"
              />

              <span className="hidden lg:block font-semibold">
                {user.user.fullName?.split(" ")[0]}
              </span>
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AccountCircleIcon />}
              onClick={() => navigate("/login")}
             sx={{
  background: "linear-gradient(135deg,#0F766E,#115E59)",
  borderRadius: "14px",
  textTransform: "none",
  fontWeight: 700,
  fontSize: "15px",
  height: "48px",
  px: 3,
  boxShadow: "0 10px 30px rgba(15,118,110,.35)",
  transition: ".3s",

  "&:hover": {
    background: "linear-gradient(135deg,#115E59,#0B5D56)",
    transform: "translateY(-2px)",
    boxShadow: "0 15px 35px rgba(15,118,110,.45)"
  }
}}
            >
              Login
            </Button>
          )}

          {/* Wishlist */}
          <IconButton
            onClick={() => navigate("/wishlist")}
            sx={{
transition:".3s",
"&:hover":{
background:"#ECFDF5",
transform:"scale(1.12)"
}
}}
          >
            <FavoriteBorderIcon />
          </IconButton>

          {/* Cart */}
          <IconButton
            onClick={() => navigate("/cart")}
           sx={{
transition:".3s",
"&:hover":{
background:"#ECFDF5",
transform:"scale(1.12)"
}
}}
          >
            <Badge
              badgeContent={cart.cart?.cartItems.length}
              color="primary"
            >
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Seller */}
          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
              sx={{
  minWidth: "200px",
  height: "50px",
  borderRadius: "14px",
  textTransform: "none",
  whiteSpace: "nowrap",
  fontWeight: 600,
  px: 3,
  borderColor: "#0F766E",
  color: "#0F766E",
  transition: ".3s",
  "&:hover": {
    background: "#0F766E",
    color: "#fff",
    borderColor: "#0F766E",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(15,118,110,.25)"
  }
}}
            >
              Become Seller
            </Button>
          )}
        </div>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

      {showSheet && (
        <div
          onMouseEnter={() => setShowSheet(true)}
          onMouseLeave={() => setShowSheet(false)}
          className="absolute top-[64px] left-20 right-20"
        >
          <CategorySheet
            selectedCategory={selectedCategory}
            setShowSheet={setShowSheet}
          />
        </div>
      )}
    </Box>
  );
};

export default Navbar;