import React from 'react';

const Blogs = () => {
    return (
        <>
            <h1 className='text-4xl font-bold text-center mt-12'>Blogs</h1>
            <div className='grid grid-cols-2 font-bold px-12'>
                <div className='shadow-xl rounded-lg p-8 m-8'>
                    <h1 className='text-2xl text-[darkblue] mb-4'>How to improve the Performance of a React Application?</h1>
                    <p className='text-xl'>
                        Things like Lazy loading, Windowing, Meomizing are there to improve performance. Moreover we should keep the states local so that unnecessary redenering of child components in the react dom tree does not happen. Also we can user lazy loading so that all the components do not render at the initial level, which take time, and make user unsatisfied, rather we load some components which user interact with at the initial level, then as the user roam around the website react keeps loading the components.
                    </p>
                </div>
                <div className='shadow-xl rounded-lg p-8 m-8'>
                    <h1 className='text-2xl text-[darkblue] mb-4'>How does prototypical inheritance work?</h1>
                    <p className='text-xl'>
                        It works as it sounds. In JavaScript methods and properties of an object  can be accessed by another object using prototypical inheritance. So we do not have to repeat the code again and again, rather for example we write a method in one object and then we use prototypical inheritance to access the mehtod from other objects. It is really a useful thing in large application.
                    </p>
                </div>
                <div className='shadow-xl rounded-lg p-8 m-8'>
                    <h1 className='text-2xl text-[darkblue] mb-4'>Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</h1>
                    <p className='text-xl'>
                        Because setState by default re-renders the component. If we change the value directly, the component won't be updated as a result the changes will not be palced in the UI. But if we change is using setState, it by default calls the component did update thus component gets re-rendered, then we can see the change in the UI.
                    </p>
                </div>
                <div className='shadow-xl rounded-lg p-8 m-8'>
                    <h1 className='text-2xl text-[darkblue] mb-4'> You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h1>
                    <p className='text-xl'>
                        Have to iterate through the array using map, forEach or for loop, then with every product I have to check if its name property value amtches the search text, if it mathces I will push the product in an array, and after the loop finishes I will display the array to the UI.
                    </p>
                </div>
                <div className='shadow-xl rounded-lg p-8 m-8'>
                    <h1 className='text-2xl text-[darkblue] mb-4'>What is a unit test? Why should write unit tests?</h1>
                    <p className='text-xl'>
                        Unit testing is testing a small piece of code in isolation to identify any minor problem, like a string with spelling mistake or spelling does not match with the over all codes. Unit testing can be used to identify that errors and notify the developers.
                    </p>
                </div>
                <div className='shadow-xl rounded-lg p-8 m-8'>
                    <h1 className='text-2xl text-[darkblue] mb-4'>What are the different ways to manage a state in a React application?</h1>
                    <p className='text-xl'>
                        There are many ways to manage states in react, like useSate, useReducer, using context api, or things like Redux, Zustand and etc.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Blogs;