import React from "react";
import { TextField } from "@mui/material";

interface BecomeSellerFormStep3Props {
  formik: any;
}

const BecomeSellerFormStep3: React.FC<BecomeSellerFormStep3Props> = ({
  formik,
}) => {
  return (
    <div className="space-y-5">

      {/* Account Holder Name */}

      <TextField
        fullWidth
        name="bankDetails.accountHolderName"
        label="Account Holder Name"
        value={formik.values.bankDetails.accountHolderName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.accountHolderName &&
          Boolean(formik.errors.bankDetails?.accountHolderName)
        }
        helperText={
          formik.touched.bankDetails?.accountHolderName &&
          formik.errors.bankDetails?.accountHolderName
        }
        inputProps={{
          maxLength: 50,
        }}
      />

      {/* Account Number */}

      <TextField
        fullWidth
        name="bankDetails.accountNumber"
        label="Account Number"
        value={formik.values.bankDetails.accountNumber}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          formik.setFieldValue("bankDetails.accountNumber", value);
        }}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.accountNumber &&
          Boolean(formik.errors.bankDetails?.accountNumber)
        }
        helperText={
          formik.touched.bankDetails?.accountNumber &&
          formik.errors.bankDetails?.accountNumber
        }
        inputProps={{
          maxLength: 18,
        }}
      />

      {/* IFSC Code */}

      <TextField
        fullWidth
        name="bankDetails.ifscCode"
        label="IFSC Code"
        value={formik.values.bankDetails.ifscCode}
        onChange={(e) => {
          formik.setFieldValue(
            "bankDetails.ifscCode",
            e.target.value.toUpperCase()
          );
        }}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.ifscCode &&
          Boolean(formik.errors.bankDetails?.ifscCode)
        }
        helperText={
          formik.touched.bankDetails?.ifscCode &&
          formik.errors.bankDetails?.ifscCode
        }
        inputProps={{
          maxLength: 11,
        }}
      />
    </div>
  );
};

export default BecomeSellerFormStep3;