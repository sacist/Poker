import axios from 'axios'


const URL='http://localhost:5000'

export async function authUser({nickname,password}) {
    try {
        const res = await axios.post(`${URL}/user/auth`,{nickname,password})
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function setUserBalance({nickname,ammount}) {
    try {
        const res = await axios.post(`${URL}/user/setBalance`,{nickname,ammount})
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function userLogin({nickname,password}) {
    try {
        const res = await axios.post(`${URL}/user/login`,{nickname,password})
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function getUserByNickname({nickname,token}){
    try {
        const res=await axios.get(`${URL}/user/getUserByNickname/${nickname}`)
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}


async function exampleMiddleware({nickname,token}){
    try {
        const res=await axios.get(`${URL}/user/getUserByNickname/${nickname}`,{headers:{
            'Authorization':`Bearer ${token}`
        }})
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}