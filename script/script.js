window.addEventListener("load",function(){

	

	
	


	initGrille();
	initTableau();
	vie();
	InitCopieTableau();

	for(var i=0; i<dimension;i++){
		for(var j=0; j<dimension;j++){
			
			tt[dimension*i+j].addEventListener("click", addCase(i,j),false);
		}
	}
	document.getElementById ("tata").addEventListener ("click", Go, false);
	document.getElementById ("toto").addEventListener ("click", stop, false);

	 document.getElementsByTagName("body")[0].insertBefore(getButtonGo, getTable);
	 document.getElementsByTagName("body")[0].insertBefore(getButtonStop, getTable);
},false);



var dimension=50;
var grille;
var tableau;
var tt = document.getElementsByTagName("td");
var getTable= document.getElementsByTagName("table")[0];
var getButtonGo = document.getElementById("tata");
var getButtonStop= document.getElementById ("toto");

function Case(){
	this.vivant=false;
}

function InitCopieTableau(){
	var i,j;
	tableau=new Array();

	for(i=0;i<dimension;i++){
		tableau[i] = new Array();
		for(j=0;j<dimension;j++){
			tableau[i][j] = new Case();
			
		}
	}
}


function initGrille(){
	var i,j;
	grille=new Array();
	console.log(dimension);
	for(i=0;i<dimension;i++){
		grille[i] = new Array();
		for(j=0;j<dimension;j++){
			grille[i][j] = new Case();
			if (Math.random()<=0.5)
				grille[i][j].vivant = true;
		}
	}
}
	

function initTableau(){
	var table,i,j,tr,td;
	

	table = document.createElement("table");
	for(i=0;i<dimension;i++){
		tr = document.createElement("tr");
		for(j=0;j<dimension;j++){
			td=document.createElement("td");
			
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	
	document.body.appendChild(table);
}

function vie(){
	
	var i,j;

	for(i=0; i<dimension;i++){
		for(j=0;j<dimension;j++){
			if(grille[i][j].vivant===true){
				tt[dimension*i+j].setAttribute('class','vie');
			}
			else{
				tt[dimension*i+j].setAttribute('class','mort');
			}
		}
	}
}



function addCase(i,j){
	return function() {
		grille[i][j].vivant=!grille[i][j].vivant;
	   if(grille[i][j].vivant){
			tt[dimension*i+j].setAttribute('class','vie');
		}else{
			tt[dimension*i+j].setAttribute('class','mort');
		}
		
  }

	
}
	
function v(){
	var bool;
	var i,j;
	let k=0;

	
		for(i=0; i<dimension;i++){
			
			for(j=0;j<dimension;j++){
				bool=grille[i][j].vivant;
				if(grille[i][j].vivant===false ){
					if(etat(i,j)===true){
						bool=true;
					}
				}
				if(grille[i][j].vivant===true ){
					if(etat(i,j)===false){
						bool=false;
					}
				}
				copieTableau(i,j, bool);
			}
		}
		updateTab();
	

}

	
function etat(i,j){
	var bool=false;
	if (grille[i][j].vivant===false && nb_voisine(i,j)===3){
		bool=true;
	}
	if(grille[i][j].vivant===true && nb_voisine(i,j)===2 || nb_voisine(i,j)===3){
		bool=true;
	}
	return bool;
}


function nb_voisine(i,j){
	let voisin=0;
	//bord
	if(i===0 && j===0){
		
		if(grille[i+1][j+1].vivant===true) voisin++;
		if(grille[i][j+1].vivant===true) voisin++;
		if(grille[i+1][j].vivant===true) voisin++;
		
	}
	if(i>0 && i<dimension-1 && j===0){
		if(grille[i+1][j+1].vivant===true) voisin++;
		if(grille[i-1][j+1].vivant===true) voisin++;
		if(grille[i][j+1].vivant===true) voisin++;
		if(grille[i+1][j].vivant===true) voisin++;
		if(grille[i-1][j].vivant===true) voisin++;
		
	}
	if(i>0 && i<dimension-1 && j===49){
		if(grille[i+1][j-1].vivant===true) voisin++;
		if(grille[i-1][j-1].vivant===true) voisin++;
		if(grille[i][j-1].vivant===true) voisin++;
		if(grille[i+1][j].vivant===true) voisin++;
		if(grille[i-1][j].vivant===true) voisin++;
		
	}
	if(i===0 && j>0 && j<49){
		if(grille[i+1][j+1].vivant===true) voisin++;
		if(grille[i+1][j-1].vivant===true) voisin++;
		if(grille[i][j+1].vivant===true) voisin++;
		if(grille[i][j-1].vivant===true) voisin++;
		if(grille[i+1][j].vivant===true) voisin++;
		
	}
	if(i===49 && j>0 && j<49){
		if(grille[i-1][j+1].vivant===true) voisin++;
		if(grille[i-1][j-1].vivant===true) voisin++;
		if(grille[i][j+1].vivant===true) voisin++;
		if(grille[i][j-1].vivant===true) voisin++;
		if(grille[i-1][j].vivant===true) voisin++;
		
	}
	if(i===49 && j===0){
		
		if(grille[i][j+1].vivant===true) voisin++;
		if(grille[i-1][j+1].vivant===true) voisin++;
		if(grille[i-1][j].vivant===true) voisin++;
	
		
	}
	if(i===0 && j===49){
		
		if(grille[i+1][j].vivant===true) voisin++;
		if(grille[i+1][j-1].vivant===true) voisin++;
		if(grille[i][j-1].vivant===true) voisin++;
	}
	if(i===49 && j==49){
		
		if(grille[i-1][j].vivant===true) voisin++;
		if(grille[i-1][j-1].vivant===true) voisin++;
		if(grille[i][j-1].vivant===true) voisin++;
	}
	//bord	
	if(i>0 && i<dimension-1  && j>0 && j<49){
		if(grille[i-1][j+1].vivant===true) voisin++;
		if(grille[i+1][j+1].vivant===true) voisin++;
		if(grille[i-1][j-1].vivant===true) voisin++;
		if(grille[i+1][j-1].vivant===true) voisin++;
		if(grille[i][j+1].vivant===true) voisin++;
		if(grille[i][j-1].vivant===true) voisin++;
		if(grille[i-1][j].vivant===true) voisin++;
		if(grille[i+1][j].vivant===true) voisin++;
	
	}
	
	return voisin;
}

function copieTableau(i,j,bool){
	
	tableau[i][j].vivant = bool;


}
function updateTab(){

	var i,j;
	for(i=0; i<dimension;i++){
		for ( j = 0; j< dimension; j++) {
			if(tableau[i][j].vivant){
				tt[dimension*i+j].setAttribute("class","vie");
				grille[i][j].vivant=tableau[i][j].vivant;
			}
			else{
				tt[dimension*i+j].setAttribute("class","mort");
				grille[i][j].vivant=tableau[i][j].vivant;
			}
		}
	}
}
function Go(){
	document.getElementById ("tata").disabled=true;
	intervalID = setInterval(v, 100);
	
}
function stop(){
	
	clearInterval(intervalID);
	document.getElementById ("tata").disabled=false;
}