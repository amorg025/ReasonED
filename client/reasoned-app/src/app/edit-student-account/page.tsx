"use client";
import React, { useState, useEffect } from 'react';
import LoggedInHeader from '@/components/common/logged-in-header';
import Footer from '@/components/common/footer';

const EditStudentAccount = () => {
    // Define state variables for currentUser and loading
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Use useEffect to fetch user data when the component mounts
    useEffect(() => {
        // Define a function to fetch user data
        const fetchUserData = async () => {
            try {
                // Retrieve the JWT token from local storage
                const token = localStorage.getItem('token');

                // Fetch user data from the backend with token included in the headers
                const userDataResponse = await fetch('http://localhost:3001/fetch/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Check if response is not ok
                if (!userDataResponse.ok) {
                    // Handle error response
                    throw new Error('Failed to fetch user data');
                }

                // Parse the JSON response
                const userData = await userDataResponse.json();

                // Log the user data
                console.log('User Data:', userData);

                // Set the user data to the currentUser state
                setCurrentUser(userData);

                // Set loading to false since data has been fetched
                setLoading(false);
            } catch (error) {
                // Log any errors
                console.error('Error fetching user data:', error);

                // Set loading to false to indicate that the data fetching is completed
                setLoading(false);
            }
        };

        // Call the fetchUserData function
        fetchUserData();
    }, []); // Run once on component mount

    // TSX Structure
    return (
        <>
            {/**Navbar */}
            <LoggedInHeader />

            {/**Page Body */}
            <div className="bg-orange h-screen flex justify-center items-center flex-col text-center">
                <div className="font-bold text-white text-xl flex flex-col gap-1/2">
                    
                <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-gray-800">{currentUser ? 'Update your Account?' : 'Welcome User!'}</h2>
                        </div>

                        <p className="mt-4 text-sm text-gray-600">Note: You cannot change your email address.</p>

                        <div className="flex justify-between mt-4">
                            <a href="/change-password" className="text-sky-400 hover:underline">Change Password</a>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            {/**Footer */}
            <Footer />
        </>
    );
};

export default EditStudentAccount;