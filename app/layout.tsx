import { text } from "@/app/fonts"
import type { Metadata } from "next";
import "./globals.css";

import { SocketProvider } from "@/components/SocketProvider";
import { ThemeToggleButton } from "@/components/ui/blur-mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

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
      <body className={text.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SocketProvider>{children}</SocketProvider>
          <div className="fixed bottom-4 right-4">
            {/* <ThemeToggleButton variant="circle" start="bottom-right" blur={true} /> */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
