"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-0 h-64 bg-gradient-to-b from-primary/10 to-transparent"
          ></div>
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight">
                Never wonder what to cook again.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Turn your leftover ingredients into delicious meals. Our AI
                chef will help you discover amazing recipes you can make right
                now.
              </p>
              <Link href="/generator" passHref>
                <Button size="lg" className="group mt-4">
                  Start Cooking
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl group">
               <Image
                src="https://picsum.photos/seed/1/1200/800"
                alt="Delicious food"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint="food cooking"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
