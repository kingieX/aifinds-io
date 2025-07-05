import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubmitForm from "@/components/SubmitForm";

export default function SubmitPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Submit an AI Tool
        </h1>
        <p className="text-muted-foreground text-center mb-10">
          Share your AI tool or model with the world. Fill out the form below to
          get listed on aifinds.io.
        </p>
        <SubmitForm />
      </main>
      <Footer />
    </>
  );
}
