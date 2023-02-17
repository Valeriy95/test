const todoInput = document.querySelector(".todo-input input");
const btnPenComp = document.querySelectorAll(".btn-pen-comp span");
const list = document.querySelector(".list-container");
const clearBtn = document.querySelector(".btn-clear");
const progressBtn = document.querySelector(".progress-btn");
const doneBtn = document.querySelector(".done-btn");

let editNumber;
let isEditedInput = false;
let todoListArr = JSON.parse(localStorage.getItem("todoList"));

progressBtn.addEventListener("click", () => {
   progressBtn.classList.add("active");
   doneBtn.classList.remove("active");
   showList("progress");
});

doneBtn.addEventListener("click", () => {
   doneBtn.classList.add("active");
   progressBtn.classList.remove("active");
   showList("done");
});

function showList(btn) {
   let li = "";
   if(todoListArr) {
      todoListArr.forEach((value, index) => {
         let isDone = value.status == "done" ? "checked" : "";
         if(btn == value.status) {
            li += `<li class="item ">
                     <label for="${index}">
                        <input onclick="status(this)" type="checkbox" id="${index}" ${isDone}>
                        <p class="${isDone}">${value.name}</p>
                     </label>
                     <div class="settings-todo">
                        <p onclick="showMenu(this)">...</p>
                        <ul class="item-menu">
                           <li onclick="editInput(${index}, '${value.name}')">Edit</li>
                           <li onclick="deleteInput(${index})">Delete</li>
                        </ul>
                     </div>
                  </li>`;
         }
      });
   }
   list.innerHTML = li || `<span>No todos yet</span>`;
}
showList("progress");

function showMenu(selected) {
   let containerMenu = selected.parentElement.lastElementChild;
   containerMenu.classList.add("show");
   document.addEventListener("click", e => {
      if(e.target.tagName != "P" || e.target != selected) {
         containerMenu.classList.remove("show");
      }
   })
}

function editInput(taskNumber, valueName) {
   editNumber = taskNumber;
   isEditedInput = true;
   todoInput.value = valueName;
}

function deleteInput(deleteNumber) {
   todoListArr.splice(deleteNumber, 1);
   localStorage.setItem("todoList", JSON.stringify(todoListArr));
   showList("progress");
} 

clearBtn.addEventListener("click", () => {
   todoListArr.splice(0, todoListArr.length);
   localStorage.setItem("todoList", JSON.stringify(todoListArr));
   showList("progress");
});

function status(selected) {
   let blocName = selected.parentElement.lastElementChild;
   if(selected.checked) {
      blocName.classList.add("checked");
      todoListArr[selected.id].status = "done";
   } else {
      blocName.classList.remove("checked");
      todoListArr[selected.id].status = "progress";
   }
   localStorage.setItem("todoList", JSON.stringify(todoListArr)); 
};

todoInput.addEventListener("keyup", e => {
   let userInput = todoInput.value.trim();
   if(e.key == "Enter" && userInput) {
      if(!isEditedInput) {
         if (!todoListArr) {
            todoListArr = [];
         }
         let userInfo = {name: userInput, status: "progress"};
         todoListArr.push(userInfo);
      } else {
         isEditedInput = false;
         todoListArr[editNumber].name = userInput;
      }
      todoInput.value = "";
      localStorage.setItem("todoList", JSON.stringify(todoListArr));
      progressBtn.classList.add("active");
      doneBtn.classList.remove("active");
      showList("progress");
   }
});
