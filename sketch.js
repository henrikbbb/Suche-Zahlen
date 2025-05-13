let textName, textCounter
let counter
let slider
let sliderText
let checkboxSort, checkboxPickSelectedName
let button
let personFound = false

function setup() {
	noCanvas()
	
	let divNumbers = createDiv()
	divNumbers.id('divNumbers')

	textNumber = createP('')
	textCounter = createP('')

	slider = createSlider(1, 100, 15, 1)
	slider.input(() => {
		sliderText.html(slider.value())
		setupGame()
	})
	slider.hide()
	
	sliderText = createSpan(15)
	sliderText.hide()

	createElement('br')

	button = createButton('suche erneut')
	button.mousePressed(() => {
		setupGame()
	})

	createElement('br')
	createElement('br')

	let details = createElement('details')
	let summary = createElement('summary', 'Einstellungen')
	summary.parent(details)

	checkboxSort = createCheckbox('Zahlen sortieren', false)
	checkboxSort.input(() => {
		setupGame()
	})
	checkboxSort.parent(details)

	checkboxPickSelectedNumber = createCheckbox('gesuchte Zahl ist in Liste enthalten', true)
	checkboxPickSelectedNumber.input(() => {
		setupGame()
	})
	checkboxPickSelectedNumber.parent(details)
	checkboxPickSelectedNumber.hide()

	setupGame()
}

function setupGame() {
	let divNumbers = select('#divNumbers')
	divNumbers.html('')
	numberFound = false;
  
	let selectedNumbers = selectNumbers();
	if (checkboxSort.checked()) {
	  selectedNumbers = selectedNumbers.sort((a, b) => a > b);
	}
  
	let numberSelected = selectedNumbers[Math.floor(Math.random()*selectedNumbers.length)];
	counter = 0;
  
	for (let i = 0; i < selectedNumbers.length; i++) {
	  let number = selectedNumbers[i];
  
	  let divTile = createDiv('?'); // Zahl ist verdeckt
	  divTile.parent(divNumbers);
	  divTile.class('divTile'); // Neue CSS-Klasse für Zahlenkachel
	  divTile.style('display', 'inline-block');
	  divTile.style('width', '60px');
	  divTile.style('height', '60px');
	  divTile.style('margin', '5px');
	  divTile.style('font-size', '24px');
	  divTile.style('text-align', 'center');
	  divTile.style('line-height', '60px');
	  divTile.style('border', '1px solid black');
	  divTile.style('cursor', 'pointer');
	  divTile.attribute('data-name', number);
	  divTile.attribute('data-revealed', 'false');
  
	  divTile.mousePressed(() => {
		if (numberFound || divTile.attribute('data-revealed') === 'true') {
		  return;
		}
  
		divTile.html(number);
		divTile.attribute('data-revealed', 'true');
		counter++;
		textCounter.html(counter + ' Versuche');
  
		if (number === numberSelected) {
		  numberFound = true;
		}
	  });
	}
  
	textNumber.html('Suche ' + numberSelected + '!');
	textCounter.html('0 Versuche');
  }
  

function selectNumbers() {
	let numbers = Array.from({length: 100}, (_, i) => i + 1)
	numbers = numbers.sort((a, b) => 0.5 - random())
	let selectedNumbers = numbers.slice(0, slider.value())
	return selectedNumbers
}
