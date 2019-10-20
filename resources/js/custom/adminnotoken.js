var vtoken = window.localStorage.getItem('token');
noToken(vtoken);

function noToken(token) {
    if (!token) {
        window.location.href = "http://localhost:1234/admin/login";
    }
}