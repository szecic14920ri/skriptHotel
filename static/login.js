function init() {
    document.getElementById('loginBtn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        };




        fetch('http://127.0.0.1:9000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(tok => {
                if (tok.msg) {
                    alert(tok.msg);
                } else {
                    document.cookie = `token=${tok.token};SameSite=Lax`;
                    window.location.href = 'index.html';
                }
            });
    });



    document.getElementById('toRegister').addEventListener('click', e => {
        window.location.href = 'registerAdmin.html';
    });
}