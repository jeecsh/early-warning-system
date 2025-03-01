import FinancialWarning from './components/heading';
import HeroSection from './components/hero';
// import HowItWorksSection  from './components/process';

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* <HowItWorksSection /> */}
      <FinancialWarning/>
    </main>
  );
}
