import React from 'react';
import {InfoSection} from '../../components/landingPage/InfoSection'
import { homeObjOne,homeObjTwo,homeObjThree,homeObjFour } from './Data';

const Home = () => {
    return (
        <>
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjThree} />
            <InfoSection {...homeObjTwo} />
            <InfoSection {...homeObjFour} />
        </>
    )
}

export default Home;