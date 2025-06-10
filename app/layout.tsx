import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProviders";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProviders";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import ClientOnly from "@/components/ClientOnly";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spotify Clone",
    description: "Listen to music",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userSong = await getSongsByUserId();
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <ClientOnly>
                            <Sidebar songs={userSong}>{children}</Sidebar>
                            <Player />
                        </ClientOnly>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}