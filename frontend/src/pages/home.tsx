import React from 'react';



import Hero  from '../components/hero';

import Analytics from '../components/analytics';

import Footer from '../components/footer';


const Home: React.FC = () => {
    return (
        <div>
            <Hero />

            <Analytics />


            <Footer />
        </div>

    );
};

export default Home;
