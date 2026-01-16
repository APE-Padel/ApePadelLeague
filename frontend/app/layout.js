import Header from "@/components/Header";
import ThemeRegistry from "./ThemeRegistry";
import "./globals.css";

export const metadata = {
  title: 'APE Padel League',
  icons: {
    icon: '/logo.png'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body className="app-bg">
        <ThemeRegistry>
          <Header/>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
