export const isTaxIdValid = (code, value) => {
    let regEx = '';
    // ToDo find correct pattern for each country
    // Note: In origin the format of a Tax Identifier or Employer Identification Number (EIN) in the United States is a nine-digit number in the format of XX-XXXXXXX, where "XX" is the two-digit prefix and "XXXXXXX" is the seven-digit serial number. For example, 12-3456789 is a valid EIN format.
    // In Canada, a tax ID is referred to as a "Business Number" (BN). A BN is a nine-digit number that is used to identify a business for tax purposes. An example of a Canadian Business Number could be 123456789.
    // in task For the USA it must be [4 digits]-[3 letters]-[5 or 7 digits]
    // For Canada, it must be [10 symbols digits or letters A, B or D]-[2 letters]
    switch (code.toLowerCase()) {
        case 'usa':
            regEx = /^\d{4}-[A-Za-z]{3}-\d{5,7}$/;
            break
        case 'can':
            regEx = /^[\wA-BD]{10}-[A-Za-z]{2}$/;
            break
        case 'mex':
            regEx = /^[\wA-BD]{10}-[A-Za-z]{2}$/;
            break
        case 'aus':
            regEx = /^[\wA-BD]{10}-[A-Za-z]{2}$/;
            break
        case 'bra':
            regEx = /^[\wA-BD]{10}-[A-Za-z]{2}$/;
            break
        case 'fra':
            regEx = /^[\wA-BD]{10}-[A-Za-z]{2}$/;
            break
        case 'ger':
            regEx = /^[\wA-BD]{10}-[A-Za-z]{2}$/;
            break
        case 'esp':
            regEx = /^[\wA-BD]{10}-[A-Za-z]{2}$/;
            break
        case 'ita':
            regEx = /^[\wA-BD]{10}-[A-Za-z]{2}$/;
            break
        case 'uk':
            regEx = /^[\wA-BD]{10}-[A-Za-z]{2}$/;
            break
        default:
            return false
    }
    return regEx.test(value)
}