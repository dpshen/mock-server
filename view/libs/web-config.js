let API_ROOT = 'http://127.0.0.1:3100';
let MOCK_ROOT = 'http://127.0.0.1:3100/mock/';

if (window.location.hostname == "fbi.yuantutech.com") {
    API_ROOT = 'http://fbi.yuantutech.com:3100';
    MOCK_ROOT = 'http://fbi.yuantutech.com:3100/mock/';
}

module.exports = {
    API_ROOT,
    MOCK_ROOT
};
