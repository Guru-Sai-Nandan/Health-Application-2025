import React from 'react';
import { Box, Image, Text, IconButton } from '@chakra-ui/react';
import { MdCallMissedOutgoing } from 'react-icons/md';

function DisplayCard({ title, subtitle, img }) {
    return (
        <Box 
            className='border p-2 m-3 bg-white border-[#ccc] rounded-md' 
            width="355px" 
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.04)", boxShadow: "md" }} 
        >
            <Image src={img} alt="Food" height="124px" objectFit="cover" />
            <Box p="6">
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {title}
                </Box>
                <Text mt="2" color="gray.600" fontSize="sm">
                    {subtitle}
                </Text>
            </Box>
            <Box px="6" pb="6">
                <IconButton aria-label="Add to favorites" icon={<MdCallMissedOutgoing />} colorScheme="green" />
            </Box>
        </Box>
    );
}

export default DisplayCard;
