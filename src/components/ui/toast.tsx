"use client"

import { Toaster as HotToaster, toast } from "react-hot-toast"

const Toaster = () => {
  return (
    <HotToaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#ffffff",
          color: "#0f172a",
          borderRadius: "0.5rem",
          border: "1px solid #e2e8f0",
          padding: "12px 16px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
          fontSize: "14px",
          fontWeight: 500,
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        },
        success: {
          iconTheme: {
            primary: "#0d9488",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#dc2626",
            secondary: "#fff",
          },
        },
      }}
    />
  )
}

export { Toaster, toast }
