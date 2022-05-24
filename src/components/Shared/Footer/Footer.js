import React from 'react';

const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <footer class="bg-cyan-900 flex items-center justify-center h-[130px] mt-20">
            <div class="text-white text-center font-bold text-sm p-4" >
                © {date} Copyright: Zubayer
            </div>
        </footer >
    );
};

export default Footer;