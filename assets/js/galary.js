const API = "https://api.39ortomekteb.info/api/gallery";
const list = document.querySelector('.card_wrapper');

let data = [];

fetch(API)
    .then((res) => res.json())
    .then((ser) => {
        poiskovik(ser.data);
    })
    .catch((err) => console.log("Error:", err));

function poiskovik(items) {
    list.innerHTML = "";
    items.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("card_cart");

        li.innerHTML = `
           <img class="deleta" src="../images/delate.png" alt="">
           <img src="${item.image}" alt="" class="card_img">
        `;

        list.appendChild(li);
        li.addEventListener('dblclick', () => {
            function tresh() {

                fetch(`${API}/delete/${item._id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${brToken}`
                    }
                })
                    .then((res) => res.json())
                    .then((data) => {
                        alert(`картинка успешно удалена!!!`)
                    })
                    .catch((err) => {
                        console.log("Error:", err);

                    })
            }
            tresh()
        })
    });
}
