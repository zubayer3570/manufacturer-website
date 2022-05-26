import React from 'react';

const TopProducts = () => {
    return (
        <div className='p-12'>
            <div className='bg-base-200 rounded-lg'>
                <h1 className='text-4xl font-bold text-center pt-12 mt-20 mb-12'>Top Products</h1>
                <div className='px-8 lg:px-96 pb-24'>
                    <div id="carouselDarkVariant" className="carousel slide relative carousel-dark" data-bs-ride="carousel">
                        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                            <button
                                type="button"
                                data-bs-target="#carouselDarkVariant"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselDarkVariant"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselDarkVariant"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                            ></button>
                        </div>
                        <div className="carousel-inner relative w-full overflow-hidden">
                            <div className="carousel-item active relative float-left w-full">
                                <img
                                    src="https://i.ibb.co/MspKmM3/cable-dispenser.jpg"
                                    className="block w-full"
                                    alt="..."
                                />
                            </div>
                            <div className="carousel-item relative float-left w-full">
                                <img
                                    src="https://i.ibb.co/vz8Nk5f/large-cable-stripper.jpg"
                                    className="block w-full"
                                    alt="..."
                                />
                            </div>
                            <div className="carousel-item relative float-left w-full">
                                <img
                                    src="https://i.ibb.co/XVgbMKV/vortage-tester.jpg"
                                    className="block w-full"
                                    alt="..."
                                />
                            </div>
                        </div>
                        <button
                            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                            type="button"
                            data-bs-target="#carouselDarkVariant"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                            className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0 text-[black]"
                            type="button"
                            data-bs-target="#carouselDarkVariant"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopProducts;