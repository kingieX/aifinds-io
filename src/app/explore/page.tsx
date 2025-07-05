import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import ExploreClient from "./ExploreClient";

export default function ExplorePage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={<p className="text-center py-10">Loading tools...</p>}
      >
        <ExploreClient />
      </Suspense>
      <Footer />
    </>
  );
}
