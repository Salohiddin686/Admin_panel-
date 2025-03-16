let loginForm = document.querySelector('.log_box')
let api = 'https://api.39ortomekteb.info/api/admin/login'

let Token = localStorage.getItem('token');
if (Token) {
    window.location.href = './assets/pages/index.html';
}




loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let email = document.querySelector('.mail_inp').value;
    let password = document.querySelector('.name_inp').value;


    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: email,
            password: password,
        })
    })

        .then((res) => res.json())
        .then((data) => {
            let accessToken = data.accessToken


            if (accessToken) {
                localStorage.setItem('token', accessToken);
                window.location.href = 'assets/pages/index.html'
            } else {
                throw new Error('Не правельный пароль или email!!!');
            }

        })
        .catch((err) => {

            document.querySelector('.error').textContent = err.message
            document.querySelector('.error').classList.remove('hidden')
            setTimeout((item) => {
                document.querySelector('.error').classList.add('hidden')
                document.querySelector('.error').textContent = ''
            }, 2500)
            console.log(err);

        })

})


fetch(api, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
})

    .then((res) => res.json())
    .then((data) => {
        localStorage.getItem(accessToken)


        if (!accessToken) {
            window.location.href = 'login.html';
        } else {
            window.location.href = 'assets/pages/index.html';
        }

    })
    .catch((err) => {
        console.log(err);
    })
