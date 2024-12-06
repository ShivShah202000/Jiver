"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { Music2 } from "lucide-react";

export function Appbar({ showThemeSwitch = true, isSpectator = false }) {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="fixed left-0 right-0 top-0 z-50 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-4 md:px-10 xl:px-20">
        <div
          onClick={() => {
            router.push("/home");
          }}
          className={`group flex items-center gap-2 hover:cursor-pointer ${
            showThemeSwitch 
              ? "text-pink-500 hover:text-pink-400" 
              : "text-white hover:text-pink-300"
          }`}
        >
          <Music2 className="h-6 w-6 transition-transform group-hover:rotate-12" />
          <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
            JiveJoint
          </span>
        </div>

        <div className="flex items-center gap-4">
          {isSpectator && (
            <WalletMultiButton className="rounded-full !bg-purple-600 px-6 py-2 font-semibold text-white transition-all hover:!bg-purple-700 hover:shadow-[0_0_20px_5px_rgba(147,51,234,0.3)]" />
          )}
          
          {session.data?.user ? (
            <Button
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 font-semibold text-white transition-all hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.3)]"
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 font-semibold text-white transition-all hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.3)]"
                onClick={() => router.push("/auth")}
              >
                Sign In
              </Button>
              <Link
                href={{
                  pathname: "/auth",
                  query: {
                    authType: "signUp",
                  },
                }}
              >
                <Button
                  variant={"ghost"}
                  className="rounded-full border-2 border-pink-500/30 bg-transparent px-6 py-2 font-semibold text-pink-300 backdrop-blur-sm transition-all hover:border-pink-500/60 hover:text-pink-200"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {showThemeSwitch && <ThemeSwitcher />}
        </div>
      </div>
    </div>
  );
}