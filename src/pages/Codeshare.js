import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

import Post from "../components/Post";
import { initSocket } from "../socket";
import axios from 'axios';
import { Socket } from "socket.io-client";

const CodeShare = () => {
    const reactNavigator=useNavigate();
    const {roomId}=useParams();
    const [writeCode, setWriteCode] = useState(null);
    const socketRef = useRef(null);    
    useEffect(()=>{
        const init=async ()=>{
           
            socketRef.current=await initSocket(roomId);
        
    
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));
            function handleErrors(err) {
                console.log('socket error',(err ));
                toast.error('socket error');
                reactNavigator('/');
            }
            socketRef.current.emit('read',
            {
                roomId,
            });

            socketRef.current.on('write',({code})=>{
                if(code)
                setWriteCode(code);
            });
            
              
            
            socketRef.current.on('write', ({ code }) => {
               setWriteCode(code);
            });

            //listening to disconnected event
            
        };
        
         init();
        //cleaning function
    
        return ()=>{
            socketRef.current.disconnect();
            socketRef.current.off('joined');
            socketRef.current.off('disconnected');
        }
    },[socketRef.current]);
    return (
            <div className="editorWrap">
                { writeCode && <Post writeCode={writeCode} socketRef={socketRef}  />}    
            </div>
    
    );
};
export default CodeShare;