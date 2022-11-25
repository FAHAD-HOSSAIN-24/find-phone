
const spinner = document.getElementById('spinner');

const defultLoad = () => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
        .then(respons => respons.json())
        .then(data => {
            const dataIndex = data.data;
            const shoMoreBtn = document.getElementById('show-more-btn');
            const searchFieldValue = document.getElementById('search-field').value = '';
            const showPhoneDiv = document.getElementById('show-phone-div');
            const notFoundMsg = document.getElementById('phone-not-found-msg');
            showPhoneDiv.textContent = '';
            for (let i = 9; i <= dataIndex.length; i++) {
                // displayPhone(dataIndex[i]);
                // console.log(dataIndex[i])

                const phoneName = document.createElement('h2');
                phoneName.innerHTML = `
            <div class="card" style="width: 100%">
                <img src="${dataIndex[i].image}" class="card-img-top" style="width: 50%; margin:auto;" alt="">
                <div class="card-body">
                    <h5 class="card-title">${dataIndex[i].phone_name} <span style="font-size: 8px;">${dataIndex[i].slug}</span></h5>
                    <p class="card-text" style="font-size:15px">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button onclick="loadPhoneDetails('${dataIndex[i].slug}')" style="font-size: 15px; border-radius: 10px;background: #14e1d9; font-weight:700; padding:5px; border: 1px solid gray;" type="button" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show-details</button>
                </div>
            </div>
            `;
                showPhoneDiv.appendChild(phoneName);
                shoMoreBtn.style.display = 'none';
                spinner.style.display = 'none';

            }

        })
}
spinner.style.display = 'block';
defultLoad();


const searchPhone = () => {
    spinner.style.display = 'block';
    const notFoundMsg = document.getElementById('phone-not-found-msg');
    const searchFieldValue = document.getElementById('search-field').value;
    const showPhoneDiv = document.getElementById('show-phone-div');
    
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`)
        .then(respons => respons.json())
        .then(data => {
            if (data.status === true) {
                // if(data.length <= 9){
                displayPhone(data.data)
                // }
                notFoundMsg.style.display = 'none';
            } else {
                spinner.style.display = 'none';
                notFoundMsg.style.display = 'block';
                showPhoneDiv.textContent = '';
                shoMoreBtn.style.display = 'none';
            }
        })
}


const displayPhone = (phones) => {
    document.getElementById('search-field').value = '';
    const showPhoneDiv = document.getElementById('show-phone-div');
    showPhoneDiv.textContent = '';

    const displayphoneCard = (phone) => {
        const phoneName = document.createElement('h2');
        phoneName.innerHTML = `
                <div class="card" style="width: 100%">
                    <img src="${phone.image}" class="card-img-top" style="width: 50%; margin:auto;" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name} <span style="font-size: 8px;">${phone.slug}</span></h5>
                        <p class="card-text" style="font-size:15px">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button onclick="loadPhoneDetails('${phone.slug}')" style="font-size: 15px; border-radius: 10px;background: #14e1d9; font-weight:700; padding:5px; border: 1px solid gray;" type="button" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show-details</button>
                    </div>
                </div>
            `;
        showPhoneDiv.appendChild(phoneName);

        spinner.style.display='none';
    }

    const shoMoreBtn = document.getElementById('show-more-btn');
    shoMoreBtn.style.display = 'block';
    for (let phone = 0; phone <= phones.length; phone++) {
        if (phone < 9) {
            displayphoneCard(phones[phone])
            shoMoreBtn.style.display = 'block';
        }

        shoMoreBtn.addEventListener('click', () => {
            if (phone >= 9) {
                displayphoneCard(phones[phone])
            }
            shoMoreBtn.style.display = 'none';
        })
    }
}

const loadPhoneDetails = async phoneSlug => {
    const url = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneSlug}`);
    const data = await url.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phoneObj) => {
    // console.log(phoneObj)
    const phoneDetailContainer = document.getElementById('phoneDetailContainer');
    // const detailDiv = document.createElement('div');
    phoneDetailContainer.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">${phoneObj.name}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <img class="text-center" src="${phoneObj.image}">
    <h3 style="font-size:15px; color: gray">Name: <span style="font-size:16px; color: black;">${phoneObj.name}</span></h3>
    <h3 style="font-size:15px; color: gray">ReleaseDate: <span style="font-size:16px; color: black;">${phoneObj.releaseDate}</span></h3>
    <h3 style="font-size:15px; color: gray">Brand: <span style="font-size:16px; color: black;">${phoneObj.brand}</span></h3>
    <h3 style="font-size:15px; color: gray">DisplaySize: <span style="font-size:16px; color: black;">${phoneObj.mainFeatures.displaySize}</span></h3>
    <h3 style="font-size:15px; color: gray">Memory: <span style="font-size:16px; color: black;">${phoneObj.mainFeatures.memory}</span></h3>
    <h3 style="font-size:15px; color: gray">Sensors: <span style="font-size:16px; color: black;">${phoneObj.mainFeatures.sensors}</span></h3>
    <h3 style="font-size:15px; color: gray">Price: <span style="font-size:16px; color: black;">BDT-45000</span></h3>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
    `;

    // phoneDetailContainer.appendChild(detailDiv);

}


