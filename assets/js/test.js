const exit = document.querySelector(".exit")

let accessToken = localStorage.getItem('token');
if (!accessToken) {
    window.location.href = '../../login.html';
}

exit.addEventListener('click', () => {
    localStorage.clear()
})