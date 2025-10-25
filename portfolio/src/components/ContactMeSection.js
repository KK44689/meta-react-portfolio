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
import { MoonLoader } from "react-spinners";

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen, onClose } = useAlertContext();

  const formik = useFormik({
    initialValues: { firstName: "", email: "", type: "", comment: "" },
    onSubmit: (values) => { submit("", values) },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      type: Yup.string(),
      comment: Yup.string().min(25, "Must be at least 25 characters.").required("Required")
    }),
  });

  const options = createListCollection({
    items: [
      { label: "Freelance project proposal", value: "hireMe" },
      { label: "Open source consultancy session", value: "openSource" },
      { label: "Other", value: "other" },
    ],
  })

  const [value, setValue] = useState([options.items[0].value]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  }

  const handleClickOutsideElement = (e) => {
    onClose();
    document.removeEventListener("mousedown", handleClickOutsideElement);
  }

  useEffect(() => {
    if (response != null) {
      onOpen(response.type, response.message);
      document.addEventListener("mousedown", handleClickOutsideElement);
      if(response.type==="success") {
        formik.resetForm();
      }
    }
  }, [response]);

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
          <form onSubmit={handleOnSubmit}>
            <VStack spacing={4}>
              <Field.Root invalid={formik.touched.firstName && formik.errors.firstName}>
                <Field.Label htmlFor="firstName">Name</Field.Label>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                />
                <Field.ErrorText>{formik.errors.firstName}</Field.ErrorText>
              </Field.Root >
              <Field.Root invalid={formik.touched.email && formik.errors.email}>
                <Field.Label htmlFor="email">Email Address</Field.Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                <Field.ErrorText>{formik.errors.email}</Field.ErrorText>
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
              <Field.Root invalid={formik.touched.comment && formik.errors.comment}>
                <Field.Label htmlFor="comment">Your message</Field.Label>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
                <Field.ErrorText>{formik.errors.comment}</Field.ErrorText>
              </Field.Root >
              <Button type="submit" colorScheme="purple" width="full">
                {isLoading ? <MoonLoader color="#ffffff" size="16px" /> : "Submit"}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;
