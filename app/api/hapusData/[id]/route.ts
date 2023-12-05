import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

interface deleteParams{
    id:string
}

export async function DELETE(req:Request, {params}:{params:{id:string}}){
    const { id } = params
    // const body = await req.json()
    // const {id} = body

    // const exist = await prisma.products.findUnique({
    //     where:{
    //         title:title
    //     }
    // })

    // if(exist){
    //     return NextResponse.json({error :"Data already exists"},{status:200})
    // }

    try{
        const deletedUser = await prisma.products.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({msg:"Success deleted account"},{status:200})
    }catch(error){
        return NextResponse.json(error)
    }
}