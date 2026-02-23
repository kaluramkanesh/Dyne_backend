const XLSX = require("xlsx");

module.exports = async (filePath) => {

    const workbook = XLSX.readFile(filePath);

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData;
};
