import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import HomeClient from "./HomeClient";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={<p className="text-center py-10">Loading home page...</p>}
      >
        <HomeClient />
      </Suspense>
      <Footer />
    </>
  );
}
