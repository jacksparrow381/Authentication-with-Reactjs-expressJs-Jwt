import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("*Name is a required field")
    .min(3, "*Name must be at least 3 characters"),
  email: Yup.string()
    .required("*Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("*Password is a required field")
    .min(8, "*Password must be at least 8 characters"),
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        DevSoul Technologies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={async (values) => {
          const response = await axios.post(
            "http://localhost:5000/api/auth/signUp",
            values
          );

          if (response.status === 200) {
            // clear the form
            values.name = "";
            values.email = "";
            values.password = "";
            // redirect to success page
            navigate("/success");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
        }) => (
          <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage:
                    "url(https://media.licdn.com/dms/image/C5612AQFuulMX5vBxwQ/article-cover_image-shrink_720_1280/0/1613916172320?e=2147483647&v=beta&t=C75K73RiesyzU9Opo23isR0fOjCog0FT_YhamMF1T0I)",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
              >
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      onChange={(e) => {
                        setFieldValue("name", e.target.value);
                      }}
                      onBlur={handleBlur}
                      value={values.name}
                      label="User Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                    />
                    {/* If validation is not passed show errors */}
                    <Typography style={{ color: "red" }}>
                      {errors.name && touched.name && errors.name}
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      onChange={(e) => {
                        setFieldValue("email", e.target.value);
                      }}
                      onBlur={handleBlur}
                      value={values.email}
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    {/* If validation is not passed show errors */}
                    <Typography style={{ color: "red" }}>
                      {errors.email && touched.email && errors.email}
                    </Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      onChange={(e) => {
                        setFieldValue("password", e.target.value);
                      }}
                      onBlur={handleBlur}
                      value={values.password}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    {/* If validation is not passed show errors */}
                    <Typography style={{ color: "red" }}>
                      {errors.password && touched.password && errors.password}
                    </Typography>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/login" variant="body2">
                          {"Already have an account? Log In"}
                        </Link>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
