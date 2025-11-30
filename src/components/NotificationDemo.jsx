import React, { useState } from "react";
import {
  Snackbar,
  Alert,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

const NotificationDemo = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, severity = "info", autoHide = 6000) => {
    const newNotification = {
      id: Date.now(),
      message,
      severity,
      autoHide,
      open: true,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const handleClose = (id, reason) => {
    if (reason === "clickaway") return;
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "success":
        return <CheckCircleIcon />;
      case "error":
        return <ErrorIcon />;
      case "warning":
        return <WarningIcon />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h1"
          sx={{
            mb: 2,
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
        >
          Уведомления
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
          Демонстрация системы уведомлений Material-UI
        </Typography>
        <Chip
          icon={<NotificationsIcon />}
          label={`Активных уведомлений: ${notifications.length}`}
          color="primary"
          variant="outlined"
        />
      </Box>
      <Grid item xs={12} md={4}>
        <Card sx={{ height: "100%", width: "20%", margin: "auto" }}>
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <NotificationsIcon color="primary" />
              Управление уведомлениями
            </Typography>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
            >
              <Button
                variant="contained"
                color="info"
                startIcon={<InfoIcon />}
                onClick={() =>
                  showNotification(
                    "📢 Информационное сообщение: Система работает стабильно",
                    "info"
                  )
                }
                sx={{ py: 1.5 }}
              >
                Информация
              </Button>

              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={() =>
                  showNotification(
                    "✅ Успех: Данные успешно сохранены в системе",
                    "success",
                    4000
                  )
                }
                sx={{ py: 1.5 }}
              >
                Успех
              </Button>

              <Button
                variant="contained"
                color="warning"
                startIcon={<WarningIcon />}
                onClick={() =>
                  showNotification(
                    "⚠️ Внимание: Некоторые функции могут быть временно недоступны",
                    "warning",
                    8000
                  )
                }
                sx={{ py: 1.5 }}
              >
                Предупреждение
              </Button>

              <Button
                variant="contained"
                color="error"
                startIcon={<ErrorIcon />}
                onClick={() =>
                  showNotification(
                    "❌ Ошибка: Не удалось подключиться к серверу. Проверьте соединение.",
                    "error",
                    10000
                  )
                }
                sx={{ py: 1.5 }}
              >
                Ошибка
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={clearAll}
                sx={{ mt: 2, py: 1.5 }}
              >
                Очистить все
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={notification.open}
          autoHideDuration={notification.autoHide}
          onClose={(event, reason) => handleClose(notification.id, reason)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            position: "fixed",
            bottom: `${20 + index * 80}px !important`,
            transform: "none !important",
          }}
        >
          <Alert
            severity={notification.severity}
            onClose={() => handleClose(notification.id)}
            variant="filled"
            icon={getSeverityIcon(notification.severity)}
            sx={{
              minWidth: 350,
              backdropFilter: "blur(10px)",
              "& .MuiAlert-message": {
                flex: 1,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <Box sx={{ flex: 1 }}>{notification.message}</Box>
              <IconButton
                size="small"
                onClick={() => handleClose(notification.id)}
                sx={{
                  color: "inherit",
                  mt: -0.5,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
};

export default NotificationDemo;
