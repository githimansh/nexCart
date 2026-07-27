import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import type { UpdateDetailsFormProps } from "./BussinessDetailsForm";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { updateSeller } from "../../../Redux Toolkit/Seller/sellerSlice";

const BankDetailsForm = ({ onClose }: UpdateDetailsFormProps) => {
  const { sellers } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
    },

    validationSchema: Yup.object({
      accountHolderName: Yup.string()
        .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required("Account Holder Name is required"),

      accountNumber: Yup.string()
        .matches(/^[0-9]{9,18}$/, "Account Number must be 9-18 digits")
        .required("Account Number is required"),

      ifscCode: Yup.string()
        .matches(
          /^[A-Z]{4}0[A-Z0-9]{6}$/,
          "Enter a valid IFSC Code"
        )
        .required("IFSC Code is required"),
    }),

    onSubmit: (values) => {
      dispatch(
        updateSeller({
          bankDetails: values,
        })
      );

      onClose();
    },
  });

  useEffect(() => {
    if (sellers.profile) {
      formik.setValues({
        accountHolderName:
          sellers.profile.bankDetails?.accountHolderName || "",
        accountNumber:
          sellers.profile.bankDetails?.accountNumber || "",
        ifscCode:
          sellers.profile.bankDetails?.ifscCode || "",
      });
    }
  }, [sellers.profile]);

  return (
    <>
      <h1 className="text-xl font-bold text-center text-gray-700 mb-6">
        Bank Details
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-5">

        <TextField
          fullWidth
          id="accountHolderName"
          name="accountHolderName"
          label="Account Holder Name"
          value={formik.values.accountHolderName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.accountHolderName &&
            Boolean(formik.errors.accountHolderName)
          }
          helperText={
            formik.touched.accountHolderName &&
            formik.errors.accountHolderName
          }
        />

        <TextField
          fullWidth
          id="accountNumber"
          name="accountNumber"
          label="Account Number"
          value={formik.values.accountNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          inputProps={{
            maxLength: 18,
            inputMode: "numeric",
          }}
          error={
            formik.touched.accountNumber &&
            Boolean(formik.errors.accountNumber)
          }
          helperText={
            formik.touched.accountNumber &&
            formik.errors.accountNumber
          }
        />

        <TextField
          fullWidth
          id="ifscCode"
          name="ifscCode"
          label="IFSC Code"
          value={formik.values.ifscCode}
          onChange={(e) =>
            formik.setFieldValue(
              "ifscCode",
              e.target.value.toUpperCase()
            )
          }
          onBlur={formik.handleBlur}
          inputProps={{
            maxLength: 11,
          }}
          error={
            formik.touched.ifscCode &&
            Boolean(formik.errors.ifscCode)
          }
          helperText={
            formik.touched.ifscCode &&
            formik.errors.ifscCode
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

export default BankDetailsForm;