
class ApiService {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // GET data
    async get(resource) {
        const response = await fetch(`${this.baseUrl}/${resource}`);

        if (!response.ok) {
            throw new Error("Unable to load data");
        }

        return response.json();
    }

    // POST data
    async post(resource, payload) {
        const response = await fetch(`${this.baseUrl}/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Unable to save data");
        }

        return response.json();
    }

    // PATCH data
    async patch(resource, id, payload) {
        const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error("Unable to update data");
        }

        return response.json();
    }
}

const api = new ApiService("http://localhost:3000");
