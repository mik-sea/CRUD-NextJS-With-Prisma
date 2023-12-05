"use client"

import {SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation";

export default function AddProduct(){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();
    async function handleSubmit(e: SyntheticEvent){
        e.preventDefault();
        setIsMutating(true);
        const response = await fetch('/api/tambahData',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title:title,
                price:parseInt(price)
            })
        })
        const resp = await response;
        if(resp.ok){
            setIsMutating(false);
            setTitle("");
            setPrice("");
            router.refresh();
            setModal(false);
        }
    }

    function handleChange(){
        setModal(!modal);
    }


    return (
        <div>
            <button className="btn" onClick={handleChange}>Add New</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Title</label>
                            <input type="text" className="input w-full input-bordered" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Product Name"/>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input type="text" className="input w-full input-bordered" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price"/>
                        </div>
                        <div className="modal-action">
                            <button type="button" onClick={handleChange} className="btn">Close</button>
                            {
                                !isMutating ? (
                                    <button type="submit" className="btn btn-primary">Save</button>
                                ):(
                                    <button type="button" className="btn loading">Saving...</button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}