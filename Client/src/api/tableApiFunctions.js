import { createNewTable,joinNewTable,leaveNewTable,
    betNew,GetNewTable,startNewGame,dealNewSharedCards,shipNewWinnings,newFold,getAllNewTables } from "./tableApi";

export const createTable = async (blind,ante) => {
    try {
        const data = await createNewTable({ blind, ante });
        console.log(data);
        return data
    } catch (e) {
        console.error(e);
    }
};

export const joinTable = async (tableId,userId) => {
    try {
        const data = await joinNewTable({ tableId, userId });
        console.log(data);
        return data
    } catch (e) {
        console.error(e);
    }
};

export const leaveTable = async (tableId,userId) => {
    try {
        const data = await leaveNewTable({ tableId, userId });
        console.log(data);
        return data
    } catch (error) {
        console.error(e);
    }
};
export const bet = async (tableId,userId,betAmmount) => {
    try {
        const data = await betNew({ tableId, userId,betAmmount });
        console.log(data);
        return data
    } catch (error) {
        console.error(e);
    }
};
export const shipWinnings = async (tableId,userId) => {
    try {
        const data = await shipNewWinnings({ tableId, userId});
        console.log(data);
        return data
    } catch (error) {
        console.error(e);
    }
};

export const fold = async (tableId,userId) => {
    try {
        const data = await newFold({ tableId, userId});
        console.log(data);
        return data
    } catch (error) {
        console.error(e);
    }
};

export const getTable = async (tableId) => {
    try {
        const data = await GetNewTable({tableId});
        console.log(data);
        return data
    } catch (error) {
        console.error(e);
    }
};
export const startGame = async (tableId) => {
    try {
        const data = await startNewGame({tableId});
        console.log(data);
        return data
    } catch (error) {
        console.error(e);
    }
};

export const dealSharedCards = async (tableId) => {
    try {
        const data = await dealNewSharedCards({tableId});
        console.log(data);
        return data
    } catch (error) {
        console.error(e);
    }
};

export const getAllTables=async()=>{
    try {
        const data = await getAllNewTables();
        return data
    } catch (e) {
        console.error(e);
    }
}