import axios from "../axios";

class ProductService {
    findProduct = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('product/search', JSON.stringify(data), config)
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

    createProduct = async (data) => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/create', data, config)
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

    updateProduct = async (data) => {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/update', data, config)
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


    getAllProducts = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('product/getproducts', JSON.stringify(data), config)
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

    getProductByCategory = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('product/getProductByCategory', JSON.stringify(data), config)
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

    removeProduct = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/remove', JSON.stringify(data), config)
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


    getUserProducts = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {

            axios.post('product/getproducts', JSON.stringify(data), config)
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

    createBooking = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/booking', JSON.stringify(data), config)
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

    getUserBookings = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/getbookingsuser', JSON.stringify(data), config)
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

    getOwnerBookings = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/getbookingshotel', JSON.stringify(data), config)
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

    updateBookingStatus = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/updatestatus', JSON.stringify(data), config)
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


    addCart = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/addCart', JSON.stringify(data), config)
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

    getCartUser = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/getCartUser', JSON.stringify(data), config)
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

    addOrder = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/addOrder', JSON.stringify(data), config)
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

    loadOrders = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/getOrdersUser', JSON.stringify(data), config)
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
    loadAllOrders = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/getAllOrders', JSON.stringify(data), config)
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


    updateOrderStatus = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/updateOrderStatus', JSON.stringify(data), config)
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

    updateOrderDeliveredStatus = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/updateOrderDeliveredStatus', JSON.stringify(data), config)
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



    addFeedback = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/feedback', JSON.stringify(data), config)
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

    loadAllFeedbacks = async (data) => {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const promise = new Promise((resolve, reject) => {
            axios.post('product/allFeedback', JSON.stringify(data), config)
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
export default new ProductService();