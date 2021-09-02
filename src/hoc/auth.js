import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null) {
    
    // option => null, true, false
    // 1. null: 아무나 출입 가능한 페이지
    // 2. true: 로그인한 유저만 출입이 가능한 페이지
    // 3. false: 로그인한 유저는 출입 불가능한 페이지

    // adminRoute => true, false
    // 1. true: 관리자
    
    function AuthenticationCheck({ navigation }){
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                // 로그인하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        navigation.navigate('LoginPage')
                    }
                }
                else{ // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                          })
                    }
                    else{
                        if(!option){
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                              })
                        }
                    }
                }

            })


        }, [])
        
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}