import React,{useState,useEffect} from 'react';
import './App.css';
import Post from "./Post";
import { db ,auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core'
import  ImageUpload from "./ImageUpload"
import InstagramEmbed from 'react-instagram-embed';
 
function getModalStyle() {
  const top = 50 ;
  const left =50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function App() {
  const classes=useStyles();
  const[modalStyle]=useState(getModalStyle);
  const[open,setOpen]=useState(false);
const [posts,setPosts]=useState([]);
const[username,setUsername]=useState("");
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const [user ,setUser]=useState(null)
const [openSignIn,setOpenSignIn]= useState("");


useEffect(()=>{
 const unsubscribe=auth.onAuthStateChanged((authUser)=>{
 
  if(authUser){
    console.log(authUser);
setUser(authUser);
  
  
 } else{
   
    setUser(null);
  }

})
return()=>{
  //perform some clean up actions
  unsubscribe();
}
},[user,username])

useEffect(()=>{
db.collection('posts').orderBy("timestamp","desc").onSnapshot(snapshot=>{
  setPosts(snapshot.docs.map(doc=>({
    id:doc.id,
    posts:doc.data()
  })));
})

},[]);
const signUp =(event)=>{
  event.preventDefault();
  auth
  .createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
   return authUser.user.updateProfile ({
     displayName:username
   })
  })
 .catch((error)=>alert(error.message));
 setOpen(false);
}
const signIn =(event)=>{
  event.preventDefault();
  auth
  .signInWithEmailAndPassword(email,password)
  .catch((error)=>alert(error.message))
  setOpenSignIn(false);
}



  return (
    <div className="app">
      {/* caption inpu */}
     

      
      {/* filre picker */}
      {/* post button */}

      <Modal
  open={open}
  onClose={()=>setOpen(false)}
  >
<div style={modalStyle} className={classes.paper}>
  <form className="app__signUp" >
  <center>
    <img  className="app__headerimage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="" />
    </center>
  <Input
       placeholder="username"
         type='text'
   value= {username}
   onChange={(e)=>setUsername(e.target.value)}/>
  
   <Input
       placeholder="email"
       type='text'
       value= {email}
       onChange={(e)=>setEmail(e.target.value)}/>
   <Input
   placeholder="password"
   type='password'
   value= {password}
   onChange={(e)=>setPassword(e.target.value)}/>
   
<Button onClick={signUp}>SIGNUP</Button>
  </form>
    
   
     </div>
</Modal>
<Modal
  open={openSignIn}
  onClose={()=>setOpenSignIn(false)}
  >
<div style={modalStyle} className={classes.paper}>
  <form className="app__signUp" >
  <center>
    <img  className="app__headerimage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="" />
    </center>
  
   <Input
       placeholder="email"
       type='text'
       value= {email}
       onChange={(e)=>setEmail(e.target.value)}/>
   <Input
   placeholder="password"
   type='password'
   value= {password}
   onChange={(e)=>setPassword(e.target.value)}/>
   
<Button onClick={signIn}>SIGNIN</Button>
  </form>
    
   
     </div>
</Modal>
     <div className="app__header">
      <img  className="app__headerimage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt="" />
    
     {user?
     (<Button onClick={()=>auth.signOut()}>LOGOUT </Button>):
   (<div className="login__container">

<Button onClick={()=>setOpenSignIn(true)}>SIGNIN</Button>
     <Button onClick={()=>setOpen(true)}>SIGNUP </Button>
     </div>
     )}
 </div>
     <div className="app__posts">
 <div className="app__left">
     {
       posts.map(({id,posts})=>(
         <Post  key ={id} postId={id} user= {user}  username={posts.username} caption={posts.caption} imageUrl={posts.imageUrl} />
       ))
     }
     </div>
<div className="app__right">
     <InstagramEmbed
  url='https://www.instagram.com/p/Byg3UMqn1Ij/'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
</div>
      </div>
      
      {user?.displayName?(
        <ImageUpload username={user.displayName}/>
      ):(<h3>sorry you need to be login before uploading any Image</h3>)}
 
    </div>
  );
}

export default App;
