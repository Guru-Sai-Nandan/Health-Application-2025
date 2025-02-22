import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Box, Button, Text, VStack, Heading } from "@chakra-ui/react";

function DiseaseFoodRestrictions() {
    const [diseases, setDiseases] = useState([]);
    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [foodsToAvoid, setFoodsToAvoid] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/diseases")
            .then(response => response.json())
            .then(data => setDiseases(data.diseases || []))
            .catch(error => console.error("Error fetching diseases:", error));
    }, []);

    const getFoodsToAvoid = async () => {
        if (selectedDiseases.length === 0) {
            setFoodsToAvoid(["Please select at least one disease."]);
            return;
        }

        let foodSet = new Set();

        for (const diseaseObj of selectedDiseases) {
            try {
                const response = await fetch(
                    `http://127.0.0.1:5000/foods-to-avoid?disease=${encodeURIComponent(diseaseObj.value)}`
                );
                const data = await response.json();
                if (data.foods_to_avoid) {
                    data.foods_to_avoid.forEach(food => foodSet.add(food));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        setFoodsToAvoid(Array.from(foodSet));
    };

    return (
        <Box
            p={6}
            bgGradient="linear(to-r, blue.400, purple.400)"
            borderRadius="lg"
            boxShadow="lg"
            maxW="500px"
            mx="auto"
            color="white"
            textAlign="center"
        >
            <Heading fontSize="2xl" mb={4}>Disease & Food Restrictions</Heading>

            {/* Custom Multi-Select */}
            <Select
                options={diseases.map(disease => ({ value: disease, label: disease }))}
                isMulti
                placeholder="Select Diseases..."
                value={selectedDiseases}
                onChange={setSelectedDiseases}
                styles={{
                    control: (provided) => ({
                        ...provided,
                        background: "white",
                        borderRadius: "8px",
                        padding: "4px",
                        borderColor: "blue.500",
                        boxShadow: "none",
                        "&:hover": { borderColor: "purple.500" }
                    }),
                    menu: (provided) => ({
                        ...provided,
                        background: "white",
                        color: "black",
                        borderRadius: "8px"
                    }),
                    multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: "blue.200",
                        borderRadius: "12px",
                        padding: "2px 8px",
                        color: "black"
                    }),
                    multiValueLabel: (provided) => ({
                        ...provided,
                        color: "black"
                    }),
                    multiValueRemove: (provided) => ({
                        ...provided,
                        color: "red",
                        "&:hover": { backgroundColor: "red.300", color: "white" }
                    })
                }}
            />

            <Button
                colorScheme="yellow"
                onClick={getFoodsToAvoid}
                mt={4}
                width="full"
                borderRadius="full"
                _hover={{ bg: "yellow.500" }}
            >
                Search
            </Button>

            <VStack align="start" bg="white" p={4} borderRadius="md" boxShadow="md" color="black" mt={4}>
                {foodsToAvoid.length > 0 ? (
                    foodsToAvoid.map((food, index) => (
                        <Text key={index} fontSize="md" fontWeight="semibold" color="red.500">
                            • {food}
                        </Text>
                    ))
                ) : (
                    <Text fontSize="md">No data available.</Text>
                )}
            </VStack>
        </Box>
    );
}

export default DiseaseFoodRestrictions;
