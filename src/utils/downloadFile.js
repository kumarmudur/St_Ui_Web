const downloadFile = url => {
    setTimeout(() => {
      window.open(url);
      // window.location.href = response.file;
    }, 100);
  };

  export default downloadFile;