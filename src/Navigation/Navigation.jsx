import React from 'react';
import '../App.css';

function Navigation({ onRouteChange, onVoucher, onUsedVoucher }){
    return(
        <div className='navigation'>
            <button onClick={() => onRouteChange('home')}>Home</button>
            <button onClick={onVoucher}>Voucher</button>
            <button onClick={onUsedVoucher}>Dashboard</button>
            <button onClick={() => onRouteChange('checkout')}>Search</button>
        </div>
    )
}

export default Navigation;