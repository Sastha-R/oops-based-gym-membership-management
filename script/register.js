// import bcrypt from "https://cdn.jsdelivr.net/npm/bcryptjs@3.0.2/+esm";

// $(function () {
//   //  REGISTRATION FORM SUBMISSION
//   $("#registerForm").on("submit", async function (event) {
//     event.preventDefault();
//  // Get form reference
//     const form = this;

//     const name = $("#registerName").val().trim();
//     const email = $("#registerEmail").val().trim().toLowerCase();
//     const phone = $("#registerPhone").val().trim();
//     const password = $("#registerPassword").val().trim();
//     const confirmPassword = $("#confirmPassword").val().trim();
//     let isValid = true;

//     $(".is-invalid", form).removeClass("is-invalid");

//     function mark(selector, message) {
//       $(selector).addClass("is-invalid").siblings(".invalid-feedback").text(message);
//       isValid = false;
//     }
//   //  FORM VALIDATION
//     if (!name)
//        mark("#registerName", "Name is required");

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
//       mark("#registerEmail", "Enter a valid email");

//     if (!/^\d{10}$/.test(phone))
//        mark("#registerPhone", "Phone must contain exactly 10 digits");

//     if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password))
//     mark("#registerPassword", "Password must be at least 6 characters");

//     if (confirmPassword !== password)
//       mark("#registerPassword", "Password must be at least 6 characters with 1 uppercase letter and 1 number");

//     if (!isValid)
//        return;

//     try {
//       const existingUsers = await api.get(`users?email=${encodeURIComponent(email)}`);
//       if (existingUsers.length) {
//         mark("#registerEmail", "Email already exists");
//         return;
//       }
// // Create a new customer account
//       // await api.post("users", {
//       //   name,
//       //   email,
//       //   phone,
//       //   password,
//       //   role: "customer",
//       //   createdAt: new Date().toISOString()
//       // });

//       const hashedPassword = await bcrypt.hash(password, 10);

// await api.post("users", {
//     name,
//     email,
//     phone,
//     password: hashedPassword,
//     role: "customer",
//     createdAt: new Date().toISOString()
// });

//       await Swal.fire("Registration successful", "You can now login as a customer.", "success");
//       bootstrap.Modal.getInstance(document.getElementById("registerModal")).hide();
//       form.reset();
//       //  ERROR HANDLING
//     } catch (error) {
//       Swal.fire("Registration failed", error.message, "error");
//     }
//   });
// });


import bcrypt from "https://cdn.jsdelivr.net/npm/bcryptjs@3.0.2/+esm";

$(function () {

    $("#registerForm").validate({

        errorClass: "is-invalid",
        validClass: "is-valid",
        errorPlacement: function (error, element) {
        error.appendTo(element.siblings(".invalid-feedback"));
    },

        rules: {

            registerName: {
                required: true
            },

            registerEmail: {
                required: true,
                email: true
            },

            registerPhone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10,
                pattern:/^\d{10}$/
            },

            registerPassword: {
                required: true,
                minlength: 6,
                pattern: /^(?=.*[A-Z])(?=.*\d).{6,}$/
            },

            confirmPassword: {
                required: true,
                equalTo: "#registerPassword"
            }
        },

        messages: {

            registerName: {
                required: "Name is required"
            },

            registerEmail: {
                required: "Email is required",
                email: "Enter a valid email"
            },

            registerPhone: {
                required: "Phone is required",
                digits: "Phone must contain only digits",
                minlength: "Phone must contain exactly 10 digits",
                maxlength: "Phone must contain exactly 10 digits",
                pattern:"Phone must contain exactly 10 digits"
            },

            registerPassword: {
                required: "Password is required",
                minlength: "Password must be at least 6 characters",
                pattern: "Password must contain 1 uppercase letter and 1 number"
            },

            confirmPassword: {
                required: "Please confirm your password",
                equalTo: "Passwords do not match"
            }
        },

        submitHandler: async function (form) {

            const name = $("#registerName").val().trim();
            const email = $("#registerEmail").val().trim().toLowerCase();
            const phone = $("#registerPhone").val().trim();
            const password = $("#registerPassword").val().trim();

            try {

                // CHECK IF EMAIL ALREADY EXISTS

                const existingUsers = await api.get(
                    `users?email=${encodeURIComponent(email)}`
                );

                if (existingUsers.length) {

                    $("#registerEmail").addClass("is-invalid").siblings(".invalid-feedback").text("Email already exists");
                    return;
                }

                // HASH PASSWORD

                const hashedPassword = await bcrypt.hash(password, 10);

                // CREATE CUSTOMER ACCOUNT

                await api.post("users", {
                    name,
                    email,
                    phone,
                    password: hashedPassword,
                    role: "customer",
                    createdAt: new Date().toISOString()
                });

                // SUCCESS MESSAGE

                await Swal.fire(
                    "Registration successful",
                    "You can now login as a customer.",
                    "success"
                );

                // CLOSE MODAL

                bootstrap.Modal.getInstance(document.getElementById("registerModal")).hide();

                // RESET FORM

                form.reset();

            } catch (error) {

                Swal.fire(
                    "Registration failed",
                    error.message,
                    "error"
                );
            }
        }
    });

}); 