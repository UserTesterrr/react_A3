import { callRepositories } from "../repositories/UsersRepositories";

class CallUseCases {

    async getUsers() {
        const response = await callRepositories.getUsers();
        return response;
    }

    async getUsersById(callCode) {
        const response = await callRepositories.getUsersById(callCode);
        return response;
    }
    async deleteUser(callCode) {
        const response = await callRepositories.deleteUser(callCode);
        return response;
    }

    async postCreateUser(nameCreate, addressCreate, emailCreate, contactCreate, linkedinCreate) {
        const response = await callRepositories.postCreateUser(nameCreate, addressCreate, emailCreate, contactCreate, linkedinCreate);
        return response;
    }

    async putEditUser(id, nameCreate, addressCreate, emailCreate, contactCreate, linkedinCreate) {
        const response = await callRepositories.putEditUser(id, nameCreate, addressCreate, emailCreate, contactCreate, linkedinCreate);
        return response;
    }

}

export const callUseCases = new CallUseCases();
