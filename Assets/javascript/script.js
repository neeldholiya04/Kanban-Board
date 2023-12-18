let addBtn = document.querySelector(".add-btn");
let modal = document.querySelector(".modal-cont");
let textArea = document.querySelector(".textarea-cont");
let mainCont = document.querySelector(".main-cont");
let addModal = true;

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
    generateTicket();
    textArea.value = "";
    modal.style.display = "none";
    addModal = true;
  }
});

function generateTicket() {
  // <div class="ticket-cont">
  //     <div class="ticket-color r"></div>
  //     <div class="ticket-id">#eidut1</div>
  //     <div class="ticket-area">Some ticket</div>
  //   </div>
  let ticketCont = document.createElement("div");
  ticketCont.className = "ticket-cont";
  ticketCont.innerHTML =
    '<div class="ticket-color r"></div><div class="ticket-id">#eidut1</div><div class="ticket-area">Some ticket</div>';
    console.log(ticketCont);
    mainCont.appendChild(ticketCont);
}
