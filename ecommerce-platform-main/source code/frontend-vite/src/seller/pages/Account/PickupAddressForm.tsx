import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import type { UpdateDetailsFormProps } from "./BussinessDetailsForm";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { updateSeller } from "../../../Redux Toolkit/Seller/sellerSlice";

const PickupAddressForm = ({ onClose }: UpdateDetailsFormProps) => {
  const { sellers } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      state: "",
      mobile: "",
    },

    validationSchema: Yup.object({
      address: Yup.string()
        .min(10, "Address must be at least 10 characters")
        .max(200, "Address must be less than 200 characters")
        .required("Address is required"),

      city: Yup.string()
        .matches(/^[A-Za-z ]+$/, "City should contain only alphabets")
        .min(2, "City name is too short")
        .required("City is required"),

      state: Yup.string()
        .matches(/^[A-Za-z ]+$/, "State should contain only alphabets")
        .min(2, "State name is too short")
        .required("State is required"),

      mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter a valid 10 digit mobile number")
        .required("Mobile number is required"),
    }),

    onSubmit: (values) => {
      dispatch(
        updateSeller({
          pickupAddress: values,
        })
      );

      onClose();
    },
  });

  useEffect(() => {
    if (sellers.profile?.pickupAddress) {
      formik.setValues({
        address: sellers.profile.pickupAddress.address || "",
        city: sellers.profile.pickupAddress.city || "",
        state: sellers.profile.pickupAddress.state || "",
        mobile: sellers.profile.pickupAddress.mobile || "",
      });
    }
  }, [sellers.profile]);

  return (
    <>
      <h1 className="text-xl font-bold text-center text-gray-700 mb-6">
        Pickup Address
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-5">

        <TextField
          fullWidth
          id="address"
          name="address"
          label="Address"
          multiline
          rows={3}
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.address &&
            Boolean(formik.errors.address)
          }
          helperText={
            formik.touched.address &&
            formik.errors.address
          }
        />

        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.city &&
            Boolean(formik.errors.city)
          }
          helperText={
            formik.touched.city &&
            formik.errors.city
          }
        />

        <TextField
          fullWidth
          id="state"
          name="state"
          label="State"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.state &&
            Boolean(formik.errors.state)
          }
          helperText={
            formik.touched.state &&
            formik.errors.state
          }
        />

        <TextField
          fullWidth
          id="mobile"
          name="mobile"
          label="Mobile Number"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          inputProps={{
            maxLength: 10,
            inputMode: "numeric",
          }}
          error={
            formik.touched.mobile &&
            Boolean(formik.errors.mobile)
          }
          helperText={
            formik.touched.mobile &&
            formik.errors.mobile
          }
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.3,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
            backgroundColor: "#0F766E",
            "&:hover": {
              backgroundColor: "#115E59",
            },
          }}
        >
          Save Changes
        </Button>

      </form>
    </>
  );
};

export default PickupAddressForm;