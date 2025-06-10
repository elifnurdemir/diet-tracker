import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

type SnackbarContextType = {
  showSnackbar: (message: string, severity?: SnackbarState["severity"]) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (
    message: string,
    severity: SnackbarState["severity"] = "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
