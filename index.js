const json = {
    "name": 1,
    "items": [{
      "name": 2,
      "items": [{ "name": 3 }, { "name": 4 }]
    }, {
      "name": 5,
      "items": [{ "name": 6 }]
    }]
};

const printTree = (json) => {
    for (let key in json) {
        if (Array.isArray(json[key])) {
            
        }
        if (key === 'name') {
            console.log(`-${json[key]}`);
        }
        // if (key === 'items') {
        //     console.log('+');
        //     printTree(json[key]);
        // }
    }
};


printTree(json);