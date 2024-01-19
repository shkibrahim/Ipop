import socketIO from "socket.io-client";


export const socketConfig = async () => {
  return new Promise(async (resolve) => {
    try {
      global.socket = socketIO(`http://vs.api.popup.lol:3000`, {
        transports: ["websocket"],
        jsonp: false,
      });
      // socket.connect();
      global.socket.on("connect", () => {
        console.log("connected to a socket server", socket.connected);
      });
      resolve({ status: "success", data: global.socket });
      console.log("socket on", global.socket);
    } catch (error) {
      resolve({ status: "failure", data: error });
    }
  });
};

export const socketConfigForRecentPopupVisit = async () => {
  return new Promise(async (resolve) => {
    try {
      const ws = new WebSocket("wss://api-preprod.popup.lol:1443/popup/websocket");

      ws?.onopen(()=> {
          console.log("Socket Connected!!!!!");
          resolve({ status: "success", data: ws });
      });
     
      ws?.onerror((error)=> {
          console.log("Socket NOT Connected!!!!!",error);
          resolve({ status: "failure", data: error });
      });
      
    } catch (error) {
      resolve({ status: "failure", data: error });
    }
  });
};
