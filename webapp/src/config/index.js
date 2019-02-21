function setApiUrl(){
    let url;
    switch(process.env.REACT_APP_ENV){
        case 'production':
            url = '';
            break;
        default:
            url = 'http://localhost:8000';
            break;
    }
    return url;
}
export let API_URL = setApiUrl();