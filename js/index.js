var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var searchInput = document.getElementById("searchInput");
var localStorageName = "sharedData";
var btnAdd = document.getElementById("btnadd");
var btnEdit = document.getElementById("btnedit");
var currentProductIndex = 0;
var productList = [];

btnEditProduct("none");

if (localStorage.getItem(localStorageName) != null) {

    productList = JSON.parse(localStorage.getItem(localStorageName));
    displayTheProduct();
}

function addProduct() {

    if (productCategory.value == "none") {

        alert("please choose the category");

    } else {

        var products =
        {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value,
        };


        productList.push(products);
        localStorage.setItem(localStorageName, JSON.stringify(productList));
        displayTheProduct();
        clearProduct();
    }

}

function displayTheProduct() {

    var temp = "";

    for (var i = 0; i < productList.length; i++) {

        temp += `<tr>
        
        <td>`+ i + `</td>
        <td>`+ productList[i].name + `</td>
        <td>`+ productList[i].price + `</td>
        <td>`+ productList[i].category + `</td>
        <td>`+ productList[i].description + `</td> 

        <td><button class="btn btn-outline-warning" onclick="updateProduct(`+ i + `)">Update</button></td>    

        <td><button class="btn btn-outline-danger" onclick="deleteProduct(`+ i + `)">Delete</button></td>  
              
        </tr>`
    };

    document.getElementById("tableBody").innerHTML = temp;
}

function clearProduct() {

    productName.value = "";
    productPrice.value = "";
    productCategory.value = "none";
    productDescription.value = "";

    btnEditProduct("none");

    btnAddProduct("inline-block");

}

function deleteProduct(indexPath) {

    productList.splice(indexPath, 1);
    localStorage.setItem(localStorageName, JSON.stringify(productList));
    displayTheProduct();
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


    if (productCategory.value == "none") {

        alert("please choose the category");

    } else {

        var products =
        {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value,
        };

        productList[currentProductIndex] = products;
        localStorage.setItem(localStorageName, JSON.stringify(productList));
        btnEditProduct("none");
        btnAddProduct("inline-block");
        displayTheProduct();
        clearProduct();


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

    for (var i = 0; i < productList.length; i++) {

        if (productList[i].name.toLowerCase().includes(theSearchWord) || productList[i].category.toLowerCase().includes(theSearchWord)) {

            temp +=
                `<tr>
        
            <td>`+ i + `</td>
            
            <td>` + productList[i].name.toLowerCase().replace(theSearchWord, "<span class='text-danger fw-bold'>" + theSearchWord + "</span>") + `</td>

            <td>` + productList[i].price + `</td>

            <td>` + productList[i].category.toLowerCase() + `</td>

            <td>` + productList[i].description + `</td> 
    
            <td><button class="btn btn-outline-warning" onclick="updateProduct(` + i + `)">Update</button></td>    
    
            <td><button class="btn btn-outline-danger" onclick="deleteProduct(` + i + `)">Delete</button></td>  

                </tr>`

        }
    };

    document.getElementById("tableBody").innerHTML = temp;

}

function clearDataBase() {

    localStorage.removeItem(localStorageName);
    productList = [];
    displayTheProduct();
    //hello
}