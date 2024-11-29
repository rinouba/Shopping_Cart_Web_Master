class LogingPage {
  constructor(){
        // list of Pruducts
        this.listOfProducts = [
          {
            id: 1,
            name: "Samsung Galaxy",
            imgSrc: "imgs/Samsung-Galaxy-PNG-File.png",
            price: 200,
            info: "A sleek smartphone with powerful features and an elegant design."
          },
          {
            id: 2,
            name: "Nike Shoes",
            imgSrc: "imgs/Nike-Shoe.png",
            price: 120,
            info: "Comfortable and durable running shoes for everyday use and sports."
          },
          {
            id: 3,
            name: "Apple MacBook",
            imgSrc: "imgs/Apple-MacBook.png",
            price: 1500,
            info: "High-performance laptop designed for creative professionals and advanced users."
          },
          {
            id: 4,
            name: "LG Monitor",
            imgSrc: "imgs/LG-Monitor.png",
            price: 300,
            info: "A vibrant display offering exceptional clarity for work and gaming."
          },
          {
            id: 5,
            name: "Sony Camera",
            imgSrc: "imgs/Sony-Camera.png",
            price: 450,
            info: "Capture stunning photos and videos with this advanced digital camera."
          },
          {
            id: 6,
            name: "Samsung Galaxy Watch",
            imgSrc: "imgs/Samsung-Galaxy-Watch.png",
            price: 250,
            info: "A stylish smartwatch that tracks fitness and enhances daily productivity."
          }
        ];
    // inputs of email and password
    this.emailInput = document.getElementById("email")
    this.passwordInput = document.getElementById("password")
    // local staorage the user data
    this.userData = localStorage.getItem("userData")
    this.productsListOfCart = JSON.parse(localStorage.getItem("ListOfCart")) || []
    // section of form loging 
    this.formLoging = document.getElementById("formLoging")
    // body
    this.body = document.getElementById("body")
    // login navbar button
    this.logged = document.getElementById("logged")
    this.logged.addEventListener("click",() => this.logout() )
    // save user data after submit
    this.LogingFormInputs = document.getElementById("LogingFormInputs")
    this.LogingFormInputs.addEventListener("submit",(e) => this.saveUserDataInLocalStoarge(e))
    // productsList element
    this.productsList = document.getElementById("productsList")
    // getting nav bar + header section + products section
    this.navBar = document.getElementById("navbar")
    this.headerSection = document.getElementById("headerSection")
    // calling ul cart shopping
    this.productsListCartShop = document.getElementById("productsListCartShop")
    // calling show drawer button
    this.drawerCartShop = document.getElementById("drawerCartShop")
    this.drawerCartShop.addEventListener("click",this.addCardToShoppingCart())
    // run fun after refreshnig website 
    this.checkIfLogged()
    this.addCardToShoppingCart() 
    this.calculateTheTotalPrice()
    this.addProductCard()
  }
  // Loging Page
  saveUserDataInLocalStoarge(e){
    e.preventDefault()
    // ckeck if inputs empty or not
    if (!this.passwordInput.value.trim()==""&&!this.emailInput.value.trim()=="") {
        // saving data user
        const dateUserObj = {
          emailUser : this.emailInput.value,
          passwordUser : this.passwordInput.value
        }
        localStorage.setItem("userData",JSON.stringify(dateUserObj))
        this.formLoging.style.display = "none"      
        // pop up a welcome to user > create pop up and append it in body
        const divPopUp = document.createElement("div")
        divPopUp.id = "popUpWelcome"
        divPopUp.classList.add("bg-gray-800","border-gray-700","w-64","p-5","text-white", "font-bold", "text-center", "rounded-lg", "mx-auto", "mt-10")
        divPopUp.textContent = "You Are Welcome"
        const userEmailDiv = document.createElement("div")
        userEmailDiv.id = "userEmail"
        userEmailDiv.innerText = this.emailInput.value
        divPopUp.appendChild(userEmailDiv)
        this.body.appendChild(divPopUp)
        // deleting pop up after 2 seconds
        setTimeout(() => { 
          document.getElementById("popUpWelcome").remove()
         },2000)
        // deleting values of inputs
        this.emailInput.value = ""
        this.passwordInput.value = ""
        this.showHomePage()
    }
  }
  hideHomePage(){
    // put hidden class in nav bar + header section + products section
    document.querySelector("nav").style.display = "none"
    document.querySelectorAll("section")[0].style.display="none"
    document.querySelectorAll("section")[1].style.display="none"
  }
  showHomePage(){
    // remove hidden class from nav bar + header section + products section
    document.querySelector("nav").style.display = "block"
    document.querySelectorAll("section")[0].style.display="block"
    document.querySelectorAll("section")[1].style.display="flex"
  }
  checkIfLogged(){
    if (this.userData==null) {
      this.formLoging.style.display = "block"
      this.logged.innerText = "Log Out"
      this.hideHomePage()
    }else{
      this.formLoging.style.display = "none"
      this.showHomePage()
    }
  }
  logout(){
    localStorage.removeItem("userData")
    this.formLoging.style.display = "block"
    this.hideHomePage()
  }
  // Pruduct + home page
  createProductCard(id,productName, imgSrc, price,info) {
    // Create the article element
    const article = document.createElement('article');
    article.classList.add('flex', 'justify-between', 'flex-col', 'border', 'border-gray-200', 'bg-white', 'p-6', 'shadow-sm', 'dark:border-gray-700', 'dark:bg-gray-800', 'w-11/12', 'sm:w-5/12', 'lg:w-3/12');

    // Create the image element
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = productName;
    img.classList.add('mx-auto', 'hidden', 'dark:block');

    // Append the image to the article
    article.appendChild(img);

    // Create the heading element
    const h1 = document.createElement('h1');
    h1.classList.add('text-lg', 'font-semibold', 'leading-tight', 'text-gray-900', 'hover:underline', 'dark:text-white',"mt-5");
    h1.textContent = productName;

    // Append the heading to the article
    article.appendChild(h1);

    // Create the paragraph element
    const p = document.createElement('p');
    p.classList.add('mt-3', 'text-white');
    p.textContent = info

    // Append the paragraph to the article
    article.appendChild(p);

    // Create the div for price and button
    const div = document.createElement('div');
    div.classList.add('flex', 'justify-between', 'items-center', 'mt-5');

    // Create the price element
    const h3 = document.createElement('h3');
    h3.classList.add('text-2xl', 'font-extrabold', 'leading-tight', 'text-gray-900', 'dark:text-white');
    h3.textContent = `$${price}`;

    // Create the button element
    const button = document.createElement('button');
    button.classList.add('inline-flex', 'items-center', 'rounded-lg', 'bg-blue-700', 'px-5', 'py-2.5', 'text-sm', 'font-medium', 'text-white', 'hover:bg-blue-800', 'focus:outline-none', 'focus:ring-4', 'focus:ring-blue-300', 'dark:bg-primary-600', 'dark:hover:bg-primary-700', 'dark:focus:ring-primary-800');
    button.textContent = 'Add To Cart';
    button.addEventListener("click",(e) => { 
      this.addCardToShoppingCart(id)
     })
    // Append the price and button to the div
    div.appendChild(h3);
    div.appendChild(button);

    // Append the div to the article
    article.appendChild(div);

    // Append the article to the body (or any other container)
    this.productsList.appendChild(article);
  }
  addProductCard(){
    this.listOfProducts.map(({id,productName,imgSrc,price,info}) => { 
      return this.createProductCard(id,productName,imgSrc,price,info)
     })
  }
  // card shop drawer
  addCardToShoppingCart(id){
  // Loop over listOfProducts and add matching item to productsListOfCart
  this.listOfProducts.map((e) => {
    if (Number(id) === Number(e.id)) {
      this.productsListOfCart.push(e);
    }
  });

  // Remove duplicates from productsListOfCart
  this.filterdPrudcts = this.productsListOfCart.filter((item, index, self) =>
    index === self.findIndex((t) => t.id === item.id)
  );

  // Clear the UI and render the filtered products
  productsListCartShop.innerHTML = ""; // Clear existing items
  this.filterdPrudcts.map(({ id, productName, price, imgSrc }) => {
    productsListCartShop.appendChild(this.createProductItem(id, imgSrc, productName, price));
  });

  // Save the filtered products list to local storage
  localStorage.setItem("ListOfCart", JSON.stringify(this.filterdPrudcts));

  this.calculateTheTotalPrice()
  
  }
  createProductItem(id,imgSrc, name, price) {
    // Create the main list item (li)
    const li = document.createElement('li');
    li.classList.add('border-t', 'border-gray-600', 'w-full', 'p-5', 'flex', 'text-white', 'gap-10');
  
    // Create the image element
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = name;
    img.classList.add('w-24');
  
    // Create the content div
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('flex', 'flex-col', 'justify-between');
  
    // Create the product name heading
    const h1 = document.createElement('h1');
    h1.classList.add('text-lg', 'font-semibold', 'leading-tight', 'text-gray-900', 'hover:underline', 'dark:text-white');
    h1.textContent = name;
  
    // Create the price and button container
    const priceAndButtonDiv = document.createElement('div');
    priceAndButtonDiv.classList.add('flex', 'justify-between', 'items-center');
  
    // Create the price heading
    const h2 = document.createElement('h2');
    h2.classList.add('text-2xl', 'font-extrabold', 'leading-tight', 'text-gray-900', 'dark:text-white');
    h2.textContent = `$${price}`;
  
    // Create the button delting
    const button = document.createElement('button');
    button.classList.add('flex', 'items-center', 'font-bold', 'mx-5', 'text-red-600', 'hover:text-red-300');
    button.innerHTML = `
      <svg class="me-2 eVNhx7m5tjSVbfYQzDdT kbeH5ty3CtPKxXm5TXph" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path>
      </svg>
      Remove
    `;
    button.addEventListener("click",(e) => { 
      this.removeProductItem(id)
     })
  
    // Append the price and button to their container
    priceAndButtonDiv.appendChild(h2);
    priceAndButtonDiv.appendChild(button);
  
    // Append the name and price/button container to the content div
    contentDiv.appendChild(h1);
    contentDiv.appendChild(priceAndButtonDiv);
  
    // Append the image and content div to the list item
    li.appendChild(img);
    li.appendChild(contentDiv);
  
    // Return the created list item
    return li;
  }
  removeProductItem(id) {
    // filtering the array based on id
    this.filterdListsShopCart = this.productsListOfCart.filter((e) => e.id !== id)
  
    // Save the updated list to the main cart array
    this.productsListOfCart = this.filterdListsShopCart
  
    //Save the filtered list to localStorage
    localStorage.setItem("ListOfCart", JSON.stringify(this.productsListOfCart));
  
    //Clear the UI and re-render the updated list
    productsListCartShop.innerHTML = ""
    this.productsListOfCart.map(({ id, productName, price, imgSrc }) => {
      productsListCartShop.appendChild(this.createProductItem(id, imgSrc, productName, price));
    });
    this.calculateTheTotalPrice()
  }
  calculateTheTotalPrice(){
    const totalPrice = this.productsListOfCart.reduce(
      (total, card) => total + card.price,0
    );
    document.getElementById("totalPriced").innerHTML = `$${totalPrice}`
  } 
}  

// Initialize TaskManager
new LogingPage();

