import React, { type ChangeEvent, useEffect, useRef, useState } from "react";
import {
  searchProduct,
  generateSearchKeyword,
} from "../../../Redux Toolkit/Customer/ProductSlice";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import ProductCard from "../Products/ProductCard/ProductCard";

import {
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";

import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import SearchIcon from "@mui/icons-material/Search";

const SearchProducts = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const [listening, setListening] = useState(false);

  const dispatch = useAppDispatch();

  const { products } = useAppSelector((store) => store);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

   recognition.onresult = async (event: any) => {

  const transcript = event.results[0][0].transcript;

  try {

    const keyword = await dispatch(
      generateSearchKeyword(transcript)
    ).unwrap();

    setSearchQuery(keyword);

    dispatch(searchProduct(keyword));

  } catch (err) {

    console.error(err);

    // AI fail ho jaye to normal search
    setSearchQuery(transcript);

    dispatch(searchProduct(transcript));

  }

};

    recognitionRef.current = recognition;

  }, [dispatch]);

  const startVoiceSearch = () => {

    if (!recognitionRef.current) {

      alert("Voice Search is not supported in this browser.");

      return;

    }

    recognitionRef.current.start();

  };

  const stopVoiceSearch = () => {

    recognitionRef.current?.stop();

  };

  const handleSearchChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {

    setSearchQuery(e.target.value);

  };

  const handleProductSearch = () => {

    if (searchQuery.trim() !== "") {

      dispatch(searchProduct(searchQuery.trim()));

    }

  };

  // Live Search
  useEffect(() => {

    const timer = setTimeout(() => {

      if (searchQuery.trim().length > 1) {

        dispatch(searchProduct(searchQuery.trim()));

      }

    }, 400);

    return () => clearTimeout(timer);

  }, [searchQuery, dispatch]);
  return (
  <div className="min-h-screen px-5 lg:px-20 py-6">

    {/* Search Bar */}

    <div className="flex justify-center mb-10">

      <div className="w-full lg:w-2/3 flex items-center bg-white border border-gray-300 rounded-2xl shadow-md overflow-hidden">

        <SearchIcon
          sx={{
            color: "#6B7280",
            ml: 2,
          }}
        />

        <input
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleProductSearch();
            }
          }}
          className="flex-1 px-4 py-4 outline-none"
          type="text"
          placeholder="Search products by typing or speaking..."
        />

        <Tooltip
          title={listening ? "Stop Listening" : "Voice Search"}
        >

          <IconButton
            onClick={
              listening
                ? stopVoiceSearch
                : startVoiceSearch
            }
            sx={{
              mr: 2,
              color: listening ? "#DC2626" : "#0F766E",
            }}
          >

            {listening ? (

              <StopIcon />

            ) : (

              <MicIcon />

            )}

          </IconButton>

        </Tooltip>

      </div>

    </div>

    {listening && (

      <div className="flex justify-center mb-6">

        <div className="flex items-center gap-3 rounded-full bg-red-50 px-5 py-2 border border-red-200">

          <CircularProgress
            size={18}
            color="error"
          />

          <span className="text-red-600 font-medium">

            Listening...
            Speak in Hindi or English

          </span>

        </div>

      </div>

    )}

    {/* Products */}

    {products.searchProduct?.length > 0 ? (

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.searchProduct.map((item: any, index: number) => (

          <ProductCard
            key={item.id ?? index}
            item={item}
          />

        ))}

      </section>

    ) : searchQuery.trim() !== "" ? (

      <div className="h-[60vh] flex flex-col justify-center items-center">

        <img
          className="w-60"
          src="https://cdn.pixabay.com/photo/2022/05/28/10/45/oops-7227010_960_720.png"
          alt=""
        />

        <h2 className="text-2xl font-bold mt-5">

          No Product Found

        </h2>

        <p className="text-gray-500 mt-2">

          No results for

          <span className="text-[#0F766E] font-semibold">

            {" "}
            {searchQuery}

          </span>

        </p>

      </div>

    ) : (

      <div className="h-[60vh] flex flex-col justify-center items-center">

        <MicIcon
          sx={{
            fontSize: 90,
            color: "#0F766E",
          }}
        />

        <h1 className="text-4xl font-bold mt-6">

          Search Products

        </h1>

        <p className="text-gray-500 mt-3 text-center">

          Type your product name

          <br />

          or tap the microphone and speak.

        </p>

      </div>

    )}

  </div>
);

};

export default SearchProducts;