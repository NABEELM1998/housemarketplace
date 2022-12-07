import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection,getDocs, query, where, orderBy , limit,startAfter } 
from "firebase/firestore";
import { db } from "../firebase.config";
import {toast} from 'react-toastify'
import Listingitem from "../components/ListingItem";
const Category = () =>{
    const [listings,SetListings] = useState(null)
    const {categoryName} = useParams();
    const fetchListings = async() => {
       
        try{
             //GEt reference
            const listingsRef = collection(db,'listings')
            //create a Query
            const q = query(
                listingsRef,
                where('type','==',categoryName),
                orderBy('timestamp','desc'),
                limit(10)
                
                )
                //Execute Query
                const querySnap = await getDocs(q)

                let listings = []
                querySnap.forEach((doc)=>{
                    listings.push({
                        id:doc.id,
                        data:doc.data()
                    })
                })
                SetListings(listings)

        }
        catch(error){
            toast.error("Could not fetch listings")
        }
    }
    useEffect(()=>{
        fetchListings();
    },[]) 

    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                    {categoryName === 'rent'?'Places for rent':'places for sale'}
                </p>
            </header>
            {listings && listings.length >0 ? <>
                <main>
                    <ul className="categoryListings">
                        {listings.map((listing)=>{
                            return <Listingitem listing={listing.data} id = {listing.id}/>
                        })}
                    </ul>
                </main>
            
            
            </>:`No places listed for ${categoryName}`}
        </div>
    )
}
export default Category;