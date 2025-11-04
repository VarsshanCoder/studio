import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import FeaturesGrid from '@/components/sections/features';
import HowItWorks from '@/components/sections/how-it-works';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturesGrid />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
