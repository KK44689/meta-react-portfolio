import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Field,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Portal,
  createListCollection
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => { },
    validationSchema: Yup.object({}),
  });

  const options = createListCollection({
    items: [
      { label: "Freelance project proposal", value: "hireMe" },
      { label: "Open source consultancy session", value: "openSource" },
      { label: "Other", value: "other" },
    ],
  })

  const [value, setValue] = useState([options.items[0].value]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form>
            <VStack spacing={4}>
              <Field.Root invalid={false}>
                <Field.Label htmlFor="firstName">Name</Field.Label>
                <Input
                  id="firstName"
                  name="firstName"
                />
                <Field.ErrorText ></Field.ErrorText>
              </Field.Root >
              <Field.Root invalid={false}>
                <Field.Label htmlFor="email">Email Address</Field.Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                />
                <Field.ErrorText></Field.ErrorText>
              </Field.Root >
              <Field.Root >
                <Field.Label htmlFor="type">Type of enquiry</Field.Label>
                <Select.Root
                  collection={options}
                  value={value}
                  onValueChange={(e) => setValue(e.value)}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={value} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {options.items.map((option) => (
                          <Select.Item item={option} key={option.value}>
                            {option.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Field.Root >
              <Field.Root invalid={false}>
                <Field.Label htmlFor="comment">Your message</Field.Label>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                />
                <Field.ErrorText></Field.ErrorText>
              </Field.Root >
              <Button type="submit" colorScheme="purple" width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;
