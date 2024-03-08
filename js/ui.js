let elKarkasniyList = document.querySelector(".karkasniy-list");
let elNaduvniyList = document.querySelector(".naduvniy-list");
let products = JSON.parse(window.localStorage.getItem("products"));

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let datas = new Date()

let orderProductList = JSON.parse(window.localStorage.getItem("orderList")) || []

// render part start---------------------------------
function renderProduct(arr, list, id) {
    list.innerHTML = "";
    arr.map(item => {
        if(item.type == id) {
            let elItem = document.createElement("li");
            elItem.classList.add("list-item")
            elItem.innerHTML = `
            <img class="karkasniy-render-img" src=${item.img} width="200" height="120" alt="render img"/>
            <span class="
            ${item.status == 1 ? "bg-green-500 text-white" : ""}
            ${item.status == 2 ? "bg-yellow-500 text-white" : ""}
            ${item.status == 3 ? "bg-red-500 text-white" : ""}
            ">
            ${item.status == 0 ? "" : ""}
            ${item.status == 1 ? "Рекомендуем" : ""}
            ${item.status == 2 ? "Cкидка" : ""}
            ${item.status == 3 ? "Нет в наличии" : ""}
            </span>
            <div class="p-3">
                <h2 class="karkasniy-render-name">${item.name}</h2>
                <div class="karkasniy-render-uwrap mt-1">
                <div class="karkasniy-price-wrapper">
                    <small class="karkasniy-render-oldprice">${item.oldPrice}</small>
                    <p class="karkasniy-render-newprice">${item.newPrice}</p>
                </div>
                    <button onclick="orderProduct(${item.id})" class="karkasniy-render-btn">Заказать</button>
                </div>
            </div>
            `
            list.appendChild(elItem)
        }

    })
}
renderProduct(products, elKarkasniyList, "0");
renderProduct(products, elNaduvniyList, "1");
// render part end---------------------------------

// Order product part start ------------------------
function orderProduct(id) {
    const data = products.find(item => item.id == id)
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <div class="modal-render">
        <div class="modal-img-wrapper">
            <img src=${data.img} width="200" height="120"/>
            <p>${data.newPrice} сум</p>
        </div>
        <form class="order-form">
            <input placeholder="Your name" autocomplete="off" required/>
            <input placeholder="Your number" autocomplete="off" required/>
            <input placeholder="Your address" autocomplete="off" required/>
            <button>Заказать</button>
        </form>
    </div>
    `
    let elOrderForm = document.querySelector(".order-form")

    elOrderForm.addEventListener("submit", function(evt) {
        evt.preventDefault();

        let newTime = (`${datas.getDate().toString().padStart(2, "0")}.${(datas.getMonth() + 1).toString().padStart(2, "0")}.${datas.getFullYear()} - ${datas.getHours().toString().padStart(2, 0)}:${datas.getMinutes().toString().padStart(2, 0)}`);
        const orderData = {
            name: evt.target[0].value,
            phoneNumber: evt.target[1].value,
            address: evt.target[2].value,
            time: newTime,
            id: orderProductList.length ? orderProductList[orderProductList.length - 1].id + 1 : 1,
            img: data.img,
            price: data.newPrice
        }
        orderProductList.push(orderData)
        elModalWrapper.classList.remove("open-modal")

        window.localStorage.setItem("orderList", JSON.stringify(orderProductList))
    })
}
// Order product part end ------------------------

// Modal start ----------------------------------
elModalWrapper.addEventListener("click", function(evt) {
    if(evt.target.id == "modal-wrapper") {
        elModalWrapper.classList.remove("open-modal")
    } 
})
// Modal end -----------------------------------

window.localStorage.setItem("orderList", JSON.stringify(orderProductList))