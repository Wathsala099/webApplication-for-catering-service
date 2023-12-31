import axios from "../axios";

class PostService {
    getAllPosts = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('post/getposts', JSON.stringify(data), config)
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

    getUserPosts= async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('post/getpostsforsingleuser', JSON.stringify(data), config)
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

    searchPost= async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('post/search', JSON.stringify(data), config)
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


    createPost = async (data) => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('post/create', data, config)
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

    createLike = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('like/create', JSON.stringify(data), config)
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
    deleteLike = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('like/delete', JSON.stringify(data), config)
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


    sharePost = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('post/share', JSON.stringify(data), config)
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
export default new PostService();