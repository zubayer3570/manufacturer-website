import React from 'react';

const MyPortfolio = () => {
    return (
        <div className='px-24 font-bold'>
            <h1 className='text-center text-4xl font-bold mt-12 mb-8'>Portfolio</h1>
            <p className='text-xl'>Name: MD Mahamudul Hasan Zubayer</p>
            <p className='text-xl'>Email: zubayer3570@gmail.com</p>
            <p className='text-xl'>Education: Bachelor of Science in Computer Science and engineering (1st year)</p>
            <p className='text-2xl mt-4 font-bold'>Skills</p>
            <p>1. HTML5</p>
            <p>2. CSS3</p>
            <p>3. JavaScript</p>
            <p>4. React</p>
            <p>6. Node.js</p>
            <p>7. Express.js</p>
            <p>8. MongoDB</p>
            <p>8. Socket.io</p>
            <p className='text-2xl mt-4 font-bold'>Projects</p>
            <a href="https://warehouse-1fcab.web.app/" className='text-[blue]'>1st website</a>
            <br />
            <a href="https://singular-daifuku-135940.netlify.app/" className='text-[blue]'>2nd website</a>
            <br />
            <a href="https://endearing-smakager-327a5c.netlify.app/" className='text-[blue]'>3rd website</a>
        </div>
    );
};

export default MyPortfolio;