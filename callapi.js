// function printForm(event) {
//   event.preventDefault();
//   for (ele of event.target) {
//     if (ele.type != "submit") {
//       console.log(ele.id + " is " + ele.value);
//     }
//   }
// }

// let btn = document.querySelector(".btn");
// btn.addEventListener("mouseover", () => (btn.style.backgroundColor = "red"));

// document.querySelector(".btn").addEventListener("mouseout", function () {
//   this.style.backgroundColor = "green";
// });
var itemList = document.getElementById("users");
itemList.addEventListener("click", removeItem);

function saveData(event) {
  event.preventDefault();

  const appointment = {
    name: event.target.name.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
    time: event.target.time.value,
    date: event.target.date.value,
  };

  axios
    .post(
      "https://jsonplaceholder.typicode.com/users",
      appointment
    )
    .then((res) => {
      console.log(res);
      alert("User Added successfully.");
    })
    .catch((err) => alert(err));
}

function getData() {
  const users = document.getElementById("users");

  axios
    .get("https://jsonplaceholder.typicode.com/users?_limit=5")
    .then((res) => {
      let data = "";
      for (let obj of res.data) {
        data += `<div class="card" style="margin: 0% 30%">
          <div class="card-body">
            ${obj.name} <button id="${obj.id}" class="btn edit badge rounded-pill text-bg-success">Edit</button>
<button id="${obj.id}" class="btn delete badge rounded-pill text-bg-danger">Delete</button>
          </div>
        </div>`;
      }
      users.innerHTML = data;
    })
    .catch((err) => {
      console.log(err);
      users.innerHTML = `<div class="card" style="margin: 0% 30%">
  <div class="card-body">
    ${err.message} | ${err.code}
  </div>
</div>`;
    });
}
//calling existing data if any
getData();

function removeItem(event) {
  //delete expense
  if (event.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      let delete_id = event.target.id;
      axios
        .delete("https://jsonplaceholder.typicode.com/users/" + delete_id)
        .then((res) => {
          let parentDiv = event.target.parentElement.parentElement;
          itemList.removeChild(parentDiv);
          alert("User Deleted Successfully");
        })
        .catch((err) => alert(`Error: ${err.message} occurred.`));
    }
  }
  //edit expense
  if (event.target.classList.contains("edit")) {
    var li = event.target.parentElement.parentElement;
    var delete_value = event.target.parentElement.innerHTML.split("<")[0];

    itemList.removeChild(li);

    axios
    .get("https://jsonplaceholder.typicode.com/users?_limit=5")
    .then((res) => {
      document.getElementById("name").value = res.data[0].name;
    document.getElementById("email").value = res.data[1].email;
    document.getElementById("phone").value = res.data[2].phone;
    document.getElementById("time").value = res.data[3];
    document.getElementById("date").value = res.data[4];
    })
    .catch((err) => alert(err));

    
    
  }
}

// const btn1 = document.querySelector(".btn");
// btn1.addEventListener("mouseout", (event) => {
//   event.preventDefault();
//   btn1.style.color = "pink";
// });
