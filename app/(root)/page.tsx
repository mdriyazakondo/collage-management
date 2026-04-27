import AboutSection from "./_components/AboutSection";
import AccountingDepartment from "./_components/AccountingDepartment";
import Faculty from "./_components/Faculty";
import GallerySection from "./_components/GallerySection";
import Hero from "./_components/Hero";
import Principals from "./_components/Principles";
import Students from "./_components/Students";

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <Principals />
      <AccountingDepartment />
      <GallerySection />
      <Faculty />
      <Students />
    </div>
  );
};

export default Home;
