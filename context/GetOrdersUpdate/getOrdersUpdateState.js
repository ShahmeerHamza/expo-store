import React, { useState } from 'react';
import StoreKeeperContext from './storeKeeperContext';

const getOrdersUpdateState = ({ children }) => {

    const [updateData, setUpdateData] = useState(false);


    return (
        <getOrdersUpdateContext.Provider value={{ updateData, setUpdateData }}>
            {children}
        </getOrdersUpdateContext.Provider>
    )
}

export default StoreKeeperState;