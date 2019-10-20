

function logout(username, token) {
    window.localStorage.removeItem("admin_id");
    window.localStorage.removeItem("token");
    window.location.href = "http://localhost:1234/admin/login";
}