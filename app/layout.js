import "./globals.css";

export const metadata = {
  title: "Village — It takes a village. Find yours.",
  description:
    "Village is the community app for single parents. Connect with verified single parents nearby, join meetups, and book background-checked sitters.",
  openGraph: {
    title: "Village — It takes a village. Find yours.",
    description:
      "The community app for single parents: real connections, real meetups, verified sitters, and local family deals.",
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
