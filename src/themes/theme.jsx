import { createTheme } from "@mui/material/styles";

export const createAppTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
        light: darkMode ? "#e3f2fd" : "#42a5f5",
        dark: darkMode ? "#42a5f5" : "#1565c0",
      },
      secondary: {
        main: darkMode ? "#f48fb1" : "#dc004e",
        light: darkMode ? "#fce4ec" : "#ff5983",
        dark: darkMode ? "#ad1457" : "#9a0036",
      },
      success: {
        main: darkMode ? "#81c784" : "#4caf50",
        light: darkMode ? "#e8f5e8" : "#e8f5e9",
      },
      warning: {
        main: darkMode ? "#ffb74d" : "#ff9800",
        light: darkMode ? "#fff3e0" : "#fff3e0",
      },
      error: {
        main: darkMode ? "#e57373" : "#f44336",
        light: darkMode ? "#ffebee" : "#ffebee",
      },
      background: {
        default: darkMode ? "#121212" : "#f8f9fa",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        background: darkMode
          ? "linear-gradient(45deg, #90caf9, #f48fb1)"
          : "linear-gradient(45deg, #1976d2, #dc004e)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 600,
        color: darkMode ? "#333333" : "#333333",
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
        color: darkMode ? "#333333" : "#444444",
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 500,
        color: darkMode ? "#333333" : "#555555",
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
      },
      h6: {
        fontSize: "1.1rem",
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: darkMode
              ? "linear-gradient(145deg, #1e1e1e, #2d2d2d)"
              : "linear-gradient(145deg, #ffffff, #f8f9fa)",
            boxShadow: darkMode
              ? "0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)"
              : "0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.08)",
            border: darkMode
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.05)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: darkMode
                ? "0 12px 40px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)"
                : "0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 8,
            padding: "10px 24px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
            },
          },
          contained: {
            backgroundImage: darkMode
              ? "linear-gradient(135deg, #1976d2, #1565c0)"
              : "linear-gradient(135deg, #1976d2, #1565c0)",
            boxShadow: darkMode
              ? "0 4px 14px rgba(25, 118, 210, 0.4)"
              : "0 4px 14px rgba(25, 118, 210, 0.3)",
            "&:hover": {
              boxShadow: darkMode
                ? "0 6px 20px rgba(25, 118, 210, 0.6)"
                : "0 6px 20px rgba(25, 118, 210, 0.4)",
            },
          },
          outlined: {
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: darkMode
              ? "linear-gradient(135deg, #0d47a1, #1565c0)"
              : "linear-gradient(135deg, #1976d2, #42a5f5)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-1px)",
              },
              "&.Mui-focused": {
                transform: "translateY(-1px)",
                boxShadow: darkMode
                  ? "0 4px 12px rgba(144, 202, 249, 0.3)"
                  : "0 4px 12px rgba(25, 118, 210, 0.2)",
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 6,
            "&.MuiChip-outlined": {
              borderWidth: "2px",
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
          filledSuccess: {
            backgroundImage: "linear-gradient(135deg, #4caf50, #66bb6a)",
          },
          filledError: {
            backgroundImage: "linear-gradient(135deg, #f44336, #ef5350)",
          },
          filledWarning: {
            backgroundImage: "linear-gradient(135deg, #ff9800, #ffa726)",
          },
          filledInfo: {
            backgroundImage: "linear-gradient(135deg, #2196f3, #42a5f5)",
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            height: 8,
          },
          bar: {
            borderRadius: 4,
          },
        },
      },
    },
  });
