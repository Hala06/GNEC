import SectionDivider from '../../components/Ui/SectionDivider';
import HeroSection from '../../components/sections/Hero/HeroSection';
import WhyNeeded from '../../components/sections/WhyNeeded';
import Features from '../../components/sections/Features/Features';
import TextToSpeechDemo from '../../components/sections/Demo/TextToSpeechAndClickToRead';
import About from '../../components/sections/About/About';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SectionDivider variant={1} />
      <WhyNeeded />
      <SectionDivider variant={2} />
      <Features />
      <SectionDivider variant={2} />
      <TextToSpeechDemo />
      <SectionDivider variant={3} />
      <About />
    </>
  );
};

export default HomePage;
