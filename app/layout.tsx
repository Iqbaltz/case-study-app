import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import AuthProvider from "./AuthProvider";
import NavMenu from "./NavMenu";
import { ReduxProvider } from "@/redux/provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "700", "300"] });

export const metadata: Metadata = {
  title: "Study Case App",
  description: "by iqbal",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider session={session}>
      <html lang="en">
        <ReduxProvider>
          <body className={inter.className}>
            <NavMenu />
            {children}
          </body>
        </ReduxProvider>
      </html>
    </AuthProvider>
  );
}
