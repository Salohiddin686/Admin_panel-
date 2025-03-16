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
            Authorization: `Bearer ${brToken}`,
        },
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            photoPreview.setAttribute("src", data.file);
        })
        .catch((err) => {
            console.log("Error:", err);

        })
        
});

const eventFormSubmit = document.querySelector(".post_wrapper");
eventFormSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    const urlFoto = photoPreview.getAttribute("src");
    const requestBody = {
        image: urlFoto,
    }
    if (urlFoto) {
        fetch(`${baseUrl}/gallery/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${brToken}`
            },
            body: JSON.stringify(requestBody),
        })
            .then((res) => res.json())
            .then((data) => {
                urlFoto.setAttribute("src", "../images/add_photo.webp")

            })
            .catch((err) => {
                console.log("Error:", err);

            })
    }
});