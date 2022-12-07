import {getAuth , sendPasswordResetEmail} from 'firebase/auth'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
const ForgotPassword = () => {

    const [email ,setEmail] = useState('')
    const onSubmit = async(e) => {
        e.preventDefault()
        try{
            const auth = getAuth()
            await sendPasswordResetEmail(auth,email);
            toast.success('Email was sent ')

        }
        catch(error){
            toast.error('Couldnt sent reset email')
            console.log(error)
        }
    }
    const onChange = (e) => {
        setEmail(e.target.value)
    }
    return(
        <div className='pageContainer'>
            <header>
                <p className='pageheader'>
                    Forgot Password
                </p>
                <main>
                    <form onSubmit={onSubmit}>
                        <input
                        id = 'email' 
                        value={email}
                        type = 'email' className='emailInput'
                        placeholder='Email'
                        onChange={onChange}
                        />

                        <Link className='forgotPasswordLink' to ='/sign-in'>
                            Sign In
                        </Link>
                        <div className='signInText'>Send Reset Link</div>
                        <button className='signInButton'>
                            <ArrowRightIcon fill='#ffffff' width='34px' 
                            height='34px'/>
                        </button>
                    </form>
                </main>
            </header>
        </div>
    )
}
export default ForgotPassword;