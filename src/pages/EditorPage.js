import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Users from "../components/Users";
import Editor from "../components/editor";
import { initSocket } from "../socket";


const EditorPage = () => {
    const reactNavigator = useNavigate();
    const socketRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const [clients, setClients] = useState([]);
    const [fullScreen, setFullScreen] = useState(false);

    useEffect(() => {
        const init = async () => {

            socketRef.current = await initSocket(roomId);


            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));
            function handleErrors(err) {
                console.log('socket error', (err));
                toast.error('socket error');
                reactNavigator('/');
            }
            socketRef.current.emit('join',
                {
                    roomId,
                    username: location.state?.username,

                });

            socketRef.current.on('joined',
                ({ clients, username, socketId }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room`);
                        console.log(`${username} joined the room`);
                    }
                    setClients(clients);
                    socketRef.current.emit('sync-code', {
                        roomId,
                        socketId,
                    });

                });


            //listening to disconnected event
            socketRef.current.on('disconnected', ({ socketId, username }) => {
                toast.error(`${username} left the room`);
                setClients((prev) => {
                    return prev.filter(
                        (client) => client.socketId !== socketId
                    );
                })
            });
        };
        init();
        //cleaning function

        return () => {
            socketRef.current.disconnect();
            socketRef.current.off('joined');
            socketRef.current.off('disconnected');
        }
    }, []);


    
    if (!location.state) {
        return <Navigate to="/" />
    }

    if(fullScreen==false)
    return (
        <div className="mainWrap">
            <div className="aside">
              <Users clients={clients} roomId={roomId} />
            </div>
            <div className="editorWrap">
                {socketRef.current && <Editor socketRef={socketRef} roomId={roomId} fullScreen={fullScreen} setFullScreen={setFullScreen}/>}
            </div>
        </div>
    );
    else 
    return(
        
            <div className="editorWrap">
                {socketRef.current && <Editor socketRef={socketRef} roomId={roomId} fullScreen={fullScreen} setFullScreen={setFullScreen}/>}
            </div>
       
    );
};
export default EditorPage;