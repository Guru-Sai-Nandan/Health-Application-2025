import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <VStack justify="center" align="center" h="80vh" spacing={4}>
      <Heading size="2xl" color="red.500">
        404
      </Heading>
      <Text fontSize="lg">Oops! The page you’re looking for doesn’t exist.</Text>
      <NavLink to="/">
        <Button colorScheme="blue">Go Home</Button>
      </NavLink>
    </VStack>
  );
};

export default NotFound;
