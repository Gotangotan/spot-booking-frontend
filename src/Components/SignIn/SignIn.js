import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import './SignIn.css'

function SignIn() {
    const { login } = useContext(AuthContext)
    const { handleSubmit, register } = useForm();
    const signup = useHistory()
    const history = useHistory()






  async function onSubmit(data) {
      // console.log('data input?',data)
      // console.log(data.username)
      // console.log(data.password)
        try{
            const result = await axios.get(`https://localhost:8090/users/${data.username}`, {
                auth: {
                    username: "admin",
                    password: "password"
                }
            });
            // console.log('result username?',result.data.username)
            // console.log('result password?',result.data.password)
            if (result.data.username === data.username){
                console.log('known');
            }
            // console.log('result?',result.data.username)
            login(result.data.username)

            history.push('/Profile')

        }
        catch (e) {
            console.error(e)
        }
    }



    return (
        <>
            <div className='container'>
            <h1>Let's get started</h1>
            <h2>So? What's your username?</h2>
            <form className='form_signup' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">
                    Me: 'Yes hello database... <br/>I've already signed up before. <br/><br/>You will find me by looking for username'
                    <input
                        type="text"
                        id="username"
                        name="username"
                        {...register("username",{required: true})}
                    />
                </label>

                <label htmlFor="password-field">
                    Password:
                    <input
                        type="password"
                        id="password-field"
                        name="password"
                        {...register("password")}
                    />
                </label>
                <button
                    type="submit"
                    className="button button1"
                >
                    Fetch me!
                </button>


            </form>
            </div>

            <div className='container'>
                <h1>Are you sure you've signed up before?</h1>
                <h2>No? That's oke. You can still sign up! <br/> There's enough space in the cloud.</h2>
                <button
                    className='button button1'
                    type="button"
                    onClick={() => signup.push('/signup')}
                >
                    Sign up
                </button>
            </div>
</>
    );
}

export default SignIn;