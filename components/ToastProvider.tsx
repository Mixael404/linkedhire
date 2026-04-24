"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastStyle={{
        background: "#0D1426",
        border: "1px solid #1B2847",
        color: "#E2E8F0",
        fontFamily: "var(--font-manrope)",
        fontSize: "14px",
      }}
    />
  );
}
