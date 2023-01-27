
import React from 'react';
import './Header.css'; 

const Header = () => {
    return (
        <div>
            <header className="header">
                <h1>System Monitor</h1>
                <nav>
                    <ul className="nav ul">
                        <a className="nav a"  href="#home">Home </a>
                        <a className="nav a"  href="#about"> About </a>
                        <a className="nav a"  href="#services"> Services </a>
                        <a className="nav a"  href="#contact"> Contact </a>
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default Header;