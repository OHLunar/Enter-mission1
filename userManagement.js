const serverUrl = "http://localhost:3000";

document.getElementById("addUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  const response = await fetch(`${serverUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age }),
  });

  if (response.ok) {
    alert("User added successfully!");
    document.getElementById("addUserForm").reset();
  } else {
    alert("Error adding user!");
  }
});

document.getElementById("getUsers").addEventListener("click", async () => {
  const response = await fetch(`${serverUrl}/users`);
  const users = await response.json();

  const userList = document.getElementById("userList");
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `ID: ${user.id}, Name: ${user.name}, Age: ${user.age}`;
    userList.appendChild(li);
  });
});

document.getElementById("deleteUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = document.getElementById("userId").value;

  const response = await fetch(`${serverUrl}/users/${userId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("User deleted successfully!");
    document.getElementById("deleteUserForm").reset();
  } else {
    alert("Error deleting user!");
  }
});