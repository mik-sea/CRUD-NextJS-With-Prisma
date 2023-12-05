import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(req:Request){
    const body = await req.json()
    const {title, price} = body

    // const exist = await prisma.products.findUnique({
    //     where:{
    //         title:title
    //     }
    // })

    // if(exist){
    //     return NextResponse.json({error :"Data already exists"},{status:200})
    // }

    try{
        const user = await prisma.products.create({
            data:{
                title:title,
                price:price
            }
        })
        return NextResponse.json({msg:"Success created account"},{status:200})
    }catch(error){
        return NextResponse.json(error)
    }
}