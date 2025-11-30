import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Phone as PhoneIcon,
  Tablet as TabletIcon,
  Computer as ComputerIcon,
} from "@mui/icons-material";

const ModalTest = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Открыть модальное окно
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400, md: 500 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Тестовое модальное окно
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography id="modal-description" sx={{ mb: 3 }}>
            Это модальное окно должно корректно работать на всех размерах
            экрана. Проверьте как оно выглядит на мобильных устройствах,
            планшетах и десктопах.
          </Typography>

          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            <Button onClick={() => setOpen(false)}>Отмена</Button>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Подтвердить
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const DialogTest = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Открыть диалог
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Тестовый диалог</DialogTitle>

        <DialogContent>
          <Typography>
            Этот диалог использует компонент Dialog из Material-UI. Он должен
            автоматически адаптироваться под разные размеры экрана.
          </Typography>

          <TextField
            autoFocus
            margin="dense"
            label="Тестовое поле"
            type="text"
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const ResponsiveNavTest = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ mb: 4 }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Адаптивная навигация
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit">Главная</Button>
              <Button color="inherit">Технологии</Button>
              <Button color="inherit">Статистика</Button>
              <Button color="inherit">Настройки</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {["Главная", "Технологии", "Статистика", "Настройки"].map(
              (text) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

const ResponsiveTestSuite = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getCurrentDevice = () => {
    if (isXs) return { icon: <PhoneIcon />, name: "Мобильный (xs)" };
    if (isSm) return { icon: <PhoneIcon />, name: "Планшет (sm)" };
    if (isMd) return { icon: <TabletIcon />, name: "Планшет (md)" };
    if (isLg) return { icon: <ComputerIcon />, name: "Десктоп (lg)" };
    return { icon: <ComputerIcon />, name: "Десктоп (xl)" };
  };

  const currentDevice = getCurrentDevice();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Тестирование адаптивности
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {currentDevice.icon}
          <Typography variant="h6" color="primary">
            Текущее устройство: {currentDevice.name}
          </Typography>
        </Box>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Активные breakpoints:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Chip
              label={`xs: ${isXs}`}
              color={isXs ? "primary" : "default"}
              variant={isXs ? "filled" : "outlined"}
            />
            <Chip
              label={`sm: ${isSm}`}
              color={isSm ? "primary" : "default"}
              variant={isSm ? "filled" : "outlined"}
            />
            <Chip
              label={`md: ${isMd}`}
              color={isMd ? "primary" : "default"}
              variant={isMd ? "filled" : "outlined"}
            />
            <Chip
              label={`lg: ${isLg}`}
              color={isLg ? "primary" : "default"}
              variant={isLg ? "filled" : "outlined"}
            />
          </Box>
        </CardContent>
      </Card>

      <ResponsiveNavTest />

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Сетка" />
          <Tab label="Модальные окна" />
          <Tab label="Формы" />
          <Tab label="Компоненты" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Адаптивная сетка Grid
          </Typography>

          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Карточка {item}
                    </Typography>
                    <Typography>
                      Эта карточка адаптируется под разные размеры экрана:
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip size="small" label="xs: 12/12" variant="outlined" />
                      <Chip
                        size="small"
                        label="sm: 6/12"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                      <Chip
                        size="small"
                        label="md: 4/12"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                      <Chip
                        size="small"
                        label="lg: 3/12"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Тестирование модальных окон и диалогов
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Модальное окно (Modal)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Компонент Modal с кастомным позиционированием
                  </Typography>
                  <ModalTest />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Диалог (Dialog)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Компонент Dialog с автоматической адаптацией
                  </Typography>
                  <DialogTest />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {tabValue === 2 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Адаптивные формы
          </Typography>

          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Имя" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Фамилия" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField label="Адрес" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField label="Индекс" fullWidth variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" size="large">
                    Отправить форму
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}

      {tabValue === 3 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            Разные компоненты MUI
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Прогресс-бар
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Прогресс: 75%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Кнопки разных размеров
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    <Button variant="contained" size="small">
                      Small
                    </Button>
                    <Button variant="contained" size="medium">
                      Medium
                    </Button>
                    <Button variant="contained" size="large">
                      Large
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Чипы (Chips)
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    <Chip label="Обычный" />
                    <Chip label="Outlined" variant="outlined" />
                    <Chip label="Цветной" color="primary" />
                    <Chip label="Успех" color="success" />
                    <Chip label="Ошибка" color="error" />
                    <Chip label="Предупреждение" color="warning" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ResponsiveTestSuite;
