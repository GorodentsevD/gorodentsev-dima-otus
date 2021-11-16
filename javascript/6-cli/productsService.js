'use strict';

/**
 * List of supported currencies
 * @type {string[]}
 */
const currencies = ['USD', 'EUR'];
const fs = require('fs');

/**
 * Validate product data
 * @param {object} product
 * @param {string} product.name
 * @param {number} product.price
 * @param {string} product.currency
 */
function validateProduct({name, price, currency}) {
    if (!name) throw new Error('Name product is required');
    if (typeof name !== 'string') throw new Error('Name must be a non empty string');

    if (!price) throw new Error('Product price is required');
    if (typeof price !== 'number') throw new Error('Price must be float number');
    if (price <= 0) throw new Error('Product price must be greater than zero');

    if (!currencies.includes(currency)) throw new Error('Unknown currency');
}

let products;
/**
 * Service for interaction with products
 */
module.exports = () => {
    products = require('./products.json');

    return {
        /**
         * Get product by id
         * @param {number} id
         * @returns {{price: number, name: string, currency: string, id: number}|{price: number, name: string, currency: string, id: number}|null}
         */
        getById(id) {
            return products.find(p => p.id === id) || null;
        },

        /**
         * Get lis of all products
         * @returns {[{price: number, name: string, currency: string, id: number}, {price: number, name: string, currency: string, id: number}]}
         */
        getList() {
            return products;
        },

        /**
         * Update a product
         * @param {number} id - Product id
         * @param {object} product - Product data
         * @param {string} product.name - New product name
         * @param {number} product.price - New product price
         * @param {string} product.currency - New product currency
         */
        update(id, product) {
            const idx = products.findIndex(p => p.id === id);
            if (idx === -1) throw new Error('Product not found');

            const pr = products[idx];
            pr.name = product.name || pr.name;
            pr.price = product.price || pr.price;
            pr.currency = product.currency || pr.currency;

            validateProduct(pr);
            products[idx] = pr;

            fs.writeFileSync('products.json', JSON.stringify(products));

            return pr;
        },

    }
}