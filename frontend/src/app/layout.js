import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>

        {children}

        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={12}
            toastOptions={{
                duration: 3000,
                style: {
                    borderRadius: "10px",
                    background: "#fff",
                    color: "#111827",
                },
                success: {
                    iconTheme: {
                        primary: "#16a34a",
                        secondary: "#fff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#dc2626",
                        secondary: "#fff",
                    },
                },
            }}
        />

      </body>
    </html>
  );
}