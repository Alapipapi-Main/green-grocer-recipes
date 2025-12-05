import { Header } from "@/components/layout/header";

export default function GeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {children}
    </div>
  );
}