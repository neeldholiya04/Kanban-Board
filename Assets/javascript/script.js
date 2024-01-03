let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let textArea = document.querySelector(".textarea-cont");
let mainCont = document.querySelector(".main-cont");
let allPriorityColour = document.querySelectorAll(".priorit-color");
let rmBtn = document.querySelector(".rm-btn");
let ticketCont = document.querySelector(".ticket-cont");
let addModal = true;
let taskColor = "r";
let deleteMode = false;

addBtn.addEventListener("click", function () {
  if (addModal) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
  addModal = !addModal;
});

textArea.addEventListener("keydown", function (e) {
  // console.log(e);
  let key = e.key;
  if (key === "Enter") {
    // console.log("Generate Ticket");
    // console.log(textArea.value);
    if (textArea.value == "") {
      textArea.value = "";
      alert("Please Enter Some Task!");
      return;
    }
    generateTicket(textArea.value);
    textArea.value = "";
    modal.style.display = "none";
    addModal = true;
  }
});
for (let i = 0; i < allPriorityColour.length; i++) {
  allPriorityColour[i].addEventListener("click", function (t) {
    for (let j = 0; j < allPriorityColour.length; j++) {
      allPriorityColour[j].classList.remove("active");
    }
    allPriorityColour[i].classList.add("active");
    taskColor = allPriorityColour[i].classList[1];
    console.log(taskColor);
  });
}

var uid = new ShortUniqueId();


function generateTicket(task) {
  // <div class="ticket-cont">
  //     <div class="ticket-color r"></div>
  //     <div class="ticket-id">#eidut1</div>
  //     <div class="ticket-area">Some ticket</div>
  //   </div>
  let id = uid.rnd();
  let ticketCont = document.createElement("div");
  ticketCont.className = "ticket-cont";
  ticketCont.innerHTML = `<div class="ticket-color ${taskColor}"></div>
    <div class="ticket-id">${id}</div>
    <div class="ticket-area">${task}</div>`;
  console.log(ticketCont);
  mainCont.appendChild(ticketCont);
}

// delete task
rmBtn.addEventListener("click", function () {
  deleteMode = !deleteMode;
  console.log(deleteMode);

// Delete Functionality added to the tickets
  mainCont.addEventListener("click", function (e) {
    if (deleteMode) {
      console.log("Delete Mode On");
      console.log(e);
      if (e.target.classList.contains("ticket-cont")) {
        e.target.remove();
      }
      if(e.target.classList.contains("ticket-color")){
        e.target.parentNode.remove();
      }
      if(e.target.classList.contains("ticket-id")){
        e.target.parentNode.remove();
      }
      if(e.target.classList.contains("ticket-area")){
        e.target.parentNode.remove();
      }
    }
  });

});

// change colour of rmBtn when delete mode is on
rmBtn.addEventListener("click", function () {
  if (deleteMode) {
    console.log("Delete Mode Red");
    rmBtn.style.color = "red";
  } else {
    rmBtn.style.color = "initial";
  }
});

