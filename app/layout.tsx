import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from 'next/script'
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

eexport const metadata = {
  title: 'TypingPeak',
  description: 'Free typing speed test',
  verification: {
    google: '18hXJObs5KZ8IUBtxnPnCOoZQ9gcSmu1MfOmnU9ad0s',
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</main>
        <Footer />

        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-P4ZH8EQLJQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-P4ZH8EQLJQ');
</script>



      </body>
    </html>
  );
}
