let rmBtn = document.querySelector(".rm-btn");
let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let textArea = document.querySelector(".textarea-cont");
let mainCont = document.querySelector(".main-cont");
let allPriorityColour = document.querySelectorAll(".priorit-color");
let ticketCont = document.querySelector(".ticket-cont");
let addModal = true;
let taskColor = "r";
let deleteMode = false;
let colorArr = ['r','y','g'];
let allFilterColor = document.querySelectorAll('.color');
for(let i=0;i<allFilterColor.length;i++){
    allFilterColor[i].addEventListener('click',function(){
        // console.log(allFilterColor[i]);
        let currentSelectedFilter = allFilterColor[i].classList[1];
        console.log(currentSelectedFilter);
        let allTicketsColor = document.querySelectorAll('.ticket-color');
        // console.log(allTicketsColor);
        for(let j=0;j<allTicketsColor.length;j++){
            let colorOfTicket = allTicketsColor[j].classList[1];
            console.log(colorOfTicket);
            if(colorOfTicket == currentSelectedFilter){
                //show it
                allTicketsColor[j].parentElement.style.display = 'block';
            }else{
                //hide it
                allTicketsColor[j].parentElement.style.display = 'none';
            }
        }
    })

    allFilterColor[i].addEventListener('dblclick',function(){
        let allTicketsColor = document.querySelectorAll('.ticket-color');
        for(let j=0;j<allTicketsColor.length;j++){
            allTicketsColor[j].parentElement.style.display = 'block';
        }
    })
}


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
    <div class="ticket-area">${task}</div>
    <div class="lock-unlock"><i class="fa-solid fa-lock"></i></div>`;
  console.log(ticketCont);
  mainCont.appendChild(ticketCont);

      //handle priority color
      let ticketColor = ticketCont.querySelector('.ticket-color');
      ticketColor.addEventListener('click',function(){
          // console.log("priority Color is clicked")
          // console.log(ticketColor);
          let currentColor = ticketColor.classList[1];
          console.log(currentColor);
          ticketColor.classList.remove(currentColor);
          let currentColorIndex;
          for(let i=0;i<colorArr.length;i++){
              if(colorArr[i] == currentColor){
                  currentColorIndex = i;
                  break;
              }
          }
          let nextColorIndex = (currentColorIndex+1)%colorArr.length;
          let nextColor = colorArr[nextColorIndex];
          console.log(nextColor);
          ticketColor.classList.add(nextColor)
      })

  //handle lock unlock
let taskArea = document.querySelector(".ticket-area");
let lockUnlockBtn = document.querySelector(".lock-unlock i");
lockUnlockBtn.addEventListener('click', function () {
  if (lockUnlockBtn.classList.contains("fa-lock")) {
    console.log("Lock");
    lockUnlockBtn.classList.remove("fa-lock");
    lockUnlockBtn.classList.add("fa-unlock");
    taskArea.setAttribute("contentEditable", "true");
  } else {
    lockUnlockBtn.classList.remove("fa-unlock");
    lockUnlockBtn.classList.add("fa-lock");
    taskArea.setAttribute("contentEditable", "false");
  }
});
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
      if (e.target.classList.contains("ticket-color")) {
        e.target.parentNode.remove();
      }
      if (e.target.classList.contains("ticket-id")) {
        e.target.parentNode.remove();
      }
      if (e.target.classList.contains("ticket-area")) {
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


