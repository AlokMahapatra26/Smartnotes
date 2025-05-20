"use server"

import { createClient } from "@/auth/server";
import { handleError } from "@/lib/utils";
import { db } from "@/db/index" ;
import  { users } from "@/db/schema"; 

export const loginAction = async (email : string, password : string) => {
    try{
        const {auth} = await createClient()

        const {error} = await auth.signInWithPassword({
            email,
            password
        })

        if(error) throw error

        return {errorMessage : null}

    }catch(error){
        return handleError(error)
    }
}



export const logoutAction = async () => {
    try{
        const {auth} = await createClient()

        const {error} = await auth.signOut()

        if(error) throw error

        return {errorMessage : null}

    }catch(error){
        return handleError(error)
    }
}

export const signupAction = async (email : string, password : string) => {
    try{
        const {auth} = await createClient()

        const {data , error} = await auth.signUp({
            email,
            password,
        })

        if(error) throw error

        const userId = data.user?.id;

        if(!userId) throw new Error("Error signing up");

        //add userId and email into data
        await db.insert(users).values({
            id: userId,
            email: email,
            });

        return {errorMessage : null}

    }catch(error){
        return handleError(error)
    }
}