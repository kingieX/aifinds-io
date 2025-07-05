import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; 2025 aifinds.io. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with ❤️ by{" "}
          <a
            href="https://x.com/ObaTheDeveloper"
            className="text-primary hover:underline"
          >
            Oba The Developer
          </a>
        </p>
        <div className="flex gap-4 text-sm">
          <Link
            href="/about"
            className="hover:text-primary text-muted-foreground"
          >
            About
          </Link>
          <Link
            href="/terms"
            className="hover:text-primary text-muted-foreground"
          >
            Terms of Use
          </Link>
          <Link
            href="/privacy"
            className="hover:text-primary text-muted-foreground"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
