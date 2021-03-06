
import axios from 'axios';
import fire from '../firebase';
class UserCrud{
     createToken = () => {
        const user = fire.auth().currentUser;
        const token = user && ( user.getIdToken());
        const payloadHeader = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        return payloadHeader;
      }
       loginUser =  (userAuth) =>{
          debugger;
            fire.auth().signInWithEmailAndPassword(userAuth.userEmail, userAuth.userPassword)
            .then(()=>{
              debugger
              const header =  this.createToken();
              axios.get(`http://localhost:4000/login/${userAuth.userEmail}/${userAuth.userPassword}`,header)
            .then(res => {
              debugger;
              console.log(res.data)
              let user = res.data.user;
              // localStorage.setItem("token", res.data.token );
              localStorage.setItem("token", res.data.token );
              return user;
              // dispatch(actions.setUser(user));
            })  
            })
              .catch((error) => {
                return { _id:0,
                    firstName: "",
                    lastName: "",
                    email:"",
                    password:""};
              });
              
      
   
      };
      loginPromiseUser =  (userAuth) =>new Promise((resolve, reject)=>{
        debugger;
          fire.auth().signInWithEmailAndPassword(userAuth.userEmail, userAuth.userPassword)
          .then(()=>{
            debugger
            const header =  this.createToken();
            axios.get(`http://localhost:4000/login/${userAuth.userEmail}/${userAuth.userPassword}`,header)
          .then(res => {
            debugger;
            console.log(res.data)
            let user = res.data.user;
            // localStorage.setItem("token", res.data.token );
            localStorage.setItem("token", res.data.token );
            resolve(user)
            // return user;
            // dispatch(actions.setUser(user));
          })
          .catch((err)=>{reject({messeg:'Sorry there is a problem on our site try later'})})  
          })
            .catch((error) => {
              // return { _id:0,
              //     firstName: "",
              //     lastName: "",
              //     email:"",
              //     password:""};
              reject({messeg:'Incorrect username or password'})
            });
            
    
 
    });
      registerPromiseUser = (user)  =>new Promise((resolve, reject)=> {
        debugger;
       
          fire.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(()=>{
            debugger;
            const header =  this.createToken();
            axios.post(`http://localhost:4000/register`,user ,header)
            .then(res => {
              debugger
              let user = res.data.user;
              // localStorage.setItem("token", res.data.token );
              localStorage.setItem("token", res.data.token );
              resolve(user) ;
              // dispatch(actions.setUser(user));
            }).catch(err=>{
              reject({messeg:'Sorry there is a problem on our site try later'})
                
            })
          })
              .catch((error) => {
                debugger
                
                
                reject({messeg:'Incorrect username or password'})
              });
       
      });
      updateUser = (user) => new Promise((resolve, reject)=>{
        debugger;
            axios.put(`http://localhost:4000/update/${user._id}`,user, {
              headers: {
                authorization: `token ${ localStorage.getItem("token")}`
              }
            }  )
            .then(res => {
              let user = res.data.user;
              resolve(user);
              // dispatch(actions.setUser(user));
            }).catch(err=>{
              reject({err:"try later"})
            })
      
        
      });
      forgetPassword1=(email)=> new Promise((resolve, reject)=>{
        debugger;
           axios.post(`http://localhost:4000/forgetPassword`,email)
            .then(res => {
              console.log("hgfd")
              if(res.data='good')
              console.log(res.data)
              resolve(true)
              debugger;
            }).catch(err=>{
               console.log(err);
               reject(err)
            })
            debugger;
        
      });
}
export default new UserCrud();
