import { useState } from "react";
import { Link } from "react-router-dom";
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
const SignIn = () => {
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
    console.log(formData)
    return (
        <div className="page-container">
            <header>
                <p>Welcome Back!</p>
            </header>
            <form>
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

            <Link to ='/sign-up' className="registerLink">
                Sign Up Instead
            </Link>
        </div>
    )
}
export default SignIn;