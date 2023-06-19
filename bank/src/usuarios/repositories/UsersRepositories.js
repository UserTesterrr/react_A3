import http from "../../Httphelper";

class CallRepositories {

    async getUsersById(callCode) {
        try {
            const response = await http.get(`/contacts/${callCode}`);
            return response
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }
    
    async getUsers() {
        try {
            const response = await http.get(`/contacts`);
            return response
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }
    
    async deleteUser(callCode) {
        try {
            const response = await http.delete(`/contacts/${callCode}`);
            return response
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    async postCreateUser(nameCreate, addressCreate, emailCreate, contactCreate, linkedinCreate) {
        try {
            const response = await http.post("/contacts", {
                nome: `${nameCreate}`,
                endereco: `${addressCreate}`,
                email: `${emailCreate}`,
                telefone: `${contactCreate}`,
                linkedin: `${linkedinCreate}`,
            });
            return response
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    async putEditUser(id, nameCreate, addressCreate, emailCreate, contactCreate, linkedinCreate) {
        try {
            const response = await http.put(`/contacts/${id}`, {
                id: `${id}`,
                nome: `${nameCreate}`,
                endereco: `${addressCreate}`,
                email: `${emailCreate}`,
                telefone: `${contactCreate}`,
                linkedin: `${linkedinCreate}`,
            });
            return response
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }
}

export const callRepositories = new CallRepositories();
