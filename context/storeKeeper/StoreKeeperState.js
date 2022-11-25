import React, { useState } from 'react';
import StoreKeeperContext from './storeKeeperContext';

const StoreKeeperState = ({ children }) => {

    const [assignedProducts, setAssignedProducts] = useState([]);


    return (
        <StoreKeeperContext.Provider value={{ assignedProducts, setAssignedProducts }}>
            {children}
        </StoreKeeperContext.Provider>
    )
}

export default StoreKeeperState;