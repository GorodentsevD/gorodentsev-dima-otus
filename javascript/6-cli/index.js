'use strict';

const productsService = require('./productsService')();
const auth = require('./auth');

const {program} = require('commander');

program.version('0.0.1');

function errorColor(str) {
    // Add ANSI escape codes to display text in red.
    return `\x1b[31m${str}\x1b[0m`;
}

function checkPermissions(token, permission) {
    const user = auth(token);
    if (!user || user.permissions.products < permission) {
        console.log(errorColor('Forbidden'));
        return false;
    }

    return true;
}

program
    .configureOutput({
        // Visibly override write routines as example!
        writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
        writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
        // Highlight errors in color.
        outputError: (str, write) => write(errorColor(str))
    });


/* COMMANDS SECTION START */

// Get list of all products
program
    .command('all')
    .description('Get list of all products')
    .requiredOption('-t, --token <token>', 'Auth')
    .action((options) => {
        if (!checkPermissions(options.token, 1)) return;
        console.log(productsService.getList())
    });

// Get product by id
program
    .command('id')
    .description('Get producty by id')
    .argument('<id>', 'Product id')
    .requiredOption('-t, --token <token>', 'Auth')
    .action((id, options) => {
        if (!checkPermissions(options.token, 1)) return;
        console.log(productsService.getById(+id))
    });

// Update product data
program
    .command('update')
    .description('Update product data')
    .argument('<id>', 'Product id')
    .option('-n, --name <name>', 'Name of product')
    .option('-p, --price <price>', 'Product price')
    .option('-c --currency <currency>', 'Product price currency')
    .requiredOption('-t, --token <token>', 'Auth')
    .action((id, options) => {
        if (!checkPermissions(options.token, 4)) return;

        try {
            console.log(productsService.update(+id, {
                name: options.name,
                price: +options.price || undefined,
                currency: options.currency
            }));
        } catch (e) {
            console.log(errorColor(e.message));
        }
    });

/* COMMANDS SECTION END */

program.parse(process.argv);
