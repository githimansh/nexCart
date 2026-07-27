import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F8FAFC] px-4 lg:px-10 py-3">

      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#063B37] via-[#0F766E] to-[#115E59] shadow-[0_20px_60px_rgba(0,0,0,.15)]">

        {/* Background Pattern */}

        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />
        </div>

        {/* Glow */}

        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl"></div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center px-6 lg:px-12 py-8">

          {/* LEFT */}

          <div>

            {/* Seller Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">

              <VerifiedUserIcon sx={{ color: "#5EEAD4", fontSize: 18 }} />

              <span className="text-sm font-semibold text-white">
                12K+ Trusted Sellers
              </span>

            </div>

            {/* Heading */}

            <h1 className="mt-5 text-3xl lg:text-[40px] leading-tight font-black text-white">

              Shop Smarter.

              <br />

              Sell Faster.

            </h1>

            {/* Description */}

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/85">

              Discover quality products from verified sellers across India.
              From electronics and fashion to home essentials,
              everything you need is available in one trusted marketplace.

            </p>

            {/* Buttons */}

            <div className="mt-7 flex flex-wrap gap-4">

              <Button
                variant="contained"
                startIcon={<ShoppingBagIcon />}
                onClick={() => navigate("/login")}
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: "14px",
                  background: "#fff",
                  color: "#0F766E",
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "0 15px 30px rgba(0,0,0,.15)",

                  "&:hover": {
                    background: "#F8FAFC",
                  },
                }}
              >
                Start Shopping
              </Button>

              <Button
                variant="outlined"
                startIcon={<StorefrontIcon />}
                onClick={() => navigate("/become-seller")}
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  color: "#fff",
                  borderColor: "rgba(255,255,255,.35)",

                  "&:hover": {
                    borderColor: "#fff",
                    background: "rgba(255,255,255,.08)",
                  },
                }}
              >
                Become Seller
              </Button>


            </div>
            </div>
                      {/* RIGHT */}

          <div className="relative hidden lg:flex justify-center">

            <div className="w-[360px] space-y-4">

              {/* Laptop */}

              <div className="group flex items-center justify-between rounded-2xl bg-white/95 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    💻 Gaming Laptop
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    High Performance • Latest Deals
                  </p>
                </div>

                <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#0F766E]">
                  Trending
                </span>

              </div>

              {/* Mobile */}

              <div className="group ml-10 flex items-center justify-between rounded-2xl bg-white/95 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    📱 Smartphones
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Best Brands • Fast Delivery
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  Hot
                </span>

              </div>

              {/* Fashion */}

              <div className="group flex items-center justify-between rounded-2xl bg-white/95 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    👕 Fashion Deals
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    New Arrivals • Top Brands
                  </p>
                </div>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                  New
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Features */}

        <div className="relative z-10 border-t border-white/10 px-6 lg:px-12 py-5">

          <div className="flex flex-wrap items-center justify-center gap-8 text-white">

            <div className="flex items-center gap-2">

              <VerifiedUserIcon sx={{ fontSize: 20 }} />

              <span className="text-sm font-medium">
                Secure Payments
              </span>

            </div>

            <div className="flex items-center gap-2">

              <LocalShippingIcon sx={{ fontSize: 20 }} />

              <span className="text-sm font-medium">
                Fast Delivery
              </span>

            </div>

            <div className="flex items-center gap-2">

              <AutoAwesomeIcon sx={{ fontSize: 20 }} />

              <span className="text-sm font-medium">
                AI Search
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Banner;
            