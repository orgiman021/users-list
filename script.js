//تابع برای نشان دادن اطلاعات(فعال کردن دکمه"نمایش اطلاعات")
function showusers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
      document.getElementById("usersTable").style.opacity = "1";
      const tbody = document.getElementById("tBody");
      tbody.innerHTML = "";
      data.forEach((user)=>{
        tbody.innerHTML+=`<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address.city} , ${user.address.street}</td>
        </tr>`
      })
    });
}

