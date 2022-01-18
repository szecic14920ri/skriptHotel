const Joi = require("joi");

function init() {


    const cookies = document.cookie.split('=');
    const token = [cookies.length - 1];









    document.getElementById('listApartments').addEventListener('click', e => {

        

        fetch('http://127.0.0.1:8000/admin/apartments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                const lst = document.getElementById('apartmentsList');

                data.forEach(el => {
                    lst.innerHTML += `<li>Apartment: ${el.name}, Number of Rooms: ${el.numberOfRooms}, Number of Beds: ${el.numberOfBeds}</li>`;
                });
            });
    });



    document.getElementById('addApartment').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('apartmentName').value,
            numberOfRooms: document.getElementById('numberOfRooms').value,
            numberOfBeds: document.getElementById('numberOfBeds').value,
        };

        fetch('http://127.0.0.1:8000/admin/apartments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => res.json());
    });


}