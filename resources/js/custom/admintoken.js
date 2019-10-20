var vtoken = window.localStorage.getItem('token');
Token(vtoken);

function Token(token) {
    if (token) {
        window.location.href = "http://localhost:1234/admin/profile";
    }
}