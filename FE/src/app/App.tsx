import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { appRouter } from "../core/router";
import { AuthProvider } from "../context/AuthContext";

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() ??
  "905860478642-324157lupm1u7oipb0smc3f28g79fah1.apps.googleusercontent.com";

export default function App(): JSX.Element {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <RouterProvider router={appRouter} />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
