import Client from "./Client";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
const Users = ({ clients,roomId }) => {
   
    const reactNavigator = useNavigate();
    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

return (
            <>
                <div className="asideInner">
                    <div className="logo">
                        <img className="logoImage"
                            src="/editpage.png"
                            alt="logo"
                        />
                    </div>
                    <div>
                        <h3>connected</h3>
                        <div className="clientsList">
                            {
                                clients.map((clients) => (
                                    <Client key={clients.socketId} username={clients.username} />
                                ))
                            }
                        </div>
                    </div>
                </div>
                
             
                <button className="btn copyBtn" onClick={copyRoomId}>Copy Room Id</button>
                <button className="btn leaveBtn" onClick={leaveRoom}>Leave Room</button>
           </>
            )
    };
export default Users;