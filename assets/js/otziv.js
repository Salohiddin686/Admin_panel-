const APIContact = "https://api.39ortomekteb.info/api/contact";
const APIContactCreate = "https://api.39ortomekteb.info/api/contact/create";
const brToken = localStorage.getItem('token')


let nameInput = document.querySelector('#full-name');
let messageInput = document.querySelector('#predmet');
let btn = document.querySelector('.post_add');
let ul = document.querySelector('.post_wrapper');
let ullu = document.querySelector('.card_wrapper2');

let data = [];

fetch(APIContact)
    .then((response) => response.json())
    .then((messages) => {
        messages = messages.data;
        messages.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('card_sob');
            li.innerHTML = `
                        <div class="contact_hr_wrapper">
                            <div class="contact_messages_wrappers">
                                <h3 class="contact_mrssage_title">${item.name}</h3>
                                <p class="contact_mrssage_subtitle">${item.message}</p>
                                <img class="dlate" data-id="${item._id}" src="../images/delate.png" alt="">
                                <img class="correct" data-id="${item._id}" src="../images/correct.png" alt="">

                            </div>
                        </div>            
                `;
            ullu.appendChild(li);

            li.querySelector('.dlate').addEventListener("click", () => {

                function tresh() {
                    fetch(`${APIContact}/delete/${item._id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${brToken}`
                        }
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            alert(`отзыв с именем-фамилией ${item.name} был удалён!!!`)
                        })
                        .catch((err) => {
                            console.log("Error:", err);

                        })
                }
                tresh()
            })
            li.querySelector('.correct'), addEventListener("click", () => {
                function correct() {
  
                    fetch(`${APIContact}/update/${item._id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${brToken}`
                        }
                    })
                        .then((res) => res.json())
                        .then((data) => {                       
                            alert(`отзыв с именем-фамилией ${item.name} был удалён!!!`)
                        })
                        .catch((err) => {
                            console.log("Error:", err);

                        })
                }
                correct()
            })
        });
    })
    .catch((error) => {
        console.error("Error:", error);
    });

ul.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = nameInput.value;
    const message = messageInput.value;

    if (name && message) {
        fetch(APIContactCreate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, message })
        })
            .then(response => response.json())
            .then(data => {

                data.forEach((item) => {
                    const li = document.createElement('li');
                    li.classList.add('card_sob');
                    li.innerHTML = `
            <div class="contact_hr_wrapper">
                <div class="contact_messages_wrappers">
                    <h3 class="contact_mrssage_title">${item.name}</h3>
                    <p class="contact_mrssage_subtitle">${item.message}</p>
                    <img class="dlate" src="../images/delate.png" alt="">
                </div>
            </div>
`;

                    ullu.appendChild(li);
                    nameInput.value = ''
                    messageInput.value = ''
                })



            })
            .catch(err => {
                console.log("Error:", err);
            });
    }
});
