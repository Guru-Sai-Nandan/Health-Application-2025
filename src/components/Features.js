import React, { useState } from 'react';
import DisplayCard from './DisplayCard';

import image1 from '../images/1.jpeg';
import image2 from '../images/2.jpeg';
import image3 from '../images/3.jpeg';
import image4 from '../images/4.jpeg';
import image5 from '../images/5.jpeg';
import image6 from '../images/6.jpeg';

import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Features = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className='bg-white'>
            <div className='p-10 container-fluid mx-8'>
                <div className="card-container flex justify-between mb-2">
                    <NavLink to="/">
                        <DisplayCard title={"Track your calories"} subtitle={""} img={image3} />
                    </NavLink>
                    <NavLink to="/nutrition">
                        <DisplayCard title={"Know your Food"} subtitle={""} img={image1} />
                    </NavLink>
                    <NavLink to="/analysis">
                        <DisplayCard title={"Weekly Progress"} subtitle={""} img={image2} />
                    </NavLink>
                </div>
                <div className="card-container flex justify-between">
                    <NavLink to="/hydration-remainder">
                        <DisplayCard title={"Set Hydration Remainder"} subtitle={""} img={image5} />
                    </NavLink>
                    <NavLink to="/recommendations">
                        <DisplayCard title={"Personalized Food Recommendations"} subtitle={""} img={image6} />
                    </NavLink>
                    <NavLink >
                        <DisplayCard title={"Integrated Chat Bot"} subtitle={""} img={image4} />
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Features;