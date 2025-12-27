import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}
