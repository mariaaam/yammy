//  <reference types="../@types/jquery" />
// 
// -------------------variable----------------------

const DataContain = document.getElementById("DataContain");
const searchContain = document.getElementById("searchContain");
const search=document.getElementById("search");
const Categories=document.getElementById("Categories");
const Area=document.getElementById("Area");
const Ingredients=document.getElementById("Ingredients");
let submitBtn;


// ---------------------loading page---------------------------
$(document).ready(() => {
      searchByName("").then(() => {
        $(".loading-screen").fadeOut(300)
        $("body").css("overflow", "visible")

     })
})

  

// ----------------------------open side---------------------
function openSideNav() {
    $(".sideMenu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

// ----------------------close side--------------------
function closeSideNav() {
    let Width = $(".sideMenu .navTab").outerWidth()
    $(".sideMenu").animate({
        left: -Width
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".sideMenu i.open-close-icon").click(() => {
    if ($(".sideMenu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})


// ------------------meals details-----------------
async function getMealDetails(mealID) {
    
    DataContain.innerHTML = ""
    $(".innerLoading").fadeIn(300)

    searchContain.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".innerLoading").fadeOut(300)

}


function displayMeals(arrayMeal) {
    let container = "";

    for (let i = 0; i < arrayMeal.length; i++) {
        container += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arrayMeal[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${arrayMeal[i].strMealThumb}" alt="meal">
                    <div class="meal-layer position-absolute 
                    d-flex align-items-center text-black p-2">
                        <h3>${arrayMeal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    DataContain.innerHTML = container;
}



// ---------------------categories--------------------------

async function getCategories() {
    DataContain.innerHTML = ""
    $("innerLoading").fadeIn(200)
    searchContain.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
      
    displayCategories(response.categories)
    $("innerLoading").fadeOut(200)

}

function displayCategories(cate) {
    let container = "";

    for (let i = 0; i < cate.length; i++) {
        container += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${cate[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${cate[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${cate[i].strCategory}</h3>
                        <p>${cate[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    DataContain.innerHTML = container;
}
 
Categories.addEventListener("click",function()
    {
    
    getCategories();
    closeSideNav();
})


// -------------------area details------


async function getArea() {
    DataContain.innerHTML = ""
    $(".innerLoading").fadeIn(400)

    searchContain.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    // console.log(respone.meals);

    displayArea(respone.meals)
    $(".innerLoading").fadeOut(400)

}


function displayArea(Area) {
    let container = "";

    for (let i = 0; i < Area.length; i++) {
        container += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${Area[i].strArea}')" 
                class="rounded-2 text-center ">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${Area[i].strArea}</h3>
                </div>
        </div>
        `
    }

    DataContain.innerHTML = container;
}


Area.addEventListener("click",function()
    {
    
        getArea()
    closeSideNav();
})


// -----------------------Ingredients------------------

async function getIngredients() {
DataContain.innerHTML = ""
    $(".innerLoading").fadeIn(300)

    searchContain.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    // console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".innerLoading").fadeOut(300)

}


function displayIngredients(arrIng) {
    let container = "";

    for (let i = 0; i < arrIng.length; i++) {
        container += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arrIng[i].strIngredient}')" 
                class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arrIng[i].strIngredient}</h3>
                        <p>${arrIng[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    DataContain.innerHTML =container;
}

Ingredients.addEventListener("click",function(){
    getIngredients();
    closeSideNav();
})

// ---------------------data  ==================
// ---------------------ingredients-------------
async function getIngredientsMeals(ingredients) {
    DataContain.innerHTML = ""
    $(".innerLoading").fadeIn(100)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".innerLoading").fadeOut(100)

}

// ------------------------Category-----------------

async function getCategoryMeals(category) {
    DataContain.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(200)

}

// -----------------------area------------------

async function getAreaMeals(area) {
    DataContain.innerHTML = ""
    $(".innerLoading").fadeIn(100)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".innerLoading").fadeOut(100)

}



// --------------------------ingredients-------------------

function displayMealDetails(meal) {
    
    searchContain.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let container = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    DataContain.innerHTML = container;
}


// --------------------search-----------------

function showSearch() {
    searchContain.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)"
             class="form-control bg-transparent text-white mb-4" type="text "
              placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)"
             maxlength="1" 
             class="form-control bg-transparent text-white mb-4"
             type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    DataContain.innerHTML = ""
}

async function searchByName(meal) {
    DataContain.innerHTML = ""
    $(".innerLoading").fadeIn(200)

    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".innerLoading").fadeOut(200)

}

async function searchByFLetter(meal) {
    
    DataContain.innerHTML = "";
    $(".innerLoading").fadeIn(200)

    meal == "" ? meal = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${meal}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".").fadeOut(200)

}

search.addEventListener("click",function(){
    showSearch();
    closeSideNav();
})



// ----------------------CONTACT--------



function showContacts() {
    DataContain.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center
     align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()"
                 type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" 
                type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid 
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text"
                 class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger 
                w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()"
                 type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()"
                 type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    nameInput.addEventListener("focus", () => {
        nameInputTouched = true
    })

    emailInput.addEventListener("focus", () => {
        emailInputTouched = true
    })

    phoneInput.addEventListener("focus", () => {
        phoneInputTouched = true
    })

    ageInput.addEventListener("focus", () => {
        ageInputTouched = true
    })

    passwordInput.addEventListener("focus", () => {
        passwordInputTouched = true
    })

    repasswordInput.addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}




let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
      submitBtn.addEventListener("click",function(){
          alert("sucsess")
      })  
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
  
    let nameInput= document.getElementById("nameInput");

    return (/^[a-zA-Z ]+$/.test(nameInput.value));
}

function emailValidation() {

    let emailInput=document.getElementById("emailInput");

    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value))
}

function phoneValidation() {
    let phoneInput=document.getElementById("phoneInput");

    return (/^01[0125][0-9]{8}$/
    .test(phoneInput.value))
}

function ageValidation() {
    let ageInput=document.getElementById("ageInput");


    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    .test(ageInput.value))
}

function passwordValidation() {
    let passwordInput=document.getElementById("passwordInput");

    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    .test(passwordInput.value))
}

function repasswordValidation() {
    let passwordInput=document.getElementById("passwordInput");

    let repasswordInput=document.getElementById("repasswordInput");

    return repasswordInput.value == passwordInput.value
}



const Contact=document.getElementById("Contact");
Contact.addEventListener("click",function(){
    showContacts()
    
    closeSideNav();
})


