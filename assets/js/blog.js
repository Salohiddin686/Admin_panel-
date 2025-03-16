const API = "https://api.39ortomekteb.info/api/blog";
const list = document.querySelector('.card_wrapper');


let data = [];

fetch(API)
    .then((res) => res.json())
    .then((blogg) => {
        blogg = blogg.data;

        list.innerHTML = ""
        blogg.forEach((blogs) => {

            const li = document.createElement("li");
            li.classList.add('card_cart');
            let doby = JSON.parse(`${blogs.body}`)
            li.innerHTML = `
                            <img src="${doby.image}" alt="" class="card_img">
                            <div class="card_info-wrapper">
                                <div class="card_text_wrapper">
                                    <h4 class="card_title">${blogs.title}</h4>
                                    <p class="card_subtitle">${doby.date}</p>
                                </div>
                                    <div class="card_img_wrapper2">
                                       <img class="deleta" src="../images/delate.png" alt="">
                                    </div>
                            </div>
            `;
            list.appendChild(li)

            li.addEventListener('dblclick', () => {
                function tresh() {
                    fetch(`${API}/delete/${blogs._id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${brToken}`
                        }
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            alert(` событие с информацией ${blogs.title} был удалён!!!`)
                        })
                        .catch((err) => {
                            console.log("Error:", err);

                        })
                }
                tresh()
            })
        });

    })
    .catch((err) => console.log("Error:", err));


