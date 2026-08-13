
class AuthService {

    // Get currently logged-in user
    getLoggedInUser() {
        const user = localStorage.getItem("loggedInUser");

        return user ? JSON.parse(user) : null;
    }

    // Check user role before allowing page access
    requireRole(role) {
        const user = this.getLoggedInUser();

        if (!user || user.role !== role) {
            window.location.href = "index.html";
            return null;
        }

        return user;
    }

    // Confirm and perform logout
    async confirmLogout() {
        const result = await Swal.fire({
            title: "Logout?",
            text: "Are you sure want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Logout"
        });

        if (result.isConfirmed) {
            localStorage.removeItem("loggedInUser");

            await Swal.fire(
                "Logged out",
                "See you next time.",
                "success"
            );

            window.location.href = "index.html";
        }
    }

    // Setup logout button
    setupLogout() {
        const logoutBtn = document.getElementById("logoutBtn");

        if (logoutBtn) {
            logoutBtn.addEventListener(
                "click",
                () => this.confirmLogout()
            );
        }
    }
}

const auth = new AuthService();

