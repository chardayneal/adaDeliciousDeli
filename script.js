// ====== DATA TO PERSIST======
let adaPrices = {
    breadPrices: {"white": 1.77, "wheat": 2.18, "rye": 2.50, "sourdough": 2.99},
    fillingPrices: {"ham": 3.15, "turkey": 3.55, "chicken": 4.75, "tofu": 2.75, "cheese": 0.55},
    extraPrices: {"lettuce": 0.65, "tomato": 0.88, "avocado": 2.22, "bacon": 3.15},
    discountCode: "ADARULEZ"
};

let customerOrder = {
    "Bread": {},
    "Fillings": {},
    "Extras": {},
    "Promo Code": ""
};

// Create an event handler for fom submission
function handleFormSubmission(e) {
    e.preventDefault();

    // handle bread selection
    let breadSelection = document.getElementById('bread').value;

    // handle fillings selection(s)
    let fillings = document.getElementsByClassName('meat');
    let fillingSelection = [];
    for (let option of fillings) {
        if (option.checked) {
            fillingSelection.push(option.id);
        }
    }

    // handle extra(s) selected
    let addOns = document.getElementsByClassName('add-ons');
    let extraSelection = [];
    for (let option of addOns) {
        if (option.checked) {
            extraSelection.push(option.id);
        }
    }

    // store promo code value
    let promoCode = document.getElementById("promo-code").value;

    //call function with stored selections
    let total = sandwichOrderCalculator(breadSelection, fillingSelection, extraSelection, promoCode);
    

    //update UI
    document.querySelector("main").removeChild(document.querySelector("form"));
    createReceipt(customerOrder);
    updateWithTotal(total);
}

// Create calculator to handle customer selections
function sandwichOrderCalculator(breadType, fillings, extras, promoCode) {
    //initialize customer total
    let customerTotal = 0;

    // ----- STEP 1: Calculate cost of bread
    let breadPrice = adaPrices.breadPrices[breadType]
    customerTotal += breadPrice;
    //  update customer's order
    customerOrder["Bread"][breadType] = breadPrice;
    
    

    // ----- STEP 2: Calculate cost of fillings
    fillings.forEach(item => {
        let fillingPrice = adaPrices.fillingPrices[item];
        fillingPrice ? customerTotal += fillingPrice : null;
        customerOrder["Fillings"][item] = fillingPrice;  
    });

    // ----- STEP 3: Calculate cost of extras
    extras.forEach(item => {
        let extraPrice = adaPrices.extraPrices[item];
        extraPrice ? customerTotal += extraPrice : null;
        customerOrder["Extras"][item] = extraPrice; 
    });

    // ----- STEP 4: Determine valid promo code
    promoCode === adaPrices.discountCode ? customerTotal -= 1.50 : null;
    customerOrder["Promo Code"] = promoCode;
    return customerTotal;
}


// after css styling, come back and setAttributes
function updateWithTotal(total) {
    let container = document.createElement('div');

    let subHeader = document.createElement('h3');
    subHeader.textContent = "Total cost for order: ";
    
    // format total
    let formattedTotal = total.toFixed(2);
    let costElement = document.createElement('h4');
    costElement.textContent = `$${formattedTotal}`;

    // create reset button
    let resetBtn = document.createElement('button');
    resetBtn.textContent = "Start New Order";
    resetBtn.addEventListener('click', () => {
        resetCustomerOrder();
        window.location.href = './index.html';

    });

    // append child elements to respective nodes
    container.append(subHeader, costElement,resetBtn);
    document.querySelector('main').append(container);
}

function createReceipt(object) {

    let sectionNode = document.createElement('section');
    sectionNode.setAttribute('class', "receipt");

    let receiptTitle = document.createElement('h2');
    receiptTitle.textContent = "Order Receipt";

    sectionNode.append(receiptTitle);

    let headers = Object.keys(object);
    

    headers.forEach(header => {
        // create food item container
        let foodItem = document.createElement('div');
        foodItem.setAttribute('class', 'food-item');

        let foodTitle = document.createElement('h4');
        foodTitle.textContent = header;

        foodItem.append(foodTitle);
        listSelection(foodItem, object[header]);
        sectionNode.append(foodItem); 
    });

    document.querySelector('main').append(sectionNode);
}

function listSelection(parentNode, value) {

    if (typeof value === 'string' && value === 'ADARULEZ') {
        let selection = document.createElement('div');
        selection.setAttribute('class', 'selection');

        let title = document.createElement('span');
        title.textContent = "Discount";

        let price = document.createElement('span');
        price.textContent = `- $1.50`;

        selection.append(title, price);
        parentNode.append(selection);
    } else {        
        let keys = Object.keys(value);
        keys.forEach(key => {
            let selection = document.createElement('div');
            selection.setAttribute('class', 'selection');

            let name = document.createElement('span');
            name.textContent = key.charAt(0).toUpperCase() + key.slice(1);

            let price = document.createElement('span');
            price.textContent = `$${value[key]}`;
            
            selection.append(name, price);
            parentNode.append(selection);
        });
    }  
}

function resetCustomerOrder() {
    customerOrder = {
        "Bread": {},
        "Fillings": {},
        "Extras": {},
        "Promo Code": ""
    };
}