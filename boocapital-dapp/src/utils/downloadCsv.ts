// Function to convert the JSON(Array of objects) to CSV.
const arrayToCsv = (headers: any, data: any) => {
    const csvRows = [];
    // getting headers. 
    const headerValues = headers.map((header: any) => header.label);
    csvRows.push(headerValues.join(',')); // Push into array as comma separated values
    // Getting rows. 
    for (const row of data) {
        console.log("1",row);
        const rowValues = `"${row[0] +','+ row[1]}"`;
        csvRows.push(rowValues); // Push into array as comma separated values. 
    }
    return csvRows.join('\n'); // To enter the next rows in the new line '\n' 
};


// Function to download the generated CSV as a .csv file.
const download = (data: any, fileName: any) => {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName + '.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
export const generateCSV = (header: any, data: any, filename: any) => {
    const csvData = arrayToCsv(header, data);
    download(csvData, filename);
};