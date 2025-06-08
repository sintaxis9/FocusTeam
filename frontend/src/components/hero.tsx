import React from 'react';

const Hero: React.FC = () => {
    return (
        <div className='text-black'>
            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                <p className='text-blue font-bold p-2'>
                    AUMENTA TU PRODUCTUVIDAD
                </p>
                <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
                    Captura, organiza y aborda tus tareas
                </h1>
                <div className='flex justify-center items-center'>
                    <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
                      
                    </p>

                </div>
                <p className='md:text-2xl text-xl font-bold text-gray-500'>
                </p>
                <button className='bg-black w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-white hover:scale-110 duration-300'>
                    Registrate
                </button>
            </div>
        </div>
    );
};

export default Hero;
