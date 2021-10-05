
export function login() {
    window.location.href = "http://localhost:8771/oauth/authorize?client_id=article&client_secret=123&redirect_uri=http://localhost:3000/about&response_type=token&scope=all&state=abc";
};

export function logout() {
    window.location.href = "http://localhost:8771/oauth/exit?url=http://localhost:3000";
}
