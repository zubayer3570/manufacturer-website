import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <footer className="bg-cyan-900 flex items-center justify-center h-[130px] mt-20">
            <div className="text-white text-center font-bold text-sm p-4" >
                <Link to='/' className="btn btn-ghost normal-case text-xl">Electra</Link>
                <br />
                © {date} Copyright: Zubayer
            </div>
        </footer >
    );
};

export default Footer;