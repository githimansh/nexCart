import { Button } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { createSeller } from "../../../Redux Toolkit/Seller/sellerAuthenticationSlice";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

export interface SellerRegistrationValues {
  mobile: string;
  otp: string;
  gstin: string;
  pickupAddress: { name: string; mobile: string; pincode: string; address: string; locality: string; city: string; state: string };
  bankDetails: { accountHolderName: string; accountNumber: string; ifscCode: string };
  sellerName: string;
  email: string;
  password: string;
  businessDetails: { businessName: string };
}

const validationSchema = Yup.object({
  mobile: Yup.string().matches(/^[6-9]\d{9}$/, "Enter a valid 10 digit mobile number").required("Mobile number is required"),
  gstin: Yup.string()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, "Invalid GSTIN")
    .required("GSTIN is required"),
  pickupAddress: Yup.object({
    name: Yup.string().min(3, "Minimum 3 characters").required("Name is required"),
    mobile: Yup.string().matches(/^[6-9]\d{9}$/, "Enter a valid mobile number").required("Mobile is required"),
    pincode: Yup.string().matches(/^[1-9][0-9]{5}$/, "Enter a valid 6 digit pincode").required("Pincode is required"),
    address: Yup.string().min(5, "Enter a valid address").required("Address is required"),
    locality: Yup.string().required("Locality is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  }),
  bankDetails: Yup.object({
    accountHolderName: Yup.string().matches(/^[A-Za-z ]+$/, "Only letters allowed").required("Account holder name is required"),
    accountNumber: Yup.string().matches(/^[0-9]{9,18}$/, "Account number should be 9-18 digits").required("Account number is required"),
    ifscCode: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code").required("IFSC code is required"),
  }),
  sellerName: Yup.string().matches(/^[A-Za-z ]+$/, "Only letters allowed").min(3, "Minimum 3 characters").max(40, "Maximum 40 characters").required("Seller name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Minimum 8 characters").matches(/[A-Z]/, "One uppercase letter required").matches(/[a-z]/, "One lowercase letter required").matches(/[0-9]/, "One number required").matches(/[@$!%*?&#]/, "One special character required").required("Password is required"),
  businessDetails: Yup.object({
    businessName: Yup.string().min(3, "Minimum 3 characters").required("Business name is required"),
  }),
});

const stepFields = [
  ["mobile", "gstin"],
  ["pickupAddress.name", "pickupAddress.mobile", "pickupAddress.pincode", "pickupAddress.address", "pickupAddress.locality", "pickupAddress.city", "pickupAddress.state"],
  ["bankDetails.accountHolderName", "bankDetails.accountNumber", "bankDetails.ifscCode"],
  ["sellerName", "email", "password", "businessDetails.businessName"],
];

const SellerAccountForm = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.sellerAuth);
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickupAddress: { name: "", mobile: "", pincode: "", address: "", locality: "", city: "", state: "" },
      bankDetails: { accountHolderName: "", accountNumber: "", ifscCode: "" },
      sellerName: "",
      email: "",
      password: "",
      businessDetails: { businessName: "" },
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createSeller(values));
    },
  });

  const handleNext = async () => {
    const fields = stepFields[activeStep];
    fields.forEach((field) => formik.setFieldTouched(field, true, false));
    const errors = await formik.validateForm();
    const hasError = fields.some((field) => {
      let value: unknown = errors;
      for (const key of field.split(".")) {
        value = typeof value === "object" && value !== null ? (value as Record<string, unknown>)[key] : undefined;
      }
      return Boolean(value);
    });

    if (!hasError) setActiveStep((step) => step + 1);
  };

  const formSteps = [
    <BecomeSellerFormStep1 formik={formik} key="contact" />,
    <BecomeSellerFormStep2 formik={formik} key="pickup" />,
    <BecomeSellerFormStep3 formik={formik} key="bank" />,
    <BecomeSellerFormStep4 formik={formik} key="business" />,
  ];

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      <div>
        <p className="text-xl font-bold text-center">Create seller account</p>
        <p className="text-sm text-center text-gray-500 mt-1">Step {activeStep + 1} of {formSteps.length}</p>
      </div>

      {formSteps[activeStep]}

      <div className="flex gap-3">
        {activeStep > 0 && <Button fullWidth variant="outlined" onClick={() => setActiveStep((step) => step - 1)}>Back</Button>}
        {activeStep < formSteps.length - 1 ? (
          <Button fullWidth variant="contained" onClick={handleNext}>Continue</Button>
        ) : (
          <Button fullWidth variant="contained" type="submit" disabled={loading}>{loading ? "Creating account..." : "Create account"}</Button>
        )}
      </div>
    </form>
  );
};

export default SellerAccountForm;
