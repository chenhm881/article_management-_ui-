
export function login() {
    window.location.href = "http://localhost:8771/oauth/authorize?response_type=code&client_id=blog&client_secret=123&redirect_uri=http://localhost:8181/authorize/login&scope=all";
};

export function logout() {
    window.location.href = "http://localhost:8771/oauth/exit?url=http://localhost:3000";
}
