function clk(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var time = document.getElementById('date').value+" "+document.getElementById('time').value;

    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(time);


    if (name.length > 0 && email.length > 0 && phone.length > 0 && time.length>0) {
        var object = {
          "name" : name,
          "email" : email,
          "phone" : phone, 
          "time" : time
        };
      }

      console.log(object);

      axios({
        method: 'post',
        url : 'https://crudcrud.com/api/e6d6ba7facd44a059965a0f56ee9f533/appointment',
        data : object
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
}
function getData() {
  const users = document.getElementById("users");

  axios
    .get(
      "https://crudcrud.com/api/e6d6ba7facd44a059965a0f56ee9f533/appointment"
    )
    .then((res) => {
      let data = "";
      for (let obj of res.data) {
        data += `<div class="card" style="margin: 0% 30%">
          <div class="card-body">
            ${obj.name}
          </div>
        </div>`;
      }
      users.innerHTML = data;
    })
    .catch((err) => {
      console.log(err);
      users.innerHTML = `<div class="card" style="margin: 0% 30%">
  <div class="card-body">
    ${err.response}
  </div>
</div>`;
    });
}

getData();