import "./globals.css";

export const metadata = {
  title: "Village — It takes a village. Find yours.",
  description:
    "Village is a community app for single parents. Find verified single parents nearby, join meetups, and unlock local family deals. Launching first in Atlanta.",
  openGraph: {
    title: "Village — It takes a village. Find yours.",
    description:
      "A community app for single parents: real connections, real meetups, real local deals. Launching in Atlanta.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Nunito:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
