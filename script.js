const tbody = document.getElementById("tBody");
//تابع برای نشان دادن اطلاعات(فعال کردن دکمه"نمایش اطلاعات")
function showusers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("usersTable").style.opacity = "1";
      tbody.innerHTML = "";
      data.forEach((user) => {
        tbody.innerHTML += `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.address.city} , ${user.address.street}</td>
            <td><button class="delete">حذف</button></td>
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
                <td><button class="delete">حذف</button></td>
                </tr>`;
      });
  }
}
