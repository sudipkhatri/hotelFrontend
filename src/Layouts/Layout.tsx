import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Hero from "../Components/Hero";

//name should be Cap
interface Props{
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      {/* flex-1 occupies the height */}
      <div className="py-10 w-[80vw] xl:w-[60vw] mx-auto flex-1 container">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
