import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import {getAuth , signInWithEmailAndPassword} from 'firebase/auth';
import {toast} from 'react-toastify'
import Oauth from "../components/Oauth";

const SignIn = () => {
    const navigate = useNavigate()
    const [showPassword , setShowPassword] = useState(false);
    const [formData , setFormData] = useState({
        email : '',
        password :'',
    })
    const {email , password } = formData;
    const onChange = (e) => {
        setFormData((prevState)=>{
            return {...prevState,
            [e.target.id]:e.target.value}
        })
    }
    
    const onSubmit = async(e) =>{
        e.preventDefault()
        try {   
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            if (userCredential.user){
                navigate('/')
            }
        }
        catch(error){
            toast.error('Bad user credentials')
        }
        
    }
    return (
        <div className="page-container">
            <header>
                <p>Welcome Back!</p>
            </header>
            <form onSubmit={onSubmit}>
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
                <Link to ='/forgot-password' className="forgotPasswordLink">
                    Forgot password
                </Link>
                <div className="signInBar">
                    <p className="signInText">Sign In</p>
                    <button className="signInButton">
                        <ArrowRightIcon fill="#ffffff" width='34px'/>
                    </button>
                </div>
            </form>
            {/* google OAuth */}
            <Oauth/>
            <Link to ='/sign-up' className="registerLink">
                Sign Up Instead
            </Link>
        </div>
    )
}
export default SignIn;