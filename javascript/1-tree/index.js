const childLine = '└──';
const separator = '|   ';

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


const printName = (val, tabCount) => {
    let tabStr;
    if (tabCount === 0) {
        tabStr = '';
    } else if (tabCount === 1) {
        tabStr = childLine + ' ';
    } else {
        tabStr = separator.repeat(tabCount - 1) + childLine + ' ';
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