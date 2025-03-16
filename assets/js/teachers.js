const API = "https://api.39ortomekteb.info/api/teachers";
const list = document.querySelector('.card_wrapper');
const deleta = document.querySelector('.delate')

let data = [];

fetch(API)
    .then((res) => res.json())
    .then((ser) => {
        ser = ser.data;


        list.innerHTML = ""
        ser.forEach((item) => {
            const li = document.createElement("li");
            li.classList.add('card_cart');
            li.innerHTML = `
                                <p class="card_rol">${item.type}</p>
                                <img class="delate" src="../images/delate.png" alt="">
                                <img src="${item.image}" alt="" class="card_img">
                                <div class="card_text_wrapper">
                                <hr/>
                                    <h4 class="card_title">${item.full_name}</h4>
                                    <p class="card_subtitle">${item.subject}</p>
                                </div>
            `;

            list.appendChild(li)

            li.addEventListener('dblclick', () => {
                function tresh() {

                    fetch(`${baseUrl}/teachers/delete/${item._id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${brToken}`
                        }
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            alert(`${item.type} успешно был удалён!!!`)
                        })
                }
                tresh()
            })
        });


    })

    .catch((err) => console.log("Error:", err));
