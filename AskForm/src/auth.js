export function getAuthForm() {
    return `
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" required>
                <label>E-mail</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password" required>
                <label>Password</label>
            </div>
            <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Login</button>
        </form>
    `
}

export function authWithEmailAndPassword(email, pass) {
    const apiKey = 'AIzaSyDKrv3JVDRlbdsgKKlSFY6diGNzh-tc-Fk';
    
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, pass, returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
}