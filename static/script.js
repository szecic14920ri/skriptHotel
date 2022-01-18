function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];





    document.getElementById('gostiBtn').addEventListener('click', e => {
        e.preventDefault();
        window.location.href = 'guestOps.html';
        
    });




    document.getElementById('rezervacijeBtn').addEventListener('click', e => {

        window.location.href = 'reservationOps.html';
            
    });



    document.getElementById('apartmaniBtn').addEventListener('click', e => {

        window.location.href = 'apartmentOps.html';
            
    });


    document.getElementById('korisniciBtn').addEventListener('click', e => {

        window.location.href = 'adminOps.html'
            
    });


    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });

}