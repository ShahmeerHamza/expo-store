import React, { useState } from 'react';
import UserContext from './userContext';

const UsersState = ({ children }) => {

    const [userState, setUserState] = useState({
        token: null,
        id: null,
        role_id: null,
        name: null,
        role: null,
        email: null,
        phone: null,
        avatar: null,
        email_verified_at: null,
        settings: [],
        created_at: null,
        updated_at: null
    })
    return (
        <UserContext.Provider value={{ userState, setUserState }}>
            {children}
        </UserContext.Provider>
    )
}

export default UsersState;