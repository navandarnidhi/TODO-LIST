const loginPhone = document.getElementById("loginPhone");
const loginPassword = document.getElementById("loginPassword");
const submitBtn = document.getElementById("submitBtn");
const errorDisplay = document.querySelector(".error-container");

const phoneRegex = /^[6-9]\d{9}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (phoneRegex.test(loginPhone.value)) {
    if (passwordRegex.test(loginPassword.value)) {
      let users = JSON.parse(localStorage.getItem("users"));

      const user = users.find(
        (u) =>
          u.phone === loginPhone.value && u.password === loginPassword.value
      );

      if (user) {
        localStorage.setItem("loggedInUser", user.phone);
        window.location.href = "dashboard.html";
      } else {
        errorDisplay.style.display = "block";
        setTimeout(() => {
          errorDisplay.style.display = "none";
        }, 3000);
      }
    } else {
      alert("password is incorrect!");
    }
  } else {
    alert("Phone no not found!");
  }
});
