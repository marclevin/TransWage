"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { TokenContext } from "@/context";

export default function SignIn() {
  const { setToken } = React.useContext(TokenContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const postData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/login`);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      var jsonResponse = await response.json();
      if (jsonResponse.token) {
        setToken(jsonResponse.token);
        console.log(jsonResponse.token);
        window.location.href = "/";
      }
    });
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Card variant="outlined" sx={{ width: 400, padding: 4 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <TextField
              id="username"
              name="username"
              placeholder="Username"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: "username" }}
            />
          </FormControl>
          <FormControl>
            <TextField
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
}
