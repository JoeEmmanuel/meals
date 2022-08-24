const search = document.querySelector("form"),
      result = document.querySelector(".search-result"),
      mealList = document.getElementById("meal"),
      mealBtn = document.querySelector(".meal-btn"),
      recipeContainer = document.querySelector(".recipe-container"),
      closeLink = document.querySelector(".close");

let output = "";

 //  close button

      closeLink.addEventListener("click", () => {
           recipeContainer.parentElement.classList.remove("show-link");
      });




search.addEventListener("submit", (e) => {
  e.preventDefault();

  let outut = e.target.querySelector("input").value.trim();

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${outut}`)
    .then((response) => response.json())
    .then((data) => {
      let html = " ";
      if (data.meals) {
        data.meals.forEach((meal) => {
           html += `

              <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                </div>

                <div class="flex-container">
                  <h2 class="title">${meal.strMeal}</h2>
                  <a href="#" class="btn meal-btn">see recipe</a>
                </div>
              </div>

                `;
        });
        result.style.display = "block";
        mealList.classList.remove("notfound");
      } else{
        html = "sorry we didn't find any meal";
        mealList.classList.add("notfound");
      };

        mealList.innerHTML = html;
    });
});

// RECIPE BTN


mealList.addEventListener("click", (e) => {
      e.preventDefault();
      

      if (e.target.classList.contains('meal-btn')){
           let mealItem = e.target.parentElement.parentElement;
           fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
           .then(response => response.json())
           .then(data => mealRecipeModal(data.meals));
      };
  });
   

      // creating a modal
   function  mealRecipeModal(meal) {
      meal = meal[0];

      let html = `
        <div class="recipe-img">
          <img src="${meal.strMealThumb}">
        </div>
        <div class="recipe-title">
          <h1 class="title">${meal.strMeal}</h1>
        </div>
        <div class="recipe-link">
          <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
      `;
        recipeContainer.innerHTML = html;
        recipeContainer.parentElement.classList.add("show-link");
   };

 
 



