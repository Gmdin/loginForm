import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state,action)=>{

  if(action.type==='user_input'){
    return {value:action.val,isValid:action.val.includes('@')};
  }else  if(action.type==='input_buller'){
    return {value:state.value,isValid:state.value.includes('@')};
  }
  return {value:'', isValid:false};
}

const pwdReducer=(state,action)=>{
  
  if(action.type==='user_input'){
    return {value:action.val,isValid:action.val.trim().length>6};
  }else  if(action.type==='input_buller'){
    return {value:state.value,isValid:state.value.trim().length>6};
  }
  return {value:'', isValid:false};
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatch]=useReducer(emailReducer,{
    value:'', isValid:undefined
  });
  const [pwdState,pwdDispatch]=useReducer(pwdReducer,{
    value:'',isValid:undefined
  })
 
  const {isValid:pwdIsValid}=pwdState;
  const {isValid:emailIsValid}=emailState;
  useEffect(()=>{
    const idenfier=setTimeout(()=>{
      console.log("checking for validity");
      setFormIsValid(
        emailIsValid && pwdIsValid
      );
    },1000)
   return()=>{
    console.log("cleanUp");
    clearTimeout(idenfier);
   }
  },[emailIsValid,pwdIsValid]);
  const emailChangeHandler = (event) => {
   dispatch({type:'user_input',val:event.target.value})
    // setFormIsValid(
    //   event.target.value.includes('@') && pwdState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    pwdDispatch(
      { type:'user_input',val:event.target.value}
    );

    setFormIsValid(
      emailState.isValid&& event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatch({type:'input_buller'});
  };

  const validatePasswordHandler = () => {
    pwdDispatch({type:'input_buller'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, pwdState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            pwdDispatch.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={pwdState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
