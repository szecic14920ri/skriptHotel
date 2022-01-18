function init() {


    const cookies = document.cookie.split('=');
    const token = [cookies.length - 1];




    const semaReg = Joi.object().keys({
        name: Joi.string().trim().min(3).max(20).required(),
        password: Joi.string().trim().min(3).max(20).required(),
        email: Joi.string().trim().email().required(),
        admin: Joi.required()
    })




    document.getElementById('listReservations').addEventListener('click', e => {
        e.preventDefault();
        

        fetch('http://127.0.0.1:8000/admin/reservations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                const lst = document.getElementById('reservationsList');

                data.forEach(el => {
                    lst.innerHTML += `<li>JMBG: ${el.guestJMBG}, Apartment: ${el.apartmentName}, Date of Arrival: ${el.dateOfArrival}, Date of Departure: ${el.dateOfDeparture}</li>`;
                });
            });
    });




    document.getElementById('addReservation').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            guestJMBG: document.getElementById('reservationJMBG').value,
            apartmentName: document.getElementById('reservationApartment').value,
            dateOfArrival: document.getElementById('reservationArrival').value,
            dateOfDeparture: document.getElementById('reservationDeparture').value
        };

        fetch('http://127.0.0.1:8000/admin/reservations', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => res.json());
    });



}