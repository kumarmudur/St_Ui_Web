export const camelCaseToSentenceCase = data => {
  if(data) {
    let result = data.replace( /([A-Z])/g, ' $1' );
    let formattedText = result.charAt(0).toUpperCase() + result.slice(1);
    return formattedText;
  }
};