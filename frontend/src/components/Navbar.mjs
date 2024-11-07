// src/components/Navbar.js
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext.mjs';

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const isEmployee = auth.userType === 'employee';

    const handleLogout = () => {
        logout();
        navigate('/HomePage'); 
    };

    return (
        <Box bg="teal.500" p={4} color="white">
            <Flex align="center">
                <Box>
                    <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white', marginRight: '20px', textDecoration: 'none' })}>
                        Home
                    </NavLink>
                    {auth.token && (
                        <>
                            <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white', marginRight: '20px', textDecoration: 'none' })}>
                                Dashboard
                            </NavLink>
                            {isEmployee && (
                                <NavLink to="/payment" style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white', marginRight: '20px', textDecoration: 'none' })}>
                                    Payments
                                </NavLink>
                            )}
                        </>
                    )}
                </Box>
                <Spacer />
                {auth.token ? (
                    <Button colorScheme="teal" onClick={handleLogout}>
                        Logout
                    </Button>
                ) : (
                    <>
                        <NavLink to="/login" style={{ marginRight: '20px', textDecoration: 'none' }}>
                            <Button colorScheme="teal">Login</Button>
                        </NavLink>
                       
                    </>
                )}
            </Flex>
        </Box>
    );
};

export default Navbar;
