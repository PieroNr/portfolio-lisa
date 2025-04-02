import React from 'react';

const Menu: React.FC = () => {

    return (
        <div style={{ fontFamily: 'Cabinet' }} className="flex flex-col text-right gap-2  font-body font-extrabold  text-3xl uppercase">
            <span className={` text-white opacity-60`}>Projets</span>
            <span className={`text-gray-400 opacity-50`}>À propos</span>
            <span className={` text-gray-400 opacity-50`}>Contactez-moi</span>
        </div>
    );
};

export default Menu;