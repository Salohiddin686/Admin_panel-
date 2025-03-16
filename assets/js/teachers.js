const API = "https://api.39ortomekteb.info/api/teachers";
const list = document.querySelector('.card_wrapper');
const deleta = document.querySelector('.delate')
const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")

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
                                <img src="${item.image}" alt="" class="card_img">
                                <div class="card_text_wrapper">
                                 <hr/>
                                   <div class="card_img_wrapper">
                                     <div class="card_title_wrapper">
                                      <h4 class="card_title">${item.full_name}</h4>
                                      <p class="card_subtitle">${item.subject}</p>
                                     </div>
                                   <div class="card_img_wrapper2">
                                    <img class="delate" src="../images/delate.png" alt="">
                                    <img class="correct2" src="../images/correct.png" alt="">
                                   </div>
                                 </div>
                                <div/>
            `;

            list.appendChild(li)

            li.querySelector('.delate').addEventListener('dblclick', () => {
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

            const form = document.querySelector('.modal_info_wrapper')
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const urlModal = photoPreview.getAttribute("src");
                const modalTitle = document.querySelector('#full-name-modal').value;
                const modalPredmet = document.querySelector('#predmet-modal').value;
                const modalrol = document.querySelector('#rol-modal').value;

                const requestBody = {
                    full_name: modalTitle,
                    image: urlModal,
                    type: modalrol,
                    subject: modalPredmet,
                }
                console.log(item._id);

                fetch(`${baseUrl}/teachers/update${item._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${brToken}`
                    },
                    body: JSON.stringify(requestBody),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // photoPreview.setAttribute("src", "../images/add_photo.webp")
                        console.log(data);


                    })
                    .catch((err) => {
                        console.log("Error:", err);

                    })
            })


            li.querySelector('.correct2').addEventListener("click", () => {

                modal.classList.remove("hidden")
                overlay.classList.remove("hidden")

            })
            overlay.addEventListener('click', () => {
                modal.classList.add("hidden")
                overlay.classList.add("hidden")
            })
            document.addEventListener('keyup', (e) => {
                if (e.key == "Escape") {
                    modal.classList.add("hidden")
                    overlay.classList.add("hidden")
                }
            })
        });


    })

    .catch((err) => console.log("Error:", err));
