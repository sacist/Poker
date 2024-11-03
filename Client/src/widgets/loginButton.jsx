import React, { useState, useEffect } from 'react';
import { login } from '../api/userApiFunctions';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

export const LoginButton=({nickname,setNickname,className})=>{
    const navigate=useNavigate()

    useEffect(() => {
        const savedNickname = localStorage.getItem('nickname');
        if (savedNickname) {
            setNickname(savedNickname);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nickname');
        setNickname(null);
    };
    
    const loginFunc=async () => {
      const data=await login("sacist33","qwert")
      localStorage.setItem("token",data.token)
      localStorage.setItem("nickname",data.nickname)
      setNickname(localStorage.getItem('nickname'))
    return navigate('/login')
    }



    return(
        <div>
            {nickname ?(
                    <LoginButt className={className}>{nickname}</LoginButt>
            ):(
                <LoginButt onClick={loginFunc} className={className}>Log in</LoginButt>  
            )}
        </div>
    )
}


const LoginButt=styled.button`
    border:none;
    color:white;
    font-size: 40px;
    justify-self: right;
    background: none;
`