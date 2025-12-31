import Image from "next/image";
import { Container, A, Button } from "./ui";

export default function Navbar({ links }: { links: { label: string; href: string }[] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-black">
            <Image
              src="https://dummyimage.com/64x64/000/fff.png&text=R"
              alt="Logo"
              fill
              className="object-cover"
              sizes="32px"
              priority
            />
          </div>
          <span className="text-base font-bold tracking-tight">Realty</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <A key={l.href} href={l.href}>
              {l.label}
            </A>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button>List Property</Button>
        </div>
      </Container>
    </header>
  );
}

