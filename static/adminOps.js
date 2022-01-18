function init() {


    const cookies = document.cookie.split('=');
    const token = [cookies.length - 1];


    fetch('http://127.0.0.1:8000/admin/users', {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('registeredUsers');

            data.forEach(el => {
                lst.innerHTML += `<li>Name: ${el.name}, Email: ${el.email}, Admin: ${el.admin}`;
            });
        });


   


}