'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Radio, Headphones } from "lucide-react";
import { Appbar } from "@/components/Appbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import Spline from '@splinetool/react-spline/next';

export default async function LandingPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-black via-fuchsia-950 to-purple-950">
      <Appbar showThemeSwitch={false} />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="container relative flex min-h-[80vh] items-center px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left side content */}
            <div className="flex flex-col justify-center space-y-8 pt-8">
              <div className="space-y-4">
                <h1 className="animate-fade-up bg-gradient-to-r from-pink-500 via-fuchsia-400 to-purple-400 bg-clip-text text-5xl font-bold tracking-tighter text-transparent sm:text-6xl xl:text-7xl/none">
                  JiveJoint
                </h1>
                <p className="max-w-[600px] text-xl text-pink-200/80 md:text-2xl">
                  Where Music Meets Magic. Let Your Audience Shape the Rhythm.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="group relative w-fit overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-6 text-lg font-semibold text-white transition-all hover:shadow-[0_0_40px_8px_rgba(236,72,153,0.3)]">
                  <Link
                    href={{
                      pathname: "/auth",
                      query: { authType: "signUp" },
                    }}
                  >
                    Start Creating
                  </Link>
                </Button>
                <Button className="w-fit rounded-full border-2 border-pink-500/30 bg-transparent px-8 py-6 text-lg font-semibold text-pink-300 backdrop-blur-sm transition-all hover:border-pink-500/60 hover:text-pink-200">
                  Watch Demo
                </Button>
              </div>
            </div>
            {/* Right side Spline animation */}
            <div className="relative h-[600px] w-full">
              <Spline
                className="h-full w-full"
                scene="https://prod.spline.design/8cp-W9-MeZOM7CqC/scene.splinecode"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="w-full py-20">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold text-pink-200 sm:text-4xl">
              Experience the Magic
            </h2>
            <div className="grid gap-12 sm:grid-cols-3">
              <div className="group flex flex-col items-center space-y-4 rounded-3xl bg-gradient-to-b from-pink-500/10 to-purple-500/10 p-6 text-center transition-all hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.2)]">
                <Users className="h-12 w-12 text-pink-400" />
                <h3 className="text-xl font-bold text-pink-200">Fan Interaction</h3>
                <p className="text-pink-200/70">Create unforgettable moments with your audience in real-time.</p>
              </div>
              <div className="group flex flex-col items-center space-y-4 rounded-3xl bg-gradient-to-b from-pink-500/10 to-purple-500/10 p-6 text-center transition-all hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.2)]">
                <Radio className="h-12 w-12 text-purple-400" />
                <h3 className="text-xl font-bold text-pink-200">Live Streaming</h3>
                <p className="text-pink-200/70">Professional-grade streaming with seamless audience integration.</p>
              </div>
              <div className="group flex flex-col items-center space-y-4 rounded-3xl bg-gradient-to-b from-pink-500/10 to-purple-500/10 p-6 text-center transition-all hover:shadow-[0_0_20px_5px_rgba(236,72,153,0.2)]">
                <Headphones className="h-12 w-12 text-fuchsia-400" />
                <h3 className="text-xl font-bold text-pink-200">Studio Quality</h3>
                <p className="text-pink-200/70">Crystal clear audio that brings your music to life.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h2 className="text-3xl font-bold text-pink-200 sm:text-4xl">
                Ready to Transform Your Streams?
              </h2>
              <p className="mx-auto max-w-[600px] text-lg text-pink-200/70">
                Join JiveJoint today and create experiences that resonate.
              </p>
              <Link
                href={{
                  pathname: "/auth",
                  query: { authType: "signUp" },
                }}
              >
                <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-6 text-lg font-semibold text-white transition-all hover:shadow-[0_0_40px_8px_rgba(236,72,153,0.3)]">
                  Join the Revolution
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-pink-500/20 px-4 py-6 md:px-6">
        <div className="container flex flex-col items-center gap-4 sm:flex-row">
          <p className="text-sm text-pink-200/60">
            © 2024 JiveJoint. All rights reserved.
          </p>
          <nav className="flex gap-6 sm:ml-auto">
            <Link
              className="text-sm text-pink-200/60 transition-colors hover:text-pink-400"
              href="#"
            >
              Terms
            </Link>
            <Link
              className="text-sm text-pink-200/60 transition-colors hover:text-pink-400"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}