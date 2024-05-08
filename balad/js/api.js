   

document.addEventListener("DOMContentLoaded", function () {
    const countrySelect = document.getElementById('countrySelect');
    const coatOfArmsImage = document.getElementById('coatOfArmsImage');
    const unMembershipImage = document.getElementById('unMembershipImage');
    const unMembershipCheck = document.getElementById('unMembershipCheck');
    const unMembershipCross = document.getElementById('unMembershipCross');
    const independentImage = document.getElementById('independentImage');
    const independentCheck = document.getElementById('independentCheck');
    const independentCross = document.getElementById('independentCross');
    let newsDiv=document.getElementById("news_section");

    function fetchNews(countrySymbol) {
        return new Promise((resolve, reject) => {
            const apiKey = 'fb2006f9943242349320750050463406';
            const apiUrl = `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&source-countries=${countrySymbol}`;
    
            fetch(apiUrl)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error(`Error: Unable to fetch data. Status: ${response.status}`);
                        reject(`Error: Unable to fetch data. Status: ${response.status}`);
                    }
                })
                .then(data => resolve(data))
                .catch(error => {
                    console.error('Exception:', error.message);
                    reject(`Exception: ${error.message}`);
                });
        });
    }
    

    const apiEndpoint = 'https://restcountries.com/v3.1/all' ;

    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.textContent = country.name.common;
                countrySelect.appendChild(option);
            });
            countrySelect.addEventListener('change', function () {
                const selectedCountry = countrySelect.value;
                const selectedCountryData = data.find(country => country.name.common === selectedCountry);
                flagData.hidden = false;
                populationData.hidden = false;
                newsData.hidden = false;
                mapsData.hidden = false;
                messageData.hidden = false;

                if (selectedCountryData) {
                    const countryCode = selectedCountryData.cca2.toLowerCase();
                    flagImage.src = `https://flagcdn.com/w320/${countryCode}.png`;
                    if (selectedCountryData.flags && selectedCountryData.coatOfArms) {
                        coatOfArmsImage.src = selectedCountryData.coatOfArms;
                        coatOfArmsImage.src = `https://mainfacts.com/media/images/coats_of_arms/${countryCode}.png`;
                    } else {
                        coatOfArmsImage.src = ''; 
                    }
                    if (selectedCountryData && selectedCountryData.unMember) {
                        unMembershipCheck.style.display = 'inline';
                        unMembershipCross.style.display = 'none';
                    } else {
                        unMembershipCheck.style.display = 'none';
                        unMembershipCross.style.display = 'inline';
                    }
                    if (selectedCountryData && selectedCountryData.independent) {
                        independentCheck.style.display = 'inline';
                        independentCross.style.display = 'none';
                    } else {
                        independentCheck.style.display = 'none';
                        independentCross.style.display = 'inline';
                    }
                    const populationElement = document.getElementById('population');
                    populationElement.textContent = numberWithCommas(selectedCountryData.population);
                    

                    document.getElementById('region').textContent = selectedCountryData.region || 'N/A';
                    document.getElementById('startOfWeek').textContent = selectedCountryData.startOfWeek ?? 'N/A';
                    document.getElementById('timeZone').textContent = selectedCountryData.timezones[0] || 'N/A';
                    document.getElementById('capital').textContent = selectedCountryData.capital || 'N/A';

                    const mapsUrl = "https://www.google.com/maps?q=" + selectedCountry + "&hl=en&z=6&output=embed";
                    googleMapsEmbed.src = mapsUrl;

                    const googleMapsPageUrl = "https://www.google.com/maps/place/" + selectedCountry;
                    googleMapsLink.href = googleMapsPageUrl;

fetchNews(selectedCountryData.cca2)
.then(data => {
    if (data) {
        console.log(data);
        newsDiv.innerHTML="";
        data.news.forEach(newelement => {
            newsDiv.innerHTML +=
       `
        <div class="col-md-3 col-sm-6">
            <div class="news-box">
                <div class="new-thumb"> <span class="cat c1">News</span> <img src=${newelement.image} alt="" onerror="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"  width="500" height="300"> </div>
                     <div class="new-txt">
                        <ul class="news-meta">
                            <li>${newelement.publish_date}</li>
                        </ul>
                        <h6><a href="index.html#">${newelement.title.slice(0,50)}</a></h6>
                        <p> ${newelement.text.slice(0,101)} </p>
                     </div>
                <div class="news-box-f"> <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt=""> ${newelement.author} <a href="index.html#"><i class="fas fa-arrow-right"></i></a> </div>
             </div>
        </div>`
    });
    } else {
        console.log('No data received.');
    }
        
})
.catch(error => {
    console.error(error);
});

        
                 }
            });
         })
        

        
        googleMapsLink.addEventListener('click', function (event) {
            event.preventDefault();
            const selectedCountry = countrySelect.value;
            const googleMapsPageUrl = "https://www.google.com/maps/place/" + selectedCountry;
            window.open(googleMapsPageUrl, '_blank');
        });
        function numberWithCommas(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        
        
       
        
});

emailjs.init("_ZnvnZHdu3jIrU-4f");

function sendEmail(event) {
    event.preventDefault();

    const serviceID = 'service_n00lc3r';
    const templateID = 'template_a614jui';

    const formData = {
        full_name: document.getElementById("full_name").value,
        email_id: document.getElementById("email_id").value,
        message: document.getElementById("message").value
    };
    
    let message=document.getElementById("sucessMessage");
    emailjs.send(serviceID, templateID, formData)
        .then(response => {
            console.log('Email sent successfully:', response);
            alert('Message sent successfully!');
           
        })
        .catch(error => {
            console.error('Email failed to send:', error);
            alert('Error sending message. Please try again later.');
        });
}



//email temp: template_a614jui