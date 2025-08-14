import GradientText from "../components/GradientText";
import PassportBuilder from "../components/passport/PassportBuilder";

export default function Home() {
  return (
    <main className="py-12 space-y-10">
      <section className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          <GradientText>RISE Passport</GradientText>
        </h1>
        <p className="mt-3 text-white/70 max-w-2xl mx-auto">
          Create your RISE Passport and share it on X.
        </p>
      </section>

      <section id="preview">
        <PassportBuilder />
      </section>
    </main>
  );
}
