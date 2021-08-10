'use strict';

const printTree = require('./tree');

test('Check with empty json', () => {
    const log = jest.spyOn(global.console, 'log');

    printTree({});
    expect(log).toHaveBeenCalledTimes(0);
});

test('Check json tree output', () => {
    const log = jest.spyOn(global.console, 'log');
    const json = {
        "name": 1,
        "items": [{
            "name": 2,
            "items": [{ "name": 3 }, { "name": 4 }]
        }, {
            "name": 5,
            "items": [{ "name": 6 }]
        }]
    }

    printTree(json);

    expect(log).toHaveBeenCalledWith('1');
    expect(log).toHaveBeenCalledWith('└── 2');
    expect(log).toHaveBeenCalledWith('|   └── 3');
    expect(log).toHaveBeenCalledWith('|   └── 4');
    expect(log).toHaveBeenCalledWith('└── 5');
    expect(log).toHaveBeenCalledWith('|   └── 6');
});