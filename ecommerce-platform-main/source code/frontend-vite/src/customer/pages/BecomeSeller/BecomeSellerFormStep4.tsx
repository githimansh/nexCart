import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

interface BecomeSellerFormStep4Props {
  formik: any;
}

const BecomeSellerFormStep4: React.FC<BecomeSellerFormStep4Props> = ({
  formik,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-5">

      {/* Business Name */}

      <TextField
        fullWidth
        name="businessDetails.businessName"
        label="Business Name"
        value={formik.values.businessDetails.businessName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched?.businessDetails?.businessName &&
          Boolean(formik.errors?.businessDetails?.businessName)
        }
        helperText={
          formik.touched?.businessDetails?.businessName &&
          formik.errors?.businessDetails?.businessName
        }
        inputProps={{
          maxLength: 50,
        }}
      />

      {/* Seller Name */}

      <TextField
        fullWidth
        name="sellerName"
        label="Seller Name"
        value={formik.values.sellerName}
        onChange={(e) => {
          const value = e.target.value.replace(/[^A-Za-z ]/g, "");
          formik.setFieldValue("sellerName", value);
        }}
        onBlur={formik.handleBlur}
        error={
          formik.touched.sellerName &&
          Boolean(formik.errors.sellerName)
        }
        helperText={
          formik.touched.sellerName &&
          formik.errors.sellerName
        }
        inputProps={{
          maxLength: 40,
        }}
      />

      {/* Email */}

      <TextField
        fullWidth
        type="email"
        name="email"
        label="Email Address"
        value={formik.values.email}
        onChange={(e) =>
          formik.setFieldValue(
            "email",
            e.target.value.trim().toLowerCase()
          )
        }
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

      {/* Password */}

      <TextField
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.password &&
          Boolean(formik.errors.password)
        }
        helperText={
          formik.touched.password &&
          formik.errors.password
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

    </div>
  );
};

export default BecomeSellerFormStep4;