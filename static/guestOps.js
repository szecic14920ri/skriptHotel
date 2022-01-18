const Joi = require("joi");

function init() {

    const cookies = document.cookie.split('=');
    const token = [cookies.length - 1];



  



    
    document.getElementById('gostiBtn').addEventListener('click', e => {

        

        fetch('http://127.0.0.1:8000/admin/guests/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                const lst = document.getElementById('guestList');

                console.log("GuestList loaded.")

                data.forEach(el => {
                    lst.innerHTML += `<li>Name: ${el.name}, Last Name: ${el.lastName}, JMBG: ${el.jmbg}</li>`;
                });
            });
    });




    document.getElementById('searchGuest').addEventListener('click', e => {

        const data = {
            jmbg: document.getElementById('searchByJMBG').value
        };

        fetch('http://127.0.0.1:8000/admin/guests', {
            method: 'GET',
            headers: {
                'Coontent-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res => res.json())
            .then(data => {
                document.getElementById('guestFound').innerHTML = `Name: ${data.name}, Last Name: ${data.lastName}, JMBG: ${data.jmbg}`;
            });
    });


    document.getElementById('addGuest').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('guestName').value,
            lastName: document.getElementById('guestLastName').value,
            jmbg: document.getElementById('guestJMBG').value
        };

        fetch('http://127.0.0.1:8000/admin/guests', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                const lst = document.getElementById('guestList');

                console.log("GuestList loaded.")

                
                lst.innerHTML += `<li>Name: ${data.name}, Last Name: ${data.lastName}, JMBG: ${data.jmbg}</li>`;
                
            });
    });


    document.getElementById('deleteGuest').addEventListener('click', e => {

        const data = {
            jmbg: document.getElementById('deleteByJMBG').value
        };
        
        fetch('http://127.0.0.1:8000/admin/guests', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(console.log("Guest deleted."));
    });

}