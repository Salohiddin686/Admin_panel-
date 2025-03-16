const baseUrl = "https://api.39ortomekteb.info/api";
const brToken = localStorage.getItem('token');
const photoInput = document.querySelector('#file_inp');
const eventsInput = document.querySelector('.post_add_img_wrapper');
const photoPreview = document.querySelector('.post_img');

eventsInput.addEventListener("click", () => {
    photoInput.click();
});

photoInput.addEventListener('change', function () {
    const file = this.files[0];

    let formData = new FormData();
    formData.append("file", file);

    fetch(`${baseUrl}/upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${brToken}`
        },
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.file) {
                photoPreview.setAttribute("src", data.file);
            }
        })
        .catch(err => console.log("Error:", err));
});

const eventFormSubmit = document.querySelector(".post_wrapper");
eventFormSubmit.addEventListener('submit', (e) => {
    e.preventDefault();

    const textTitle = document.querySelector('#full-name').value;
    const textDate = document.querySelector('#date').value;
    const urlFoto = photoPreview.getAttribute("src");


    const requestBody = {
        title: textTitle,
        body: JSON.stringify({
            image: urlFoto,
            date: textDate
        })
    };

    fetch(`${baseUrl}/blog/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${brToken}`
        },
        body: JSON.stringify(requestBody),
    })
        .then((res) => res.json())
        .then((data) => {

        })
        .catch(err => console.log("Error:", err));

});
