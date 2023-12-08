import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function PATCH(req:Request, {params}:{params:{id:string}}){
    const body = await req.json()
    const { id } = params
    const {title, price} = body

    try{
        const user = await prisma.products.update({
            where: { id: Number(id) },
            data: { title: title, price:price },
        });
        return NextResponse.json({msg:"Success Updated account"},{status:200})
    }catch(error){
        return NextResponse.json(error)
    }
}