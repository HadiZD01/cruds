let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let total = document.getElementById('total');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('btnCreate');


let mood = 'create';
let tmp;

//get total price of product
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value ;
        total.innerHTML = result ; 
        total.style.background ='#0b5e0b';
    } else{
        total.innerHTML = '';
        total.style.background ='#870505';
    }
}
//create a new product 
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
     dataPro= [];
}
create.onclick= function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != ''&& price.value != '' && count.value <= 100 && category.value != ''){
        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i = 0;i < newPro.count;i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }    
        }else{
            dataPro[tmp] = newPro;
            mood='create';
            count.style.display = 'block';
            create.innerHTML = 'create';
        }
        clearData();
    }
    
   // save to localStorage
    localStorage.setItem('product',JSON.stringify(dataPro));
    showData();
}
//clear data
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//read data 
function showData(){
    getTotal();
   let table = '';
    for(let i = 0; i < dataPro.length;i++){
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAll= document.getElementById('deleteAll');
    if(dataPro.length > 0){
        deleteAll.innerHTML = `
           <button onclick="deleteAll()">delete All(${dataPro.length})</button>
        `
    }
}   
showData(); 
//delete product
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
//delete all products
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

//update product
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    btnCreate.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    });




       
}

// search data
let serachMood= 'title';

function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'SearchTitle'){
        searchMood= 'title';
       
    }else{
        searchMood= 'category';
    }
    
    search.placeholder = "search by "+searchMood;
    search.focus();
    search.value = '';
    showData();
}

//search product
function searchData(value){
    let table = '';
    if(serachMood == 'title'){
        for(let i = 0; i < dataPro.length;i++){
            if(dataPro[i].title.includes(value.toLowerCase()))
            {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData(${i})">delete</button></td>
            </tr>
            `;
            } 
        }

    }else{
        for(let i = 0; i < dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase()))
            {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})">update</button></td>
                <td><button onclick="deleteData(${i})">delete</button></td>
            </tr>
            `;
            } 
        }
    }
    document.getElementById('tbody').innerHTML = table;
}








