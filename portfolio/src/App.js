import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AlertProvider } from "./context/alertContext";
import Header from "./components/Header";
import LandingSection from "./components/LandingSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactMeSection from "./components/ContactMeSection.js";
import Footer from "./components/Footer";
import Alert from "./components/Alert";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <AlertProvider>
        <main>
          <Header />
          <LandingSection />
          <ProjectsSection id="projects-section"/>
          <ContactMeSection id="contactme-section"/>
          <Footer />
          <Alert />
        </main>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
