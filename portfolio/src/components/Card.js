import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Card as ChakraCard } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.

  return (
    <VStack>
      <ChakraCard.Root maxW="sm" h="%" overflow="hidden" zIndex="base">
        <Image src={imageSrc} alt={title} />
        <ChakraCard.Body>
          <ChakraCard.Title>{title}</ChakraCard.Title>
          <ChakraCard.Description>{description}</ChakraCard.Description>
        </ChakraCard.Body>
        <ChakraCard.Footer>
          <Text>See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x"/>
        </ChakraCard.Footer>
      </ChakraCard.Root>
    </VStack>
  );
};

export default Card;
