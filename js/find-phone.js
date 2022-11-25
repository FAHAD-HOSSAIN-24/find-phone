
const searchPhone = () => {
    const searchFieldValue = document.getElementById('search-field').value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`)
    .then(respons => respons.json())
    .then(data => displayPhone(data.data))
}


const displayPhone = (phones) => {
    const searchFieldValue = document.getElementById('search-field').value = '';
    const showPhoneDiv = document.getElementById('show-phone-div');
    const notFoundMsg = document.getElementById('phone-not-found-msg');
    showPhoneDiv.textContent = '';
    if(phones.length === 0){
        notFoundMsg.style.display = 'block';
    }
    phones?.forEach(phone => {
        // console.log(phone)
        const phoneBrand = document.createElement('h2');
        phoneBrand.innerHTML = `
            <div class="card" style="width: 100%">
                <img src="${phone.image}" class="card-img-top" style="width: 50%; margin:auto;" alt="">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand} <span style="font-size: 8px;">${phone.slug}</span></h5>
                    <p class="card-text" style="font-size:15px">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button style="font-size: 15px; border-radius: 10px; border: 1px solid gray;">Show-details</button>
                </div>
            </div>
        `;
        showPhoneDiv.appendChild(phoneBrand);
    })
}