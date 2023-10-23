import React ,{useState}from "react";
import {toast} from 'react-hot-toast';
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const navigate=useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidv4();
        console.log(id);
        setRoomId(id);
        toast.success('New Room Created');
      };
      const joinRoom = () => {
        
            if(!roomId||!username){
                toast.error('Please fill all the fields');
                return;
            }
            navigate(`/editor/${roomId}`,{
            state:{username,},});
         };
    return (
        <div className="homePageWrapper">
        <div className="formWrapper">
            <img src="codepair.png"   alt="CodeShare " />
            {/* <img src="codeshare.jpeg" alt="CodeShare" /> */}
            {/* <h1 className="mainLabel1" >CodeShare</h1> */}
            <h4 className="mainLabel2">Join using Room Id</h4>
            <div className="inputGroup">
                <input 
                type="text" className="inputBox" 
                placeholder="ROOM ID" 
                onChange={(e)=>{setRoomId(e.target.value)}} 
                onKeyUp={(e)=>{if(e.key==='Enter'){joinRoom()}}}
                value={roomId}/>  
                <input 
                type="text" 
                className="inputBox" 
                placeholder="USER NAME" 
                onChange={(e)=>{setUsername(e.target.value)}} 
                onKeyUp={(e)=>{if(e.key==='Enter'){joinRoom()}}}
                value={username} /> 
                <button onClick={joinRoom} className="btn joinBtn">JOIN</button>
                <span className="createInfo" >
                    if you dont have then create &nbsp;
                    <a onClick={createNewRoom} href="" className="createNewBtn">new room</a>
                </span>
                
            </div>
        </div>
        <footer>
        <h4 >Created&nbsp;by{''} <a href="https://github.com/rishabh777-CE" >Rishabh Shrivastava</a></h4> 
        </footer>
    </div>
    );
};
export default Home;