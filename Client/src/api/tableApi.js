import axios from 'axios'


const URL='http://localhost:5000'

export async function createNewTable({blind,ante}) {
    try {
        const res = await axios.post(`${URL}/table/createTable`,{blind,ante})
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function joinNewTable({tableId,userId}){
    try {
        const res = await axios.post(`${URL}/table/joinTable`,{tableId,userId})
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function leaveNewTable({tableId,userId}){
    try {
        const res = await axios.post(`${URL}/table/leaveTable`,{tableId,userId})
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function betNew({tableId,userId,betAmmount}){
    try {
        const res = await axios.post(`${URL}/table/bet`,{tableId,userId,betAmmount})
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}
export async function shipNewWinnings({tableId,userId}){
    try {
        const res=await axios.post(`${URL}/table/shipWinnings`,{tableId,userId})
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function newFold({tableId,userId}){
    try {
        const res=await axios.post(`${URL}/table/fold`,{tableId,userId})
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function GetNewTable({tableId}){
    try {
        const res = await axios.get(`${URL}/table/${tableId}/getTable`)
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function startNewGame({tableId}){
    try {
        const res=await axios.get(`${URL}/table/${tableId}/start`)
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function dealNewSharedCards({tableId}){
    try {
        const res=await axios.get(`${URL}/table/${tableId}/deal`)
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

export async function getAllNewTables(){
    try {
        const res=await axios.get(`${URL}/table/getAllTables`)
        return res.data
    } catch (e) {
        console.log(e);
        throw e 
    }
}
