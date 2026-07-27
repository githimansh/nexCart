import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import type { UpdateDetailsFormProps } from "./BussinessDetailsForm";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { updateSeller } from "../../../Redux Toolkit/Seller/sellerSlice";

const PersonalDetailsForm = ({ onClose }: UpdateDetailsFormProps) => {
  const { sellers } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      sellerName: "",
      email: "",
      mobile: "",
    },

    validationSchema: Yup.object({
      sellerName: Yup.string()
        .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
        .min(3, "Seller name must be at least 3 characters")
        .max(50, "Seller name must be less than 50 characters")
        .required("Seller Name is required"),

      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

      mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter a valid 10 digit mobile number")
        .required("Mobile number is required"),
    }),

    onSubmit: (values) => {
      dispatch(updateSeller(values));
      onClose();
    },
  });

  useEffect(() => {
    if (sellers.profile) {
      formik.setValues({
        sellerName: sellers.profile.sellerName || "",
        email: sellers.profile.email || "",
        mobile: sellers.profile.mobile || "",
      });
    }
  }, [sellers.profile]);

  return (
    <>
      <h1 className="text-xl font-bold text-center text-gray-700 mb-6">
        Personal Details
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-5">

        <TextField
          fullWidth
          id="sellerName"
          name="sellerName"
          label="Seller Name"
          value={formik.values.sellerName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.sellerName &&
            Boolean(formik.errors.sellerName)
          }
          helperText={
            formik.touched.sellerName &&
            formik.errors.sellerName
          }
        />

        <TextField
          fullWidth
          id="email"
          name="email"
          label="Seller Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.email &&
            Boolean(formik.errors.email)
          }
          helperText={
            formik.touched.email &&
            formik.errors.email
          }
        />

        <TextField
          fullWidth
          id="mobile"
          name="mobile"
          label="Seller Mobile"
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

export default PersonalDetailsForm;