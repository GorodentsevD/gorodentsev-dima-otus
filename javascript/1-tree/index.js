const tree = require('./tree');

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

tree(json);
tree({});