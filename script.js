const tbody = document.getElementById("tBody");
//تابع برای نشان دادن اطلاعات(فعال کردن دکمه"نمایش اطلاعات")
function showusers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("usersTable").style.opacity = "1";
      tbody.innerHTML = "";
      data.forEach((user) => {
        tbody.innerHTML += `<tr id="user-${user.id}">
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.address.city} , ${user.address.street}</td>
          
            <td><div class="btns"><button class="delete" onclick="deleteUser(id)">حذف</button>
            <button class="edit" onclick="editUser('${user.id}','${user.name}','${user.email}')">ویرایش</button>
            </div>
            </td>
            </tr>`;
      });
    });
}
// دکمه افزودن کاربر
function addusers() {
  // شرط برای قانونمند کردن افزودن کاربر
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  if (!name || !email || !phone) {
    alert("لطفا همه موارد را تکمیل نمایید");
  } else {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({ name: name, email: email, phone: phone }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((user) => {
        alert(
          "کاربر با موقیت اضافه شد (به سبب فیک بودن API پس از رفرش باقی نمیماند)",
        );
        tbody.innerHTML += `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>---</td>
                  <td><div class="btns"><button class="delete">حذف</button>
            <button class="edit">ویرایش</button>
            </div>
            </td>
                </tr>`;
      });
  }
}
// فعال کردن دکمه حذف
function deleteUser(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "DELETE",
  }).then(() => {
    alert("باموفقیت در ظاهر پاک شد {api فیک میباشد}");
    showusers();
  });
}
function editUser(id, oldName, oldEmail) {
  const newName = prompt("نام جدید را وارد کنید", oldName);
  const newEmail = prompt("ایمیل جدید را وارد کنید", oldEmail);
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name: newName, email: newEmail }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  .then(res=>res.json())
  .then(updated=>{
    console.log(updated); 
    alert("ویرایش انجام شد");
    
    const row = document.getElementById(`user-${id}`)
    row.children[1].textContent = updated.name;
    row.children[3].textContent = updated.email;
  }
);
}
