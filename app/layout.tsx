import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/components/SocketProvider";
import { Skiper26, ThemeToggleButton } from "@/components/ui/blur-mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hackathon Project",
  description: "Hackathon Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SocketProvider>{children}</SocketProvider>
          <div className="fixed bottom-4 right-4">
            <ThemeToggleButton variant="circle" start="bottom-right" blur={true} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
