import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen = () => {

    return (
        <div style={{ padding: '10px', margin: '10px', textAlign: 'center' }}>
            <h2 style={{ color: 'red' }}>Welcome to Our Shop Survey</h2>
            <p style={{ color: 'blue' }}>Please take a moment to answer a few questions about your experience.</p>

            <Link to="/SurveyApp">
                <button
                    style={{
                        textAlign: 'center',
                        fontSize: '16px',
                        margin: '10px',
                        fontWeight: 900,
                        padding: '10px',
                        borderRadius: '10px',
                    }}

                >
                    Start Survey
                </button>
            </Link>

        </div>
    );
};

export default WelcomeScreen;
