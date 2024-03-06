
let elAddBtn = document.querySelector(".add-button")
let tBody = document.querySelector(".tbody")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let elSearchInput = document.querySelector(".search-input")
let elSearchList = document.querySelector(".search-list")


let products = JSON.parse(window.localStorage.getItem("products")) || []

elAddBtn.addEventListener("click", function() {
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
        <form class="add-form">
            <label>
                <div class="w-[80%] mx-auto bg-white">
                    <img class="render-img rounded-[50px] h-[250px]" src="./images/choose-img.png" alt="Select img" width="100%" height="100%"/>
                </div>
                <input class="visually-hidden get-img" type="file"/>
            </label>

            <div class="p-3 bg-white mt-5 flex justify-between">
                <div class="w-[49%] flex flex-col gap-5">
                    <label class="flex flex-col">
                        <span>Enter product name</span>
                        <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product name"/>
                    </label>

                    <label class="flex flex-col">
                        <span>Enter product old price</span>
                        <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product old price"/>
                    </label>

                    <label class="flex flex-col">
                        <span>Enter product new price</span>
                        <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product new price"/>
                    </label>
                </div>

                <div class="w-[49%] flex flex-col gap-5">
                    <label class="flex flex-col">
                        <span>Enter product quantity</span>
                        <input class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product quantity"/>
                    </label>

                    <label class="flex flex-col">
                        <span>Choose type</span>
                        <select class="p-2 border-[1px] border-black rounded-md">
                            <option value="0">Каркасные</option>
                            <option value="1">Надувные</option>
                        </select>
                    </label>

                    <label class="flex flex-col">
                        <span>Choose status</span>
                        <select class="p-2 border-[1px] border-black rounded-md">
                            <option value="0">Not</option>
                            <option value="1">Рекомендуем</option>
                            <option value="2">Cкидка</option>
                            <option value="3">Нет в наличии</option>
                        </select>
                    </label>
                </div>
            </div>
            <button class="bg-teal-500 p-2 font-bold text-white w-[200px] rounded-[20px] block mx-auto my-3">Добавить</button>
        </form>
    `

    let elForm = document.querySelector(".add-form")
    let elInputChoose = document.querySelector("choose-img-input")
    let elRenderImg = document.querySelector(".render-img")
    let elInputChange = document.querySelector(".get-img")

    elInputChange.addEventListener("change", function(evt) {
        elRenderImg.src = URL.createObjectURL(evt.target.files[0])
    })

    elForm.addEventListener("submit", function(evt) {
        evt.preventDefault();
        let data = {
            id: products.length,
            img: URL.createObjectURL(evt.target[0].files[0]),
            name: evt.target[1].value,
            oldPrice: evt.target[2].value,
            newPrice: evt.target[3].value,
            quantity: evt.target[4].value,
            type: evt.target[5].value,
            status: evt.target[6].value
        }
        products.push(data)
        renderProducts(products, tBody, evt.target[5].value);
        elModalWrapper.classList.remove("open-modal")
        window.localStorage.setItem("products", JSON.stringify(products))
        if(evt.target[5].value == 0) {
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
        }
        else {
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500")
        }
    })
})

elModalWrapper.addEventListener("click", function(evt) {
    if(evt.target.id == "modal-wrapper") {
        elModalWrapper.classList.remove("open-modal")
    }
})

let elNavList = document.querySelector(".nav-list")
let elItem1 = document.querySelector(".item1")
let elItem2 = document.querySelector(".item2")

elNavList.addEventListener("click", function(evt) {
    if(evt.target.id) {
        if(evt.target.id == 0) {
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
        }
        else {
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500")
        }
    }
    renderProducts(products, tBody, evt.target.id)
})



function renderProducts(arr, list, id) {
    list.innerHTML = ""
    arr.filter(item => {

        let elTr = document.createElement("tr")
        if(item.type == id) {
            elTr.innerHTML = `
                <tr class="mt-5 ">
                    <td class="text-center p-1 bg-slate-300 rounded-l-[20px]">
                        <img class="mx-auto" src="${item.img}" alt="Render img" width="40" height="40"/>
                    </td>
                    <td class="text-center p-1 bg-slate-300 text-[20px]">${item.name}</td>
                    <td class="text-center p-1 bg-slate-300 flex flex-col">
                        <span class="text-[13px] line-through">${item.oldPrice}</span>
                        <span class="text-[18px]">${item.newPrice}</span>
                    </td>
                    <td class="text-center p-1 bg-slate-300">${item.quantity}</td>
                    <td class="text-center p-1 bg-slate-300 ${item.status == "1" ? "text-green-500" : ""} ${item.status == "2" ? "text-yellow-400" : ""} ${item.status == "3" ? "text-red-500" : ""}">
                        ${item.status == "0" ? "простой" : ""}
                        ${item.status == "1" ? "Рекомендуем" : ""}
                        ${item.status == "2" ? "Cкидка" : ""}
                        ${item.status == "3" ? "Нет в наличии" : ""}
                    </td>
                    <td class="text-center p-1 bg-slate-300 rounded-r-[20px]">
                        <button onclick="updateProduct(${item.id})" class="bg-none p-1 bg-green-500 text-white rounded-md">Update</button>
                        <button onclick="deleteProduct(${item.id})" class="p-1 bg-red-500 text-white rounded-md">Delete</button>
                    </td>
                </tr>
            `
            list.appendChild(elTr)
        }
    })
}
renderProducts(products, tBody, 0)


// Update part start --------------------------------
function updateProduct(id) {
    let data = products.find(item => item.id == id)
    elModalWrapper.classList.add("open-modal")
        elModal.innerHTML = `
        <form class="update-form">
            <label>
                <div class="w-[80%] mx-auto bg-white">
                    <img class="update-render-img rounded-[50px] h-[250px]" src=${data.img} alt="Select img" width="100%" height="100%"/>
                </div>
                <input class="visually-hidden update-get-img" type="file"/>
            </label>

            <div class="p-3 bg-white mt-5 flex justify-between">
                <div class="w-[49%] flex flex-col gap-5">
                    <label class="flex flex-col">
                        <span>Enter product name</span>
                        <input value=${data.name} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product name"/>
                    </label>

                    <label class="flex flex-col">
                        <span>Enter product old price</span>
                        <input value=${data.oldPrice} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product old price"/>
                    </label>

                    <label class="flex flex-col">
                        <span>Enter product new price</span>
                        <input value=${data.newPrice} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product new price"/>
                    </label>
                </div>

                <div class="w-[49%] flex flex-col gap-5">
                    <label class="flex flex-col">
                        <span>Enter product quantity</span>
                        <input value=${data.quantity} class="p-2 border-[1px] border-black rounded-md" type="text" placeholder="Enter product quantity"/>
                    </label>

                    <label class="flex flex-col">
                        <span>Choose type</span>
                        <select class="p-2 border-[1px] border-black rounded-md update-type-select">
                            <option value="0">Каркасные</option>
                            <option value="1">Надувные</option>
                        </select>
                    </label>

                    <label class="flex flex-col">
                        <span>Choose status</span>
                        <select class="p-2 border-[1px] border-black rounded-md update-status-select">
                            <option value="0">Not</option>
                            <option value="1">Рекомендуем</option>
                            <option value="2">Cкидка</option>
                            <option value="3">Нет в наличии</option>
                        </select>
                    </label>
                </div>
            </div>
            <button class="bg-teal-500 p-2 font-bold text-white w-[200px] rounded-[20px] block mx-auto my-3">Добавить</button>
        </form>
    `

    let elUpdateForm = document.querySelector(".update-form")
    let elTypeSelect = document.querySelector(".update-type-select")
    let elStatusSelect = document.querySelector(".update-status-select")
    let elUpdateImgInput = document.querySelector(".update-get-img")
    let elUpdateImg = document.querySelector(".update-render-img")

    elTypeSelect.value = data.type
    elStatusSelect.value = data.status

    elUpdateImgInput.addEventListener("change", function(evt) {
        elUpdateImg.src = URL.createObjectURL(evt.target.files[0])
    })

    elUpdateForm.addEventListener("submit", function(evt) {
        evt.preventDefault()
        data.img = elUpdateImg.src
        data.name = evt.target[1].value
        data.oldPrice = evt.target[2].value
        data.newPrice = evt.target[3].value
        data.quantity = evt.target[4].value
        data.type = evt.target[5].value
        data.status = evt.target[6].value

        renderProducts(products, tBody, evt.target[5].value)

        elModalWrapper.classList.remove("open-modal")
        window.localStorage.setItem("products", JSON.stringify(products))

        if(evt.target[5].value == 0) {
            elItem1.classList.add("text-teal-500")
            elItem2.classList.remove("text-teal-500")
        }
        else {
            elItem2.classList.add("text-teal-500")
            elItem1.classList.remove("text-teal-500")
        }

    })
}
// Update part end ----------------------------------


// Delete part start --------------------------------
function deleteProduct(id) {
    const findObj = products.find(item => item.id == id)
    let finedIndex = products.findIndex(item => item.id == id)
    let deleteConfirm = confirm()
    if(deleteConfirm) {
        products.splice(finedIndex, 1)
        renderProducts(products, tBody, findObj.type)
        window.localStorage.setItem("products", JSON.stringify(products))
    }
    else {
        renderProducts(products, tBody, findObj.type)
    }
}
// Delete part end ----------------------------------


// Search part start --------------------------------
elSearchInput.addEventListener("keyup", function(evt) {
    let data = products.filter(item => item.name.toLowerCase().includes(evt.target.value.toLowerCase()))

    elSearchList.innerHTML = ""
    data.map(item => {
        let elListItem = document.createElement("li")
        elListItem.dataset.id = item.id
        elListItem.textContent = `${item.name} - ${item.newPrice}`
        elSearchList.appendChild(elListItem)

        elListItem.addEventListener("click", function(evt) {
            let clickedId = evt.target.dataset.id
            let dataClick = products.find(item => item.id == clickedId)
            elSearchInput.value = `${dataClick.name} - ${dataClick.newPrice}`

            let searchFilter = products.filter(item => item.id == clickedId)
            renderProducts(searchFilter, tBody, dataClick.type)

            if(dataClick.type == 0) {
                elSearchList.classList.add("open-list")
            }
            else {
                elSearchList.classList.remove("open-list")
                renderProducts(products, tBody, "0")
                elItem2.classList.add("text-teal-500")
                elItem1.classList.remove("text-teal-500")
            }
        })
    })

    if(evt.target.value) {
        elSearchList.classList.add("open-list")
    }
    else {
        elSearchList.classList.remove("open-list")
    }
})

elSearchInput.addEventListener("blur", function(evt) {
    elSearchList.classList.remove("open-list")
})
// Search part end ----------------------------------