const searchBtn = document.getElementById('search-btn');
const itemList = document.getElementById('item');
const mealDetailsContent = document.querySelector('.item-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');



searchBtn.addEventListener('click', getItemList);
itemList.addEventListener('click',getItemRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getItemList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();


    // console.log(searchInputTxt);

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)

     .then(response => response.json())
     .then(data => {
        // console.log(data);

        let html = "";
       if(data.meals){
           data.meals.forEach(item => {
                html += `
                        <div class="food-item" data-id="${item.idMeal}">
                            <div class="item-img">
                                <img src="${item.strMealThumb}"alt="food">
                            </div>
                            <div class= "item-name">
                                <h3>${item.strMeal}</h3>
                                <a href ="#"class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>
               `;

           });
           itemList.classList.remove('notFound');
        }else{
            html="Sorry,we didn't find any food";
            itemList.classList.add('notFound');
        }

        itemList.innerHTML=html;

    });
}






function getItemRecipe(e){
  e.preventDefault();
//   console.log(e.target);
 if(e.target.classList.contains('recipe-btn')){         let foodItem = e.target.parentElement.parentElement;
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)

     .then(response => response.json())
     .then(data => foodRecipeModal(data.meals));
    }
}


 function foodRecipeModal(item){
    console.log(item);
   item = item[0];

    let html = `

    <h2 class = "recipe-title">${item.strMeal}</h2>
    <p class = "recipe-category">${item.strCategory}</p>
    <div class = "recipe-instruct">
        <h3>Instructions:</h3>
        <p>${item.strInstructions}</p>
    </div>
    
        
    `;

    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}









     