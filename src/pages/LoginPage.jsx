import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import FlexBetween from "components/FlexBetween";
import { Formik } from "formik";
import { URL } from "helper";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";
import * as yup from "yup";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  //login Initial Value:
  const initialValueLogin = {
    email: "",
    password: "",
  };

  //register Initial Value:
  const initialValueRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
  };

  // login Schema:
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("enter valid email")
      .required("This field is mandatory"),
    password: yup
      .string()
      .min(4, "Password length should be atleast 4 characters.")
      .max(12, "Password length cannot be more than 12 characters."),
  });

  // login Schema:
  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup
      .string()
      .email("enter valid email")
      .required("This field is mandatory"),
    password: yup
      .string()
      .min(4, "Password length should be atleast 4 characters.")
      .max(12, "Password length cannot be more than 12 characters."),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
  });

  const handleLogin = async (values, resetForm) => {
    console.log("values", values);

    const response = await axios.post(`${URL}/auth/login`, values);
    if (response.status === 200) {
      dispatch(setLogin(response.data));
      navigate("/home");
    }
    resetForm();
    console.log("res:", response);
  };
  const handleRegister = async (values, resetForm) => {
    const response = await axios.post(`${URL}/auth/register`, values);
    console.log("values:", values);
  };

  const handleFormSubmit = (values, resetForm) => {
    pageType === "login"
      ? handleLogin(values, resetForm)
      : handleRegister(values, resetForm);
  };
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Instagram
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Instagram, the Social Media for Sociopaths!
        </Typography>

        {/* Form handle */}
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={
            pageType === "login" ? initialValueLogin : initialValueRegister
          }
          validationSchema={pageType === "login" ? loginSchema : registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => {
            console.log("formik", { values, errors });

            return (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  {pageType === "login" ? (
                    <>
                      <TextField
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        onBlur={handleBlur}
                        value={values.email}
                        sx={{ gridColumn: "span 4" }}
                      />

                      <TextField
                        label="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        error={
                          Boolean(touched.password) && Boolean(errors.password)
                        }
                        helperText={touched.password && errors.password}
                        onBlur={handleBlur}
                        value={values.password}
                        sx={{ gridColumn: "span 4" }}
                      />
                    </>
                  ) : (
                    // register fields
                    <>
                      <TextField
                        type="text"
                        autoComplete={false}
                        label="First Name"
                        name="firstName"
                        onChange={handleChange}
                        error={
                          Boolean(touched.firstName) &&
                          Boolean(errors.firstName)
                        }
                        helperText={touched.firstName && errors.firstName}
                        onBlur={handleBlur}
                        value={values.firstName}
                        sx={{ gridColumn: "span 2" }}
                      />

                      <TextField
                        label="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        error={
                          Boolean(touched.lastName) && Boolean(errors.lastName)
                        }
                        helperText={touched.lastName && errors.lastName}
                        onBlur={handleBlur}
                        value={values.lastName}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        label="Location"
                        name="location"
                        onChange={handleChange}
                        error={
                          Boolean(touched.location) && Boolean(errors.location)
                        }
                        helperText={touched.location && errors.location}
                        onBlur={handleBlur}
                        value={values.location}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <TextField
                        label="Occupation"
                        name="occupation"
                        onChange={handleChange}
                        error={
                          Boolean(touched.occupation) &&
                          Boolean(errors.occupation)
                        }
                        helperText={touched.occupation && errors.occupation}
                        onBlur={handleBlur}
                        value={values.occupation}
                        sx={{ gridColumn: "span 4" }}
                      />
                      <Box
                        gridColumn="span 4"
                        border={`1px solid ${palette.neutral.medium}`}
                        borderRadius="5px"
                        p="1rem"
                      >
                        <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          multiple={false}
                          onDrop={(acceptedFiles) =>
                            setFieldValue("picture", acceptedFiles[0])
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <Box
                              {...getRootProps()}
                              border={`2px dashed ${palette.primary.main}`}
                              p="1rem"
                              sx={{ "&:hover": { cursor: "pointer" } }}
                            >
                              <input {...getInputProps()} />
                              {!values.picture ? (
                                <p>Add Picture Here</p>
                              ) : (
                                <FlexBetween>
                                  <Typography>{values.picture.name}</Typography>
                                  <EditOutlinedIcon />
                                </FlexBetween>
                              )}
                            </Box>
                          )}
                        </Dropzone>
                      </Box>
                      <TextField
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        onBlur={handleBlur}
                        value={values.email}
                        sx={{ gridColumn: "span 4" }}
                      />

                      <TextField
                        label="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        error={
                          Boolean(touched.password) && Boolean(errors.password)
                        }
                        helperText={touched.password && errors.password}
                        onBlur={handleBlur}
                        value={values.password}
                        sx={{ gridColumn: "span 4" }}
                      />
                    </>
                  )}
                </Box>
                {/* Buttons */}
                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      m: "2rem 0",
                      p: "1rem",
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.main },
                    }}
                  >
                    {pageType === "login" ? "LOGIN" : "REGISTER"}
                  </Button>
                </Box>
                <Typography
                  onClick={() => {
                    setPageType(pageType === "login" ? "register" : "login");
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                      color: palette.primary.light,
                    },
                  }}
                >
                  {pageType === "login"
                    ? "Dont have an account? Sign Up here."
                    : "Already have an account? Login here."}
                </Typography>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginPage;
