const form = document.querySelector("#todoAddForm")
const todoGiriniz = document.querySelector("#todoName")
const todoEkle = document.querySelector("#todoAddButton")
const todoAra = document.querySelector("#todoSearch")
const removeAll = document.querySelector("#clearButton")
const todoList = document.querySelector(".list-group")
let todos = [""]

//-------------------------------------------------------
runEvents()
function runEvents() {
    form.addEventListener("submit", run)
    document.addEventListener("DOMContentLoaded", pageLoaded)
    removeAll.addEventListener("click", clearAllTodo)
    todoAra.addEventListener("keyup", filter)

}
//--------------------------------------------------------------------------------
function pageLoaded() {
    //storage'dan önyüze yazdırır
    checkTodosFromStorage()
    todos.forEach(function (todo) {
        addTodoToUi(todo)
    })
}
//--------------------------------------------------------------------------------
function run(e) {

    const inputText = todoGiriniz.value.trim(e)
    if (inputText == null || inputText == "") {
        //eğer boş girilmişse çalışır
        showAlert("warning", "Lütfen geçerli bir değer giriniz !")
    } else {
        //girilen text'i ekleme fonksiyonuna atar
        addTodoToUi(inputText)
        addTodoToStorage(inputText)
        showAlert("success", "Todo eklendi.")
    }
    e.preventDefault();
}
//--------------------------------------------------------------------------------
function addTodoToUi(newTodo) {
    //önyüze ekleme
    const li = document.createElement("li");
    li.href = "#"
    li.className = "list-group-item d-flex justify-content-between"
    li.innerHTML = newTodo
    //--------------------------------------------------------------------------------
    const a = document.createElement("a")
    a.href = "#"
    a.className = "delete-item"
    //--------------------------------------------------------------------------------
    //çarpı butonu
    const i = document.createElement("i")
    i.href = "#"
    i.className = "fa fa-remove"
    //--------------------------------------------------------------------------------
    //iç içe ekle
    a.appendChild(i)
    li.appendChild(a)
    todoList.appendChild(li)

    todoGiriniz.value = "";
    //--------------------------------------------------------------------------------
    i.addEventListener("click", clearToUI)
    //--------------------------------------------------------------------------------
    function clearToUI() {
        //onaylama bildirimi
        const sor = confirm('Bu Todoyu Silmek İstediğinize Emin misiniz?')
        if (sor == true) {
            todoList.removeChild(li)
            showAlert("success", "Todo silindi.")
            //Storeage'dan sil metodunu çalıştır ve içine text'i ver
            clearToStorage(newTodo)

        } else {
            showAlert("warning", "Silme işlemi iptal edildi !")
        }
    }
    //--------------------------------------------------------------------------------

}
//--------------------------------------------------------------------------------
function clearToStorage(a) {
    //Storage'dan tekli silme
    checkTodosFromStorage()
    todos.forEach(function (todo, index) {
        if (todo === a) {
            todos.splice(index, 1)
        }
    })
    //temizlenmiş array'i tekrar storage'a aktar
    localStorage.setItem("todos", JSON.stringify(todos))
}
//--------------------------------------------------------------------------------
function addTodoToStorage(newTodo) {
    //localStorage ekleme
    checkTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
}
//--------------------------------------------------------------------------------
function checkTodosFromStorage() {
    //boş dolu kontrolu
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))

    }
}
//--------------------------------------------------------------------------------
function showAlert(type, message) {
    //bilgilendirme mesajı
    const div = document.createElement("div")
    div.className = "alert alert-" + type
    div.textContent = message
    form.appendChild(div)
    setTimeout(function () {
        div.remove()
    }, 2500);
}
//--------------------------------------------------------------------------------
function clearAllTodo() {
    //Storage'dan silme
    todos = []
    localStorage.setItem("todos", JSON.stringify(todos))
    //önyüzden silme
    const list = document.querySelectorAll(".list-group-item")
    const sor = confirm('Tüm Todoları Silmek İstediğinize Emin misiniz?')
    if (sor == true) {
        if (list.length > 0) {
            list.forEach(function (todo) {
                todo.remove()
                showAlert("success", "Başarılı bir şekilde temizlendi.")
            })
        } else {
            showAlert("warning", "Temizlemek için en az bir todo olmalıdır !")
        }
    }
}
function filter(e) {
    const filtre = e.target.value.toLowerCase().trim()
    const todolistesi = document.querySelectorAll(".list-group-item")
    if (todolistesi.length > 0) {
        todolistesi.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filtre)) {
                todo.setAttribute("style","display : block")
            }else{
                todo.setAttribute("style","display : none !important")
            }

        })
    } else {
        showAlert("warning", "Filtrelemek için en az bir todo olmalı !")
    }
}