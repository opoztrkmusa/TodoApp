const form = document.querySelector("#form");
const input = document.querySelector("#input");
const todoList = document.querySelector("#todoList");
const searchInput = document.querySelector("#searchInput");
const clearBtn= document.querySelector("#clearBtn");
const todoAddForm = document.querySelector("#todoAddForm");
const inputDiv = document.querySelector("#inputDiv");



document.addEventListener("DOMContentLoaded",() => {
    setTimeout(() => {
        todoAddForm.classList.remove("opacity-0");
    },500)

    setTimeout(() => {
        inputDiv.classList.remove("opacity-0");
    },800)

    setTimeout(() => {
        clearBtn.classList.remove("opacity-0");
    },1000)
    setTimeout(() => {
        todoList.classList.remove("opacity-0");
    },1200)
});
let todos = [];

form.addEventListener("submit",run);
document.addEventListener("DOMContentLoaded",loaded);

function loaded(e) {
    const todolar = JSON.parse(localStorage.getItem("todos"));
    if (todolar !== null) {
        todolar.forEach((todo) => {
            todoToUI(todo);    
        });
    }
    e.preventDefault();
}

function run(e) {
    const textInput = input.value.trim();
    
    if(textInput !== "") {
    
        if (textInput.length > 25) {
            showAlert("#ff0000", "Max karakter sınırını aştınız [25]","#F0F0F0");
        } else {
            todoToUI(textInput);
            todoToStorage(textInput);
            showAlert("#00FF00", "Başarıyla Eklendi","#F0F0F0");

            form.querySelector('button[type="submit"]').disabled = true;
            setTimeout(() => {
                form.querySelector('button[type="submit"]').disabled = false;
            }, 2000);
        }
    } else {
        showAlert("#ff0000", "Boş bırakmayınız","#F0F0F0");
    }

    e.preventDefault();
}


function todoToUI(newTodo) {
    // todo eklenirken todos dizisine de ekleyin
    todos.push(newTodo);
    const checkI = document.createElement("i");
    checkI.className = "fa-solid fa-check cursor-pointer px-2 py-2 hover:bg-green-500 hover:text-green-900 transition-all duration-500";

    const li = document.createElement("li");
    li.className = "flex justify-between items-center gap-x-2";
    
    const span = document.createElement("span");
    span.textContent = newTodo;
    span.style.textTransform = "Capitalize";

    li.appendChild(span);

    const a = document.createElement("a");
    a.className = "flex gap-x-3 items-center"

    const i = document.createElement("i");
    i.className= "fa-solid fa-x cursor-pointer px-2 py-2 hover:bg-red-500 hover:text-red-900 transition-all duration-500";

a.appendChild(checkI)
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);    

    input.value = "";


    i.addEventListener("click",() => {
        showAlert("#ff0000","Başarıyla silindi","#F0F0F0");
        li.remove();        
        // Silinecek todo'nun index'ini bulun
        const index = todos.indexOf(newTodo);
        if (index !== -1) {
            // Eğer bulunduysa, todos dizisinden ve localStorage'dan silin
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos)); // localStorage'dan sil
        }
    });

    checkI.addEventListener("click",() => {
        span.style.textDecoration = "line-through";
    })

    clearBtn.addEventListener("click",clear);
}


function todoToStorage(newTodo) {
    checkFromstorage();
    todos.push(newTodo); // Yeni görevi todos dizisine ekleyin
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkFromstorage() {
    if(localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    else {
        todos = [];
    }
}
const div = document.getElementById("alert");

function showAlert(type, message,background) {
    div.style.color = type;
    div.innerText = message;
    div.style.backgroundColor = background;

    // Sadece varolan bir öğeyi güncelleyin, yeni bir sınıf eklemeye gerek yok
    div.classList.add("top-12");
    div.style.opacity = 1; // Opaklığı değiştirin

    setTimeout(() => {
        div.classList.remove("top-12");
        div.style.opacity = 0; // Opaklığı değiştirin
    }, 2000);
}


searchInput.addEventListener("keyup",(e) => {
    const text = e.target.value.toLowerCase();

    filterInput = todoList.querySelectorAll("li");
    filterInput.forEach((todo) => {
        
        if(todo.textContent.toLowerCase().includes(text)) {
            todo.className = "transition-all duration-500 flex justify-between items-center gap-x-2";
        }
        else {
            todo.className= "transition-all duration-500 hidden";
        }

    })

})

function clear() {
    const todoItems = todoList.querySelectorAll("li"); // Tüm todo öğelerini al

    if(todoItems.length > 0) { // Liste içeriğini kontrol et
        todoList.innerHTML ="";
        localStorage.clear();
        showAlert("00FFF0","Tüm todolar silindi","#F0F0F0");
        
    }
    else {
        showAlert("#ff0000","En az bir todo olmalıdır","#F0F0F0");
    }  
}
