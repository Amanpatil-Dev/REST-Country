var borders = []
Preview()
function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
}
window.addEventListener('load', sendAjaxRequest);
const DetailsPage = document.querySelector('.details')
const Toggle_Theme = document.querySelector('.toggle-theme')
Toggle_Theme.addEventListener('click', (e) => {
    const Link = e.target.closest('.toggle-theme')

    console.log(Link.firstElementChild)
    if (Link.firstElementChild.classList.contains('light-theme')) {
        if (DetailsPage) {
            DetailsPage.classList.add('details-active')
        }

        Link.firstElementChild.classList.remove('light-theme')
        Link.firstElementChild.classList.add('dark-theme')
        Link.firstElementChild.innerHTML = `
      <i class="fa fa-sun-o" aria-hidden="true"></i> LightMode`

        document.querySelector('header').classList.add('card-dark-active')

        document.querySelectorAll('.bg-body-custom').forEach((val) => {
            val.classList.add('bg-body-dark-active')
        })
        document.querySelector('body').classList.add('bg-body-dark-active')

        document.querySelectorAll('.card').forEach((val) => {
            val.classList.add('card-dark-active')
        })

        document.querySelector('input').classList.add('input-dark-active')
        document.querySelector('label').style.color = 'white'

    } else {
        if (DetailsPage) {
            DetailsPage.classList.remove('details-active')
        }

        Link.firstElementChild.classList.remove('dark-theme')
        Link.firstElementChild.classList.add('light-theme')

        Link.firstElementChild.innerHTML = `
    <i class="fa fa-moon-o mx-2" aria-hidden="true"></i> DarkMode`

        document.querySelector('header').classList.remove('card-dark-active')



        document.querySelectorAll('.bg-body-custom').forEach((val) => {
            val.classList.remove('bg-body-dark-active')
        })

        document.querySelector('body').classList.remove('bg-body-dark-active')

        document.querySelectorAll('.card').forEach((val) => {

            val.classList.remove('card-dark-active')
        })

        document.querySelector('input').classList.remove('input-dark-active')
        document.querySelector('label').style.color = 'black'

    }
})


const Submit_form = document.querySelector('#Sub')

Submit_form.addEventListener('keypress', (e) => {
    const Country = document.querySelector('input').value
    if (e.key === 'Enter') {

        if (Country) {
            console.log('enter key')

            e.preventDefault()
            SearchCountry(titleCase(Country))
            const Back = document.querySelector('.back-Btn')
            if (Back.classList.contains('d-none')) {
                Back.classList.remove('d-none')
                document.querySelector('.btn-group').style.display = 'none'
            }

        } else {
            console.log('No input but enter key pressed')
        }


    }
})

const SearchCountry = (Country) => {

    document.querySelectorAll('.card-title').forEach((val) => {
        if (val.innerHTML !== Country) {
            console.log(val.parentElement.parentElement.parentElement.style.display = 'none')
        }
    })


}


function sendAjaxRequest() {

    const xhr = new XMLHttpRequest()

    xhr.open('GET', `https://restcountries.eu/rest/v2/all`, true)

    xhr.onload = async function () {
        if (this.status == 200) {
            const result = JSON.parse(this.responseText)

            const Obj = result.map((val, i, arr) => {
                return obj = {
                    name: val.name,
                    population: val.population,
                    region: val.region,
                    capital: val.capital,
                    flag: val.flag
                }
            })
            if (localStorage.getItem('data') == null) {
                localStorage.setItem('data', '[]')
            }
            localStorage.setItem('data', JSON.stringify(Obj))

            Preview()



        }
    }

    xhr.send()



}


function Preview() {
    if (!document.querySelector('.back-Btn').classList.contains('d-none')) {
        document.querySelector('.back-Btn').classList.add('d-none')
    }

    if (document.querySelector('.btn-group').style.display == "none") {

        document.querySelector('.btn-group').style.display = "inline-flex"

    }


    if (document.querySelector('.main-row').style.display == "none") {
        document.querySelector('.main-row').style.display = "flex"
    }


    const Body = document.querySelector('body')

    const Url_Container = document.querySelector('.country-container')
    if (localStorage.getItem('data') != null) {
        const Data = JSON.parse(localStorage.getItem('data'))
        let html = ""


        Data.forEach((val, i, arr) => {
            const Theme = Body.classList.contains('bg-body-dark-active') ? 'card-dark-active' : 'card'

            html += ` 
            <div class="col-sm-12 col-md-6 col-lg-3">
            <div class="card ${Theme}">
            <div class='Overflow'>
                <img onClick="GetCountry('${val.name}')" src=${val.flag} class="card-img-top" alt="...">
                </div>
                <div class="card-body">
            <h5 class="card-title">${val.name}</h5>
                    <h6 class="card-subtitle mt-4 mb-3">Populaion: 
                     <span class=" text-muted">
                            ${val.population}</span></h6>
                    <h6 class="card-subtitle mb-3 ">Region: <span class="region text-muted">${val.region}</span>
                    </h6>
                    <h6 class="card-subtitle mb-3">Capital: <span class=" text-muted">${val.capital}</span>
                    </h6>
                </div>
            </div>
        </div>`
        })

        Url_Container.innerHTML = html



    }
}


function FilterReg(CountryName) {
    document.querySelector('.btn-group').style.display = 'none'

    document.querySelectorAll('.region').forEach((val) => {
        if (val.innerText !== CountryName) {
            console.log(val.parentElement.parentElement.parentElement.parentElement.style.display = 'none')
        }
    })
    const Back = document.querySelector('.back-Btn')
    if (Back.classList.contains('d-none')) {
        Back.classList.remove('d-none')
    }


}

function GetCountry(countryName) {

    GetaCountry(countryName)

}

function GetaCountry(name) {

    const xhr = new XMLHttpRequest()

    xhr.open('GET', `https://restcountries.eu/rest/v2/name/${name}`, true)

    xhr.onload = async function () {
        if (this.status == 200) {

            const result = JSON.parse(this.responseText)
            console.log(result)
            if (name == 'India') {

                const [India] = [result[1]]
                ShowNewPage([India], result[0].borders)

            } else {
                ShowNewPage(result, result[0].borders)

            }

        }
    }

    xhr.send()
}

async function ShowNewPage(result, borders) {
    const Container = document.querySelector('.country-container')
    console.log(Container)
    document.querySelector('.main-row').style.display = 'none'

    if (document.querySelector('.back-Btn').classList.contains('d-none')) {
        document.querySelector('.back-Btn').classList.remove('d-none')
    }

    if (borders.length == 0) {
        console.log(borders[0] = 'no border')
        htmlnew = ` <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6 my-4">
                <img src="${result[0].flag}" alt="" class="img-fluid">
    
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
                <div class="details mt-3">
                    <h1>${result[0].name}</h1>
                    <h6>Native Name: <span class=" text-muted population">${result[0].nativeName}</span>
                    </h6>
                    <h6>population: <span class="population text-muted">${result[0].population}</span></h6>
    
                    <h6>region: <span class="population text-muted">${result[0].region}</span></h6>
    
                    <h6>sub-region: <span class="population text-muted">${result[0].subregion}</span></h6>
                    
      <div class="col-6 col-sm-12">
                    <h6 class="cap">captial: <span class="population text-muted">${result[0].capital}</span></h6>
    
                    <h6>Top level domain: <span class="population text-muted">${result[0].topLevelDomain}</span></h6>
    
                    <h6>Currency: <span class="population text-muted">${result[0].currencies[0].name}</span></h6>
    
                    <h6>Language: <span class="population text-muted">${result[0].languages[0].name},${result[0].languages[0].nativeName}</span></h6>
    
                    <h6>Borders Countries: <span class=" text-muted"> ${borders[0]}</span></h6>
                   </div>
                </div>
            </div>
        </div>
    </div>`

        Container.innerHTML = htmlnew


    } else {
        html = ``

        const newAryy = borders.map((val) => {
            return BorderAjax(val)
        })

        async function BorderAjax(val) {
            let x = await fetch(`https://restcountries.eu/rest/v2/alpha/${val}`)
            let y = await x.json()
            DisplayBorders(y)
        }

        function DisplayBorders(y) {
            html += `<h5 class="me-3 mt-2 b" onclick="GetCountry('${y.name}')">${y.name}  </h5>`;

            htmlnew = ` <div class="container">
            <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-6 my-4">
                <img src="${result[0].flag}" alt="" class="img-fluid">
    
            </div>
            <div class="col-sm-12 col-md-6 col-lg-6">
                <div class="details row mt-3">
                    <h1>${result[0].name}</h1>

                    <div class="col-6 col-sm-12">

                    <h6>Native Name: <span class=" text-muted population">${result[0].nativeName}</span>
                    </h6>
                    <h6>population: <span class="population text-muted">${result[0].population}</span></h6>
    
                    <h6>region: <span class="population text-muted">${result[0].region}</span></h6>
    
                    <h6>sub-region: <span class="population text-muted">${result[0].subregion}</span></h6>
                </div>

                <div class="col-6 col-sm-12">
    
                    <h6 class="cap">captial: <span class="population text-muted">${result[0].capital}</span></h6>
    
                    <h6>Top level domain: <span class="population text-muted">${result[0].topLevelDomain}</span></h6>
    
                    <h6>Currency: <span class="population text-muted">${result[0].currencies[0].name}</span></h6>
    
                    <h6>Language: <span class="population text-muted">${result[0].languages[0].name},${result[0].languages[0].nativeName}</span></h6>
                    </div>

    
                    <h6 class="bord">Borders Countries: </h6>
                    <div class=" text-muted"> ${html}</div>
                   
                </div>
            </div>
                </div>
             </div>`
            Container.innerHTML = htmlnew

        }
    }

}

