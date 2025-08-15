import GradientText from "../components/GradientText";
import DiscordLoginButton from "../components/DiscordLoginButton";

export default function Home() {
  return (
    <main className="py-16">
      <section className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          <GradientText>RISE Passport</GradientText>
        </h1>
        <div className="space-y-2">
          <p className="text-white/80">
            RisePassport lets you create a visual identity tied to RiseChain,
            showcasing your involvement and commitment to the project.
          </p>
          <p className="text-white/80">
            Generate your personalized card and share it with your network to
            proudly display your journey within the Rise ecosystem.
          </p>
        </div>
        <div className="text-white/60 text-sm space-y-1">
          <p>
            Connect your Discord to generate your RisePassport from your roles.
            Add badges and share your card on X.
          </p>
          <p>
            Only your roles are used — access can be revoked anytime in Discord
            settings.
          </p>
        </div>
        <div className="flex justify-center">
          <DiscordLoginButton />
        </div>
      </section>
    </main>
  );
}
