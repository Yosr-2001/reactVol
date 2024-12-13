import React from 'react';

const Offers = () => {
    return (
        <div className="offers-section">
            <h2>Special Offers</h2>
            <div className="offer-cards">
                <div className="offer-card">
                    <h3>Paris Getaway</h3>
                    <p>Round-trip flights starting at $399!</p>
                </div>
                <div className="offer-card">
                    <h3>Tropical Escape</h3>
                    <p>Save up to 30% on flights to the Caribbean.</p>
                </div>
                <div className="offer-card">
                    <h3>Business Class Upgrade</h3>
                    <p>Exclusive upgrades for only $99.</p>
                </div>
            </div>
        </div>
    );
};

export default Offers;
