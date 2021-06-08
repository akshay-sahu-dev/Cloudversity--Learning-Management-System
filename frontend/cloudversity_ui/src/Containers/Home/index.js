import React from 'react'
import {Link } from 'react-router-dom';
function Home() {
    return (
        <div>
            <h1>Login Signup test:</h1>
            <Link to='/login'> Login here</Link>
        </div>
    )
}

export default Home;
