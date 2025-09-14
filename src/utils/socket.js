import io from "socket.io-client";
import { BASE_URL } from "./constants";

const createSocketConnection = ()=>{
    const socket = io(BASE_URL);
    return socket;
};


export default createSocketConnection;