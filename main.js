function getRecipe(form){
	//Number of recipes shown on the page
	var maxRecipes = 9;
	//var defClassName = "col-lg-3"
	
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
				
				/*Add the name of the recipe to the card*/
				var spanTitle = getName(data, i);
				//formatting
				//spanTitle.className = defClassName;
				spanTitle.style.textAlign = "center";
				card.append(spanTitle);
		        //--------------------------------------------------------------
      			//Add the image
      			var img = document.createElement("img");
      			//var cardImg = document.createElement("div");
      			img.src = data.hits[i].recipe.image;
      			
      			//Add nutritional informations about the recipe
				var energy = data.hits[i].recipe.calories
			   // var numberservings = data.hits[i].recipe.yield
			   //var carbs = data.hits[i].recipe.totalNutrients
			   // var fat = data.hits[i].recipe.NutrientInfo[]

  				var infEnergy = document.createElement("b");
    			infEnergy.innerHTML = "Energy : " + energy + " Kcal"
    			
    			//infEnergy.style.position="absolute";
  				infEnergy.style.top="10px"; 
  				infEnergy.style.width="100px"; 
  				infEnergy.style.height="0px";
  				

  				//infEnergy.style.visibility="hidden";

  				//infEnergy.style.zindex="2";
  				//infEnergy.style.fontsize="50%";
    			

    			//when the mouse is over the image
				img.addEventListener("mouseover", function( event ) {   
  				// on met l'accent sur la cible de mouseover
				
  				event.target.style.filter = "grayscale(100%)";
				
  				//event.target.style.background-color: #008CBA;

  				//document.getElementById("infEnergy").style.visibility = "visible";

  				//var infcarbs = document.createElement("span");
    			//infcarbs.innerHTML = "   carbs : " + carbs 
    			//card.append(infcarbs);
  				})

				// when the mouse is over the image
  				img.addEventListener("mouseout", function( event ) {   
  				// on met l'accent sur la cible de mouseover
				img.append(infEnergy);
  				event.target.style.filter = "grayscale(0%)";})
				

				
				//cardImg.append(img);
				
				//cardImg.className = defClassName;
				card.append(img);
				//----------------------------------------------------------------------------------
				
				/*Button to see the full recipe on another website*/
				var recipeLink = getRecipeLink(data, i);
				//formatting
				//recipeLink.className = defClassName;
				recipeLink.style.top = "1px";
				recipeLink.style.position= "center"
				recipeLink.style.left = "1px";
				//add the button to the card
				card.append(recipeLink); 					

				/*Add the ingredients of the recipe to the card*/
				//-----------------------------------------accordion
				card.append(getIngredients(data, i));
	
				/*Show the results in the HMTL page*/
				result.appendChild(card);   			
		    }
		})
  .catch(error => alert("Erreur : " + error));
  
  //Reset the search bar once the request is made
	document.getElementById('food').value = "";
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
