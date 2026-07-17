import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">

        <body>

            {children}

            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={10}
                toastOptions={{
                    duration: 3000,

                    style: {
                        borderRadius: "12px",
                        background: "#ffffff",
                        color: "#1f2937",
                        fontSize: "14px",
                        boxShadow:
                            "0 10px 25px rgba(0,0,0,.12)",
                    },

                    success: {
                        iconTheme: {
                            primary: "#16a34a",
                            secondary: "#ffffff",
                        },
                    },

                    error: {
                        iconTheme: {
                            primary: "#dc2626",
                            secondary: "#ffffff",
                        },
                    },

                    loading: {
                        iconTheme: {
                            primary: "#2563eb",
                            secondary: "#ffffff",
                        },
                    },
                }}
            />

        </body>

    </html>
  );
}