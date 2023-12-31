import axios from "../axios";

class UserService {
    findUser = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/login', JSON.stringify(data), config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    getUser = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/getuserbyid', JSON.stringify(data), config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }


    createUser = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/create', JSON.stringify(data), config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    updateUser = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/update', JSON.stringify(data), config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    getNotification = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/getnotifications', JSON.stringify(data), config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    addFriend = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/addfriend', JSON.stringify(data), config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    removeFriend = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/removefriend', JSON.stringify(data), config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }


    getFriends = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/getallfriends', JSON.stringify(data), config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    getAllUsers = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/admingetalluser', JSON.stringify(data), config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    adminmakeuseractive = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/adminmakeuseractive', JSON.stringify(data), config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    upadateUserImage = async (data) => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('user/upadateimage', data, config)
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

}
export default new UserService();