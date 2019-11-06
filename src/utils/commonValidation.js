export const validateCSVFile = data => {
    return data ? data.match(/.(csv)$/i) : null;
};