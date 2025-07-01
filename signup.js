const signupName = document.getElementById("signupName");
const signupPhone = document.getElementById("signupPhone");
const signupPassword = document.getElementById("signupPassword");
const submitBtn = document.getElementById("submitBtn");

const nameRegex = /^[A-Za-z\s]{3,}$/;
const phoneRegex = /^[6-9]\d{9}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const users = JSON.parse(localStorage.getItem("users")) || [];

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (nameRegex.test(signupName.value)) {
    if (phoneRegex.test(signupPhone.value)) {
      if (passwordRegex.test(signupPassword.value)) {
        const exists = users.some((u) => u.phone === signupPhone.value);
        if (exists) {
          alert("User already exists with this phone number.");
          return;
        }

        const newUser = {};
        newUser.name = signupName.value;
        newUser.phone = signupPhone.value;
        newUser.password = signupPassword.value;
        newUser.todos = [];

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        console.log(users);

        window.location.href = "index.html";
      }
      else{
      alert("Enter valid password");
      }
    }
    else{
      alert("Enter valid phone");
    }
  }
  else{
      alert("Enter valid name");
  }
});
