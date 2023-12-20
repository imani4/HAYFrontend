// Unique Id that will be assigned to new user
let uniqueUserId = JSON.parse(localStorage.getItem("uniqueUserCounter"));
if (uniqueUserId == null) uniqueUserId = 1010;

// Function invoked on User Sign Up


function signUp() {
    // Fetch user input
    const fName = document.querySelector("#fName").value;
    const lName = document.querySelector("#lName").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Basic validation
    if (!fName || !lName || !email || !password) {
        alert("All fields are required");
        return;
    }

    // Additional validation (you can customize this based on your requirements)
    if (fName.length < 4 || fName.length > 30) {
        alert("Name should be between 4 and 30 characters");
        return;
    }
    // Password validation
    if (password.length < 6) {
        alert("Password should be at least 6 characters");
        return;
    }

    // You can add similar validations for other fields

    // If all validations pass, make the API call
    const userData = {
        userFName: fName,
        userLName: lName,
        userEmail: email,
        userPass: password,
    };
    fetch('https://hay-backend-red.vercel.app/api/v1/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.success) {
                alert("Account Created");
                localStorage.setItem("loggedDetails", JSON.stringify([{ isLogged: true }, userData]))
                let pageFrom = JSON.parse(localStorage.getItem("userComingfrom"));
                if (pageFrom == "projectDetailsPage") {
                    setTimeout(() => {
                        window.location.href = "./investment_user_details.html";
                    }, 1500);
                } else {
                    setTimeout(() => {
                        window.location.href = "./../index.html";
                    }, 1500);
                }
                localStorage.removeItem("userComingfrom");
            } else {

                // Check for specific error messages from the server
                if (data.message === 'Duplicate email Entered') {
                    alert("Duplicate email Entered");

                } else {
                    alert("error try again");

                }
            }

        })
        .catch((error) => {
            console.error('Error:', error);
            alert("something wrong");
        });
}


function userExists(newUserEmail) {
    let allUsers = JSON.parse(localStorage.getItem("allUsers"));
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].userEmail == newUserEmail) return true;
    }
    return false;
}

let userIdforLogin = null;
let loginButton = document.querySelector("#login-btn-id");
// Function Invoked on User Login
function logIn() {
    let mailEntered = document.querySelector("#email").value;
    let passEntered = document.querySelector("#password").value;

    if (true) {
        var userData = {
            email: mailEntered,
            password: passEntered,
        };

        fetch('https://hay-backend-red.vercel.app/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.success) {
                    const userData = {
                        userFName: data.user.name,
                        userLName: data.user.lName,
                        userEmail: data.email,
                        userPass: data.password,
                    };
                    alert("login successfully");
                    localStorage.setItem("loggedDetails", JSON.stringify([{ isLogged: true }, userData]))
                    let pageFrom = JSON.parse(localStorage.getItem("userComingfrom"));
                    if (pageFrom == "projectDetailsPage") {
                        setTimeout(() => {
                            window.location.href = "./investment_user_details.html";
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            window.location.href = "./../index.html";
                        }, 1500);
                    }
                    localStorage.removeItem("userComingfrom");
                } else {

                    // Check for specific error messages from the server
                    if (data.message === 'Duplicate email Entered') {
                        alert("Duplicate email Entered");

                    } else {
                        alert("error try again");

                    }
                }

            })
            .catch((error) => {
                console.error('Error:', error);
                alert("something wrong");
            });

    } else {
        loginButton.textContent = "Invalid Credentials...";
        setTimeout(() => {
            loginButton.textContent = "Login";
        }, 1000)
    }
}



