function getRecipe(form){
	//Number of recipes shown on the page
	var maxRecipes = 9;
	
	//Definition of the url to make the request
	var queryURL='https://api.edamam.com/search?&app_id=4d273d6a&app_key=e45844b3b77d94ea901c651c8498d663&q=';
	var food = form.food.value
	var excluded = form.excluded.value
	var url = queryURL+food+"&excluded="+excluded;
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};
	
	//Collect the result of the request
	fetch(url,requestOptions)
		.then(function(response) {return response.json();})
		.then(function(data) {
			result.innerHTML = "";
			
      		for (var i = 0; i < maxRecipes; i++) {
				//variable Card with the result of the request
				var card = document.createElement("div");
				card.id = "newCard";

				card.className="col-lg-4 col-lg-offset-1 col-md-offset-1";
				
				//Add the name of the recipe to the card
				var spanTitle = getName(data, i);
				//formatting
				spanTitle.style.textAlign = "center";
				card.append(spanTitle);
				
      			//Add the image
      			var img = document.createElement("img");
      			img.src = data.hits[i].recipe.image;
      			
				//when the mouse is over the image
				img.addEventListener("mouseover", function( event ) {   
					event.target.style.filter = "grayscale(100%)";
  				})

				// when the mouse is over the image
  				img.addEventListener("mouseout", function( event ) {   
					event.target.style.filter = "grayscale(0%)";
				})
								
				card.append(img);
				
				
      			//Add nutritional informations about the recipe
				var cardNutrition = document.createElement("div");
				var energy = data.hits[i].recipe.calories
				
			    /*var numberservings = data.hits[i].recipe.yield
			    var carbs = data.hits[i].recipe.totalNutrients
			    var fat = data.hits[i].recipe.NutrientInfo[]*/

  				var infEnergy = document.createElement("b");
    			infEnergy.innerHTML = "Energy : " + energy + " Kcal"
    	
  				card.append(infEnergy);

				
				/*Button to see the full recipe on another website*/
				var recipeLink = getRecipeLink(data, i);
				//formatting
				recipeLink.style.top = "1px";
				recipeLink.style.position= "center"
				recipeLink.style.left = "1px";
				//add the button to the card
				card.append(recipeLink); 					

				/*Add the ingredients of the recipe to the card*/
				card.append(getIngredients(data, i));
	
				/*Show the results in the HMTL page*/
				result.appendChild(card);   			
		    }
		})
  .catch(error => alert("Erreur : " + error));
}

//Return the name of the recipe
function getName(data, numRecipe){
	var spanTitle = document.createElement("span");
	var label = data.hits[numRecipe].recipe.label;
	spanTitle.innerHTML = label;
	
	return spanTitle;
}

//Return the link to the recipe details
function getRecipeLink(data, numRecipe){
	var btn = document.createElement("BUTTON"); 
	var recipeLink = document.createElement("a"); 
	//Text in the link element 
	var title = document.createTextNode("See recipe details"); 

	recipeLink.href = data.hits[numRecipe].recipe.url;
	recipeLink.appendChild(title); 
	//Add the link in the button
	btn.appendChild(recipeLink);       
	
	return btn;
}

//Return the ingredients of the recipe
function getIngredients(data, numRecipe) {
	var pRecipe = document.createElement("p");
	var recipeAPI=data.hits[numRecipe].recipe
	
	for (var j = 0; j < recipeAPI.ingredientLines.length; j++) {
		var recipeAPIing = recipeAPI.ingredientLines[j];
		var newIng = document.createElement("p");
		newIng.innerHTML = recipeAPIing;
		pRecipe.append(newIng);
	};
	
	return pRecipe;
}
