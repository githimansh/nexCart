import React, { useState } from "react";
import Banner from "./Banner/Banner";
import HomeCategory from "./HomeCategory/HomeCategory";
import TopBrand from "./TopBrands/Grid";
import ElectronicCategory from "./Electronic Category/ElectronicCategory";
import DealSlider from "./Deals/Deals";

import ChatBot from "../ChatBot/ChatBot";

import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import StorefrontIcon from "@mui/icons-material/Storefront";

import {
  Backdrop,
  Button,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../Redux Toolkit/Store";

const Home = () => {
  const [showChatBot, setShowChatBot] = useState(false);

  const { homePage } = useAppSelector((store) => store);

  const navigate = useNavigate();

  const handleShowChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  const handleCloseChatBot = () => {
    setShowChatBot(false);
  };

  const becomeSellerClick = () => {
    navigate("/become-seller");
  };

  if (homePage.loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className="space-y-14 pb-20">

      {/* ================= HERO BANNER ================= */}

      <Banner />


      {/* ================= TODAY DEALS ================= */}

      {homePage.homePageData?.deals && (
        <section className="px-4 lg:px-12">

          <h1 className="text-center text-3xl lg:text-5xl font-bold text-[#0F766E] mb-10">

            Today's Deals

          </h1>

          <DealSlider />

        </section>
      )}

      

          
      {/* ================= SHOP CATEGORY ================= */}

      {homePage.homePageData?.shopByCategories && (
        <section className="px-4 lg:px-12">

          <h1 className="text-center text-3xl lg:text-5xl font-bold text-[#0F766E] mb-12">

            Shop By Category

          </h1>

          <HomeCategory />

        </section>
      )}

      {/* ================= AI CHAT ================= */}

      <section className="fixed bottom-8 right-8 z-50">

        {showChatBot ? (
          <ChatBot handleClose={handleCloseChatBot} />
        ) : (
          <Button
            onClick={handleShowChatBot}
            variant="contained"
            sx={{
              bgcolor: "#0F766E",
              width: 70,
              height: 70,
              borderRadius: "999px",
              minWidth: 0,
              boxShadow: "0 12px 35px rgba(15,118,110,.35)",

              "&:hover": {
                bgcolor: "#115E59",
              },
            }}
          >
            <ChatBubbleIcon
              sx={{
                color: "#fff",
                fontSize: "2rem",
              }}
            />
          </Button>
        )}

      </section>

    </div>
  );
};

export default Home;