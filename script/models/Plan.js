class Plan {
  constructor(data) {
    this.id = data.id;
    this.planName = data.planName;
    this.duration = Number(data.duration);
    this.price = Number(data.price);
    this.ageGroup = data.ageGroup;
    this.status = data.status;
    this.isDeleted = data.isDeleted;
    this.createdAt = data.createdAt;
  }

  isActive() {
    return this.status === "Active";
  }

  isAvailable() {
    return this.status === "Active" && this.isDeleted === false;
  }

  getDurationType() {
    if (this.duration <= 31) return "Monthly";
    if (this.duration <= 100) return "Quarterly";
    if (this.duration <= 190) return "Half-Yearly";
    return "Yearly";
  }

  getFormattedPrice() {
    return `Rs. ${this.price.toLocaleString("en-IN")}`;
  }

  static async getAll() {
    const response = await fetch(`${API_URL}/plans`);

    if (!response.ok) {
      throw new Error("Unable to load plans");
    }

    const plans = await response.json();
    return plans.map(plan => new Plan(plan));
  }

  static async create(payload) {
    const response = await fetch(`${API_URL}/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Unable to create plan");
    }

    const plan = await response.json();
    return new Plan(plan);
  }

  static async update(id, payload) {
    const response = await fetch(`${API_URL}/plans/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Unable to update plan");
    }

    const plan = await response.json();
    return new Plan(plan);
  }
}
