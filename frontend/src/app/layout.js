import "./globals.css";

import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body>
                {children}

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </body>
        </html>
    );
}