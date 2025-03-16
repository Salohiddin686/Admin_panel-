const exit = document.querySelector(".exit");
const menuButton = document.querySelector(".header_menu"); // Кнопка меню
const menu1 = document.querySelector(".menu"); // Основное меню
const menu2 = document.querySelector(".menu2"); // Второе меню

menuButton.addEventListener("click", () => {
    menu1.classList.toggle("hidden");
    menu2.classList.toggle("hidden");
});


let accessToken = localStorage.getItem('token');
if (!accessToken) {
    window.location.href = '../../login.html';
}

exit.addEventListener('click', () => {
    localStorage.clear()
})