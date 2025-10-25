import React, { useEffect, useRef, useState } from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@example.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const sections = [
  {
    id: "contactme",
    label: "Contract Me",
    url: "#contactme"
  },
  {
    id: "projects",
    label: "Project",
    url: "#projects"
  }];

const Header = () => {
  const handleClick = (anchor) => {
    const id = `${anchor}-section`;
    console.log(`handleClick ${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  //Handle header transitions
  const scrollPos = useRef(0);
  const [showHeader, setShowHeader] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > scrollPos.current && currentScrollY > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      scrollPos.current = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      transform={showHeader ? "traslateY(0)" : "translateY(-200%)"}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex={1000}
      ref={headerRef}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            {/* Add social media links based on the `socials` data */}
            <HStack spacing={8}>
              {
                socials.map(social => {
                  return (<a href={social.url}>
                    <FontAwesomeIcon icon={social.icon} size="2x" />

                  </a>)
                })
              }
            </HStack>
          </nav>
          <nav>
            <HStack gap="8">
              {/* Add links to Projects and Contact me section */}
              {
                sections.map((section) => {
                  return (
                    <a href={section.url} onClick={() => handleClick(section.id)}>{section.label}</a>
                  );
                })
              }
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
