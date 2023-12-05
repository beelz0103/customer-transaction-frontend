import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

export const WelcomePage = () => {
  return (
    <div className="home-page__prelogin">
      <h4>Welcome to Customer Transaction!</h4>
      <h6>New here? You can sign up below.</h6>
      <SignUpButton />
    </div>
  );
};

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button className="button__sign-up" onClick={handleSignUp}>
      Sign Up
    </Button>
  );
};
