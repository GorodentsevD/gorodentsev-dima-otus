const json = {
    "name": 1,
    "items": [{
        "name": 2,
        "items": [{ "name": 3, "items": [{"name": 9}]}, { "name": 4, "items": [{"name": 7}, {"name": 8}] }]
    }, {
        "name": 5,
        "items": [{ "name": 6 }]
    }]
};

const start = '└──';
const sym2 = '│   ';

const printName = (val, tabCount) => {
    let tabStr;
    if (tabCount === 0) {
        tabStr = '';
    } else if (tabCount === 1) {
        tabStr = start + ' ';
    } else {
        tabStr = sym2.repeat(tabCount - 1) + start + ' ';
    }

    console.log(tabStr + val);
}


const printTree = (json, tabCount = 0) => {
    const keys = Object.keys(json);
    keys.forEach((key, idx) => {
        if (key === 'name') {
            printName(json[key], tabCount);
        }

        if (key === 'items') {
            json[key].forEach(obj => printTree(obj, tabCount + 1));
        }
    });
};


printTree(json);