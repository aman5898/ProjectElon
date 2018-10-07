const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    sourceFile: './assets/kerala-coordinates.xlsx',
    range: 'E1:F3',
    columnToKey: {
        E: 'lat',
        F: 'lng'
    }
});

console.log(result);