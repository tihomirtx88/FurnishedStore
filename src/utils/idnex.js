import axios from 'axios';

const productionUrl = 'http://localhost:5000/api/v1';

export const customFetch = axios.create({
    baseURL: productionUrl,
    
});

export const formatPrice = (price) => {
    const dollarsAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format((price/100).toFixed(2));
    return dollarsAmount;
};