

function logout(username, token) {
    window.localStorage.removeItem("admin_id");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem('first_name');
    window.localStorage.removeItem('last_name');
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('address');
    window.localStorage.removeItem('phone');
    window.location.href = "http://localhost:1234/admin/login";
}