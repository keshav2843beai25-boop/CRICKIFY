function signupUser() {

  const name =
    document.getElementById("signupName").value.trim();

  const email =
    document.getElementById("signupEmail").value.trim();

  const password =
    document.getElementById("signupPassword").value.trim();

  if (!name || !email || !password) {

    alert("⚠️ Fill all fields");
    return;

  }

  let users =
    JSON.parse(localStorage.getItem("users")) || [];

  const alreadyExists = users.find(
    user => user.email === email
  );

  if (alreadyExists) {

    alert("⚠️ Email already registered");
    return;

  }

  const newUser = {
    name,
    email,
    password
  };

  users.push(newUser);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  alert("✅ Account Created Successfully");

  window.location.href = "login.html";

}