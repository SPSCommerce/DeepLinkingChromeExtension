// content.js

/**
 * Creates and adds a custom button next to the customer order number input field in Acumatica.
 * 
 * This function searches for the input field using a function like `findInputFieldAcumatica()` which searches according to the ERP. If the input field
 * is found, it creates a button using `CreateSPSButton()`, sets up an event listener for deep linking
 * to the SPS Fulfillment system, and appends the button next to the input field if it doesn't already exist.
 * 
 * @returns {boolean} True if the button was successfully added, otherwise false.
 */
function addButtonNextToCustomerOrderNbr() {

	let myURL = document.location.href;	
	var inputField;
	//Search for Acumatica Field - failure returns null
	if (myURL.includes("SO301000")) {
		inputField = findInputFieldAcumatica();		
	}
	//TODO add SAP function
	//TODO add Quickbooks function

	// If the input field was not found, return
	if (!inputField)
	{
		console.log('Couldnt find it');
		return;
	}
 
	// Create the button element		
	const button = CreateSPSButton();

    // Create Deep Linking URL Event and add to button
    button.addEventListener('click', () => {
      let url = new URL("https://commerce.spscommerce.com/fulfillment/redirect?keyword=" + inputField.value +  "&searchType=exact&documentType=Order&status=New,Open,Complete");	
		window.open(url, '_blank');   
    });

	// Append button after the input element if it doesn't already exist
	let exists = false;
	exists = (inputField.nextSibling && inputField.nextSibling?.classList?.contains('SPScustomer-order-btn'));
	// Check if a button already exists to avoid duplication
	if (!exists)
	{		
		inputField.insertAdjacentElement('afterend', button);		
		console.log('field: ' + inputField.name +' - button added');
	}

	//Completed
	return true;
  
}

/**
 * Traverses the DOM to find the input field for the customer order number in Acumatica.
 * 
 * This function searches within an iframe with the ID "main" to locate the input field
 * with the ID "edCustomerOrderNbr". If the iframe or the input field cannot be found,
 * it logs an appropriate message to the console and returns null.
 * 
 * @returns {HTMLInputElement|null} The input field element if found, otherwise null.
 */
function findInputFieldAcumatica() {
 //traverses DOM to find the field in a way that works for Acumatica
  const iframe = document.getElementById("main"); 
  if (!iframe)
  {
	  console.log('Couldnt find iframe');
	  return null;
  }
  const iframeDocument = iframe.contentWindow?.document; 
    if (!iframeDocument)
  {
	  console.log('Couldnt find iframe');
	  return null;
  }
  // Find all elements with an ID attribute'
  const inputName = "edCustomerOrderNbr";
  const elements = iframeDocument.querySelectorAll('[id]');
  //Filter to find the correct element with the name above
  const matchingElements = Array.from(elements).filter(element => element.id.includes(inputName));

  // Loop through the elements to find the first one with a non-empty value
  for (let i = 0; i < matchingElements.length; i++) {
	const element = matchingElements[i];

	// Check if the element has a non-empty value attribute
	if (element.value && element.value.trim() !== "") {
	  console.log(`Found element with id "${element.id}" and value: ${element.value}`);
	  return element;
	}
  }

  return null;
}

/**
 * Creates a custom button element for searching SPS Fulfillment orders.
 * 
 * The button is styled with a specific image and dimensions, and includes
 * event listeners to change the image on hover. The button is positioned
 * absolutely at the bottom of its containing element.
 * 
 * @returns {HTMLButtonElement} The fully configured button element.
 */
function CreateSPSButton() {

	// Get the correct URL for sps.png from the extension's directory
	const imageURL = chrome.runtime.getURL("sps.png");
	
	// Create a new button element	
	const button = document.createElement('button');
	button.classList.add('SPScustomer-order-btn');
	button.style.width = '24px'; // Adjust button width to fit image size
	button.style.height = '24px'; // Adjust button height to fit image size    
	button.style.backgroundImage = `url("${imageURL}")`;
	button.style.backgroundSize = 'cover'; // Ensure the image covers the entire button
	button.style.backgroundRepeat = 'no-repeat';
	button.style.border = 'none'; // Remove default border for a cleaner look
	button.style.padding = '0'; // Remove default padding
	button.title = 'Search SPS Fulfillment for Order';
	button.style.position = 'absolute';
	button.style.bottom = '0';

	button.addEventListener('mouseover', () => {
		const imageURL = chrome.runtime.getURL("spshover.png");
		button.style.backgroundImage = `url("${imageURL}")`;
	});
	button.addEventListener('mouseout', () => {
		const imageURL = chrome.runtime.getURL("sps.png");
		button.style.backgroundImage = `url("${imageURL}")`;
	});
	return button;
}

// Set up MutationObserver to monitor for dynamically added elements
function observeDOMChanges() {
  console.log("Setting up MutationObserver");

  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' ) {
        if (addButtonNextToCustomerOrderNbr())
			observer.disconnect();
      }
	  
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}



// Immediately run the function and start observing for dynamic changes
addButtonNextToCustomerOrderNbr();  // Initial run to check for elements
observeDOMChanges();  // Start observing for dynamically added elements
