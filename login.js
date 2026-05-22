function loginUser() {

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value.trim();

  if (!email || !password) {

    alert("⚠️ Fill all fields");
    return;

  }

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(item =>
    item.email === email &&
    item.password === password
  );

  if (!user) {

    alert("❌ Invalid Email or Password");
    return;

  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("✅ Login Successful");

  window.location.href = "index.html";

}