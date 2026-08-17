const API_URL = "http://localhost:3000";

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
    this.role = data.role;
    this.createdAt = data.createdAt;
  }

  isCustomer() {
    return this.role === "customer";
  }

  isOwner() {
    return this.role === "owner";
  }

  static async getAll() {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error("Unable to load users");
    }

    const users = await response.json();
    return users.map(user => new User(user));
  }

  static async getByEmail(email) {
    const response = await fetch(
      `${API_URL}/users?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error("Unable to load user");
    }

    const users = await response.json();
    return users.map(user => new User(user));
  }

  static async create(payload) {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Unable to create user");
    }

    const user = await response.json();
    return new User(user);
  }

  static getLoggedInUser() {
    const user = localStorage.getItem("loggedInUser");
    return user ? new User(JSON.parse(user)) : null;
  }

  static requireRole(role) {
    const user = User.getLoggedInUser();

    if (!user || user.role !== role) {
      window.location.href = "index.html";
      return null;
    }

    return user;
  }

  static async confirmLogout() {
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

  static setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => User.confirmLogout());
    }
  }
}
