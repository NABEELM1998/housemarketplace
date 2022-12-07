import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {db} from '../firebase.config.js';
import {setDoc, doc, serverTimestamp} from 'firebase/firestore';
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
const SignUp = () => {
    const navigate = useNavigate();
    const [showPassword , setShowPassword] = useState(false);
    const [formData , setFormData] = useState({
        name :'',
        email : '',
        password :'',
    })
    const {name , email , password } = formData;
    const onChange = (e) => {
        setFormData((prevState)=>{
            return {...prevState,
            [e.target.id]:e.target.value}
        })
    }
    
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth ,
                email, 
                password
                )
                const user = userCredential.user
                updateProfile(auth.currentUser,{
                    displayName:name
                })
                const formDataCopy = {...formData}
                delete formDataCopy.password;
                formDataCopy.timestamp = serverTimestamp();
                
                await setDoc(doc(db,'users',user.uid),formDataCopy);

                navigate('/')
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <div className="page-container">
            <header>
                <p>Welcome Back!</p>
            </header>
            <form onSubmit={onSubmit}>
            <input 
                    type='text'
                    placeholder="Name" 
                    value={name}
                    className = 'nameInput'
                    id = 'name'
                    onChange = {onChange}
                />
                <input 
                    type='email'
                    placeholder="Email" 
                    value={email}
                    className = 'emailInput'
                    id = 'email'
                    onChange = {onChange}
                />
                <div className="passwordInputDiv">
                    <input 
                        type={showPassword ? 'text': 'password'}
                        placeholder = 'password'
                        className="passwordInput"
                        value={password}
                        id = 'password'
                        onChange={onChange}
                    />
                    <img 
                        src = {visibilityIcon} alt = 'showPassword'
                        className="showPassword"
                        onClick={()=>setShowPassword((prevState)=>!prevState)}
                    />
                </div>
                <div className="signUpBar">
                    <p className="signUpText">Sign Up</p>
                    <button className="signUpButton" type="submit">
                        <ArrowRightIcon fill="#ffffff" width='34px'/>
                    </button>
                </div>
            </form>
            {/* google OAuth */}

            <Link to ='/sign-in' className="registerLink">
                Sign In Instead
            </Link>
        </div>
    )
}
export default SignUp;