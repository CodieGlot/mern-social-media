import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const isLogin = false;

  return (
    <Box>
      <Box
        width="100%"
        p="1rem 6%"
        textAlign="center"
        sx={{ backgroundColor: theme.palette.background.alt }}
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          CodieMedia
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        sx={{ backgroundColor: theme.palette.background.alt }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to CodieMedia, the Social Media for Codieism!
        </Typography>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </Box>
    </Box>
  );
};

export default AuthPage;
