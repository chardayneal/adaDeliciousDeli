// ====== DATA ======
adaPrices = {
    breadPrices: {"white": 1.77, "wheat": 2.18, "rye": 2.50, "sourdough": 2.99},
    fillingPrices: {"ham": 3.15, "turkey": 3.55, "chicken": 4.75, "tofu": 2.75, "cheese": 0.55},
    extraPrices: {"lettuce": 0.65, "tomato": 0.88, "avocado": 2.22, "bacon": 3.15},
    discountCode: "ADARULEZ"
};


// Create an event handler for fom submission
function handleFormSubmission(e) {
    e.preventDefault();

    // handle bread selection
    let breadSelection = document.getElementById('bread').value;

    // handle fillings selection(s)
    let fillings = document.getElementsByClassName('meat');
    let fillingSelection = [];
    for (let filling of fillings) {
        if (filling.checked) {
            fillingSelection.push(filling.id);
        }
    }

    // handle extra(s) selected
    let addOns = document.getElementsByClassName('add-ons');
    let extraSelection = [];
    for (let extra of addOns) {
        if (extra.checked) {
            extraSelection.push(extra.id);
        }
    }

    // store promo code value
    let promoCode = document.getElementById("promo-code").value;

    //call function with stored selections
    let total = sandwichOrderCalculator(breadSelection, fillingSelection, extraSelection, promoCode);
    updateWithTotal(total);

    //update UI
    document.querySelector("main").removeChild(document.querySelector("form"));
}

// Create calculator to handle customer selections
function sandwichOrderCalculator(breadType, fillings, extras, promoCode) {
    //initialize customer total
    let customerTotal = 0;

    // ----- STEP 1: Calculate cost of bread
    customerTotal += adaPrices.breadPrices[breadType];

    // ----- STEP 2: Calculate cost of fillings
    fillings.forEach(item => {
        let fillingPrice = adaPrices.fillingPrices[item];
        fillingPrice ? customerTotal += fillingPrice : null;

    });

    // ----- STEP 3: Calculate cost of extras
    extras.forEach(item => {
        let extraPrice = adaPrices.extraPrices[item];
        extraPrice ? customerTotal += extraPrice : null; 
    });

    // ----- STEP 4: Determine valid promo code
    promoCode === adaPrices.discountCode ? customerTotal -= 1.50 : null;

    return customerTotal;
}


// after css styling, come back and setAttributes
function updateWithTotal(total) {
    let container = document.createElement('div');

    let subHeader = document.createElement('h2');
    subHeader.textContent = "Total cost for order: ";
    
    // format total
    let formattedTotal = total.toFixed(2);
    let costElement = document.createElement('h3');
    costElement.textContent = `$${formattedTotal}`;

    // create reset button
    let resetBtn = document.createElement('button');
    resetBtn.textContent = "Start New Order";
    resetBtn.addEventListener('click', () => location.reload());
    
    // append child elements to respective nodes
    container.append(subHeader, costElement,resetBtn);
    document.querySelector('main').append(container);

}
