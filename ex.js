const { paste } = require('@testing-library/user-event/dist/paste');
const fs = require('fs');



let dulieu = fs.readFileSync('phong.json', 'utf8')
dulieu = JSON.parse(dulieu)


const duplicates = dulieu.filter((value, index) => dulieu.indexOf(value) !== index);
console.log(duplicates); 

