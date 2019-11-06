export const extractDateTime = (data, dateTime) => {
    let response = '';
    if(data) {
        data = data && data.split('T');
        const date = data && data[0];
        const time = data && data[1] && data[1].split('.');
        const timeOnly = time && time[0];
        response= `${date} ${time}`;
        
        if(dateTime === 'date') { response =`${date}`;}
        else if(dateTime === 'time') { response = `${time}`; }
        else { response = `${date} ${timeOnly}`; }
    } 
    return response;
};

export const getDateTime = (dateTime, dateTimeStamp) => {
    // const date = new Date(dateTimeStamp).toLocaleDateString('en-US', { month: 'long',  day: '2-digit', year: 'numeric' });
    const date = new Date(dateTimeStamp).toLocaleDateString('en-US', { month: '2-digit',  day: '2-digit', year: 'numeric' });
    const time = new Date(dateTimeStamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let response= '';
    if(dateTime === 'date') { response =`${date}`;}
    else if(dateTime === 'time') { response = `${time}`; }

    return response;
};

export const gridPhoneFormat = data => {
    return data ? `+1 ${data}` : '';
};