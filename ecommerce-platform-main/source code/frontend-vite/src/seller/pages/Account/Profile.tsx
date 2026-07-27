import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Snackbar,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";

import { useAppSelector } from "../../../Redux Toolkit/Store";

import ProfileFildCard from "./ProfileFildCard";
import PersonalDetailsForm from "./PersionalDetailsForm";
import BusinessDetailsForm from "./BussinessDetailsForm";
import PickupAddressForm from "./PickupAddressForm";
import BankDetailsForm from "./BankDetailsForm";

export const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: {
    xs: "95%",
    sm: 550,
  },
  bgcolor: "background.paper",
  borderRadius: "18px",
  boxShadow: 24,
  p: 3,
};

const Profile = () => {
  const { sellers } = useAppSelector((store) => store);

  const [open, setOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState("personalDetails");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleOpen = (form: string) => {
    setSelectedForm(form);
    setOpen(true);
  };

  useEffect(() => {
    if (sellers.profileUpdated || sellers.error) {
      setSnackbarOpen(true);
    }
  }, [sellers.profileUpdated, sellers.error]);

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personalDetails":
        return <PersonalDetailsForm onClose={handleClose} />;

      case "businessDetails":
        return <BusinessDetailsForm onClose={handleClose} />;

      case "pickupAddress":
        return <PickupAddressForm onClose={handleClose} />;

      case "bankDetails":
        return <BankDetailsForm onClose={handleClose} />;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-10 space-y-8">

      {/* Profile Header */}

      <Paper
        elevation={3}
        className="rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-center"
      >
        <Avatar
          sx={{
            width: 130,
            height: 130,
            fontSize: 42,
            bgcolor: "#0F766E",
          }}
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        />

        <div className="flex-1">

          <h1 className="text-3xl font-bold text-gray-800">
            {sellers.profile?.sellerName}
          </h1>

          <p className="text-gray-500 mt-2">
            {sellers.profile?.email}
          </p>

          <p className="text-gray-500">
            {sellers.profile?.mobile}
          </p>

          <div className="mt-5">

            <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-semibold text-sm">
              {sellers.profile?.accountStatus}
            </span>

          </div>

        </div>

      </Paper>

      {/* Personal */}

      <Paper elevation={2} className="rounded-3xl p-6">

        <div className="flex justify-between items-center mb-5">

          <div className="flex items-center gap-3">

            <PersonRoundedIcon sx={{ color: "#0F766E" }} />

            <h2 className="text-2xl font-bold">
              Personal Details
            </h2>

          </div>

          <Button
            variant="contained"
            startIcon={<EditRoundedIcon />}
            onClick={() => handleOpen("personalDetails")}
            sx={{
              background: "#0F766E",
              borderRadius: "12px",
              textTransform: "none",
            }}
          >
            Edit
          </Button>

        </div>

        <ProfileFildCard
          keys="Seller Name"
          value={sellers.profile?.sellerName}
        />

        <Divider />

        <ProfileFildCard
          keys="Email"
          value={sellers.profile?.email}
        />

        <Divider />

        <ProfileFildCard
          keys="Mobile"
          value={sellers.profile?.mobile}
        />

      </Paper>

      {/* Business */}

      <Paper elevation={2} className="rounded-3xl p-6">

        <div className="flex justify-between items-center mb-5">

          <div className="flex items-center gap-3">

            <BusinessCenterRoundedIcon
              sx={{ color: "#0F766E" }}
            />

            <h2 className="text-2xl font-bold">
              Business Details
            </h2>

          </div>

          <Button
            variant="contained"
            startIcon={<EditRoundedIcon />}
            onClick={() => handleOpen("businessDetails")}
            sx={{
              background: "#0F766E",
              borderRadius: "12px",
              textTransform: "none",
            }}
          >
            Edit
          </Button>

        </div>

        <ProfileFildCard
          keys="Business Name"
          value={
            sellers.profile?.businessDetails?.businessName
          }
        />

        <Divider />

        <ProfileFildCard
          keys="GST Number"
          value={sellers.profile?.gstin}
        />

        <Divider />

        <ProfileFildCard
          keys="Status"
          value={sellers.profile?.accountStatus}
        />

      </Paper>
            {/* Pickup Address */}

      <Paper elevation={2} className="rounded-3xl p-6">

        <div className="flex justify-between items-center mb-5">

          <div className="flex items-center gap-3">

            <HomeRoundedIcon sx={{ color: "#0F766E" }} />

            <h2 className="text-2xl font-bold">
              Pickup Address
            </h2>

          </div>

          <Button
            variant="contained"
            startIcon={<EditRoundedIcon />}
            onClick={() => handleOpen("pickupAddress")}
            sx={{
              background: "#0F766E",
              borderRadius: "12px",
              textTransform: "none",
            }}
          >
            Edit
          </Button>

        </div>

        <ProfileFildCard
          keys="Address"
          value={sellers.profile?.pickupAddress?.address}
        />

        <Divider />

        <ProfileFildCard
          keys="City"
          value={sellers.profile?.pickupAddress?.city}
        />

        <Divider />

        <ProfileFildCard
          keys="State"
          value={sellers.profile?.pickupAddress?.state}
        />

        <Divider />

        <ProfileFildCard
          keys="Mobile"
          value={sellers.profile?.pickupAddress?.mobile}
        />

      </Paper>

      {/* Bank Details */}

      <Paper elevation={2} className="rounded-3xl p-6">

        <div className="flex justify-between items-center mb-5">

          <div className="flex items-center gap-3">

            <AccountBalanceRoundedIcon sx={{ color: "#0F766E" }} />

            <h2 className="text-2xl font-bold">
              Bank Details
            </h2>

          </div>

          <Button
            variant="contained"
            startIcon={<EditRoundedIcon />}
            onClick={() => handleOpen("bankDetails")}
            sx={{
              background: "#0F766E",
              borderRadius: "12px",
              textTransform: "none",
            }}
          >
            Edit
          </Button>

        </div>

        <ProfileFildCard
          keys="Account Holder"
          value={
            sellers.profile?.bankDetails?.accountHolderName
          }
        />

        <Divider />

        <ProfileFildCard
          keys="Account Number"
          value={
            sellers.profile?.bankDetails?.accountNumber
          }
        />

        <Divider />

        <ProfileFildCard
          keys="IFSC Code"
          value={
            sellers.profile?.bankDetails?.ifscCode
          }
        />

      </Paper>

      {/* Modal */}

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          {renderSelectedForm()}
        </Box>
      </Modal>

      {/* Snackbar */}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          variant="filled"
          severity={sellers.error ? "error" : "success"}
          onClose={() => setSnackbarOpen(false)}
          sx={{
            width: "100%",
          }}
        >
          {sellers.error
            ? sellers.error
            : "Profile updated successfully"}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default Profile;