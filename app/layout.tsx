import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

export const metadata = {
  title: "Sekolah Kopi Raisa",
  description: "Sistem informasi untuk mengelola kegiatan dan produk",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
