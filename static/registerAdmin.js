function init() {


    const cookies = document.cookie.split('=');
    const token = [cookies.length - 1];



    const semaReg = Joi.object().keys({
        name: Joi.string().trim().min(3).max(20).required(),
        password: Joi.string().trim().min(3).max(20).required(),
        email: Joi.string().trim().email().required(),
        admin: Joi.required()
    })




    document.getElementById('register').addEventListener('click', e => {

        e.preventDefault();

        const data = {
            name: document.getElementById('username').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value,
            admin: document.getElementById('isAdmin').checked
        };

        fetch('http://127.0.0.1:9000/register', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(el => {
                        document.cookie = `token=${el.token};SameSite=Lax`;
                        window.location.href = 'index.html';
                    });
    });


}