class Membership {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.planId = data.planId;
    this.purchaseDate = data.purchaseDate;
    this.expiryDate = data.expiryDate;
  }

  getStatus() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return new Date(this.expiryDate) >= today ? "Active" : "Expired";
  }

  isActive() {
    return this.getStatus() === "Active";
  }

  static async getAll() {
    const response = await fetch(`${API_URL}/memberships`);

    if (!response.ok) {
      throw new Error("Unable to load memberships");
    }

    const memberships = await response.json();
    return memberships.map(membership => new Membership(membership));
  }

  static async getByUserId(userId) {
    const response = await fetch(
      `${API_URL}/memberships?userId=${encodeURIComponent(userId)}`
    );

    if (!response.ok) {
      throw new Error("Unable to load memberships");
    }

    const memberships = await response.json();
    return memberships.map(membership => new Membership(membership));
  }

  static async create(payload) {
    const response = await fetch(`${API_URL}/memberships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Unable to create membership");
    }

    const membership = await response.json();
    return new Membership(membership);
  }

  static async update(id, payload) {
    const response = await fetch(`${API_URL}/memberships/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Unable to update membership");
    }

    const membership = await response.json();
    return new Membership(membership);
  }
}
