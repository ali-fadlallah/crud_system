var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var searchInput = document.getElementById("searchInput");
var tableProducts = document.getElementById("tableProducts");
var alertName = document.getElementById("alertName");
var alertPrice = document.getElementById("alertPrice");
var alertCate = document.getElementById("alertCate");
var alertDesc = document.getElementById("alertDesc");
var alertAlreadyAdded = document.getElementById("alertAlreadyAdded");
var localStorageName = "sharedData";
var btnAdd = document.getElementById("btnadd");
var btnEdit = document.getElementById("btnedit");
var btndelete = document.getElementById("btndelete");
var modalbody = document.getElementById("modelBody");
var btnclearDatabase = document.getElementById("btnclearDatabase");
var currentProductIndex = 0;
var productList = [];
var newProductList = [];
var regexProductName = /^[a-zA-Z1-9ا-ي أ]{3,100}$/;
var regexProductPrice = /^([1-9][0-9]{0,3}|10000)$/;
var regexProductDescription = /^[a-zA-Z0-9 ]{3,100}$/;


btnEditProduct("none");

if (localStorage.getItem(localStorageName) != null) {

    productList = JSON.parse(localStorage.getItem(localStorageName));
    displayTheProduct();
}

function addProduct() {

    if (validationProductName() && validationProductPrice() && validationProductCate() == false && validationProductDesc()) {

        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        var products =
        {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value,
            addedAt: datetime,
        };


        checkAddedProduct();
        if (newProductList != undefined) {

            alertAlreadyAdded.classList.remove("d-none");

        } else {

            removeInvalidOrValid();
            productList.push(products);
            localStorage.setItem(localStorageName, JSON.stringify(productList));
            displayTheProduct();
            clearProduct();

        }

    }

}

function displayTheProduct() {

    var temp = "";

    productList.forEach((element, i) => {

        temp += `<tr>
        <td>`+ (i + 1) + `</td>
        <td>`+ element.name + `</td>
        <td>`+ element.price + ` EGP</td>
        <td>`+ element.category + `</td>
        <td>`+ element.description + `</td> 

        <td><button class="btn btn-outline-warning" onclick="updateProduct(`+ i + `)">Update</button></td>    

        <td>
        <button" onclick="getProductName(`+ i + `)" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-outline-danger">Delete</button>
      
        </td>
              
        <td>`+ element.addedAt + `</td> 

        </tr>`

    });

    if (productList.length != 0) {

        document.getElementById("tableBody").innerHTML = temp;
        tableProducts.classList.remove("d-none")
        searchInput.classList.remove("d-none")
        btnclearDatabase.classList.remove("d-none")

    } else {

        tableProducts.classList.add("d-none")
        searchInput.classList.add("d-none")
        btnclearDatabase.classList.add("d-none")

    }
}


function getProductName(indexPath) {

    currentProductIndex = indexPath;
    modalbody.innerHTML = "Are you sure to delete  " + productList[currentProductIndex].name + " ?";
}

btndelete.addEventListener("click", function () {

    deleteProduct(currentProductIndex);

});

function clearProduct() {

    productName.value = "";
    productPrice.value = "";
    productCategory.value = "none";
    productDescription.value = "";
    removeInvalidOrValid();
    btnEditProduct("none");
    alertAlreadyAdded.classList.add("d-none");
    btnAddProduct("inline-block");

}

function deleteProduct(indexPath) {

    productList.splice(indexPath, 1);
    localStorage.setItem(localStorageName, JSON.stringify(productList));
    displayTheProduct();
    clearProduct();
    removeInvalidOrValid();
}

function updateProduct(indexPath) {

    currentProductIndex = indexPath;
    productName.value = productList[indexPath].name;
    productPrice.value = productList[indexPath].price;
    productCategory.value = productList[indexPath].category;
    productDescription.value = productList[indexPath].description;

    btnAddProduct("none");
    btnEditProduct("inline-block");
}

function editProduct() {


    if (validationProductName() && validationProductPrice() && validationProductCate() == false && validationProductDesc()) {

        productName.classList.remove("is-valid");
        productPrice.classList.remove("is-valid");
        productDescription.classList.remove("is-valid");


        var products =
        {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value,
        };


        if (checkAddedProduct()) {

            alertAlreadyAdded.classList.remove("d-none");

        } else {

            productList[currentProductIndex] = products;
            localStorage.setItem(localStorageName, JSON.stringify(productList));
            btnEditProduct("none");
            btnAddProduct("inline-block");
            displayTheProduct();
            clearProduct();

        }

    }

}

function btnAddProduct(displayName) {

    btnAdd.style.display = displayName;
}

function btnEditProduct(displayName) {

    btnEdit.style.display = displayName;
}

function searchProducts() {

    var theSearchWord = searchInput.value.toLowerCase();
    var temp = "";

    productList.forEach((element, i) => {

        if (element.name.toLowerCase().includes(theSearchWord) || element.category.toLowerCase().includes(theSearchWord)) {

            temp +=
                `<tr>
        
            <td>`+ (i + 1) + `</td>
            
            <td>` + element.name.toLowerCase().replace(theSearchWord, "<span class='text-danger fw-bold'>" + theSearchWord + "</span>") + `</td>

            <td>` + element.price + ` EGP</td>

            <td>` + element.category.toLowerCase() + `</td>

            <td>` + element.description + `</td> 
    
            <td><button class="btn btn-outline-warning" onclick="updateProduct(` + i + `)">Update</button></td>    

            <td>
            <button" onclick="getProductName(`+ i + `)" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-outline-danger">Delete</button>
          
            </td>
    
           
            
            <td>`+ element.addedAt + `</td> 


                </tr>`

        }

    });

    document.getElementById("tableBody").innerHTML = temp;

}

function clearDataBase() {
    clearProduct()
    localStorage.removeItem(localStorageName);
    productList = [];
    displayTheProduct();
}

// productName.addEventListener("blur", validationProductName);
function validationProductName() {

    if (regexProductName.test(productName.value) == true) {

        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");

        alertName.classList.add("d-none");
        alertName.classList.remove("d-block");

        return true;


    } else {

        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");

        alertName.classList.add("d-block");
        alertName.classList.remove("d-none");
        alertAlreadyAdded.classList.add("d-none");

        return false;

    }

}

// productPrice.addEventListener("blur", validationProductPrice);
function validationProductPrice() {

    if (regexProductPrice.test(productPrice.value) == true) {

        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");

        alertPrice.classList.add("d-none");
        alertPrice.classList.remove("d-block");
        alertAlreadyAdded.classList.add("d-none");

        return true;

    } else {

        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");

        alertPrice.classList.add("d-block")
        alertPrice.classList.remove("d-none")
        return false;

    }
}

function validationProductCate() {

    if (productCategory.value == "none") {

        alertCate.classList.remove("d-none");
        alertCate.classList.add("d-block");

        return true;

    } else {

        alertCate.classList.add("d-none");
        alertCate.classList.remove("d-block");
        alertAlreadyAdded.classList.add("d-none");

        return false;

    }
}

// productDescription.addEventListener("blur", validationProductDesc);
function validationProductDesc() {

    if (regexProductDescription.test(productDescription.value) == true) {

        productDescription.classList.add("is-valid");
        productDescription.classList.remove("is-invalid");

        alertDesc.classList.add("d-none");
        alertDesc.classList.remove("d-block");

        return true;

    } else {

        productDescription.classList.add("is-invalid");
        productDescription.classList.remove("is-valid");

        alertDesc.classList.remove("d-none");
        alertDesc.classList.add("d-block");
        alertAlreadyAdded.classList.add("d-none");

        return false;


    }
}

function removeInvalidOrValid() {

    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productDescription.classList.remove("is-valid");

    productName.classList.remove("is-invalid");
    productPrice.classList.remove("is-invalid");
    productDescription.classList.remove("is-invalid");

    alertName.classList.replace("d-block", "d-none");
    alertPrice.classList.replace("d-block", "d-none");
    alertCate.classList.replace("d-block", "d-none");
    alertDesc.classList.replace("d-block", "d-none");
    alertAlreadyAdded.classList.add("d-none");

}

function checkAddedProduct() {

    var checkByProductName = productName.value.toLowerCase();

    newProductList = productList.find((product) => product.name.toLowerCase() == checkByProductName);


    // var checkByProductName = productName.value.toLowerCase();

    // for (var i = 0; i < productList.length; i++) {

    //     if (productList[i].name.toLowerCase().includes(checkByProductName)) {

    //         return true;

    //     }

    // };

}