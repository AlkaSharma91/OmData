import Button from '@restart/ui/esm/Button';
import React from 'react'
import { useSelector } from 'react-redux'

function SubtotalComp() {
    const state = useSelector(state => state.cart)
     let subtotal=0;
    let arr= state.items.map((item)=>{
        
             subtotal=subtotal+item.price
             return;
         
         
     })

    return (
        <div>
          
             subtotal:{subtotal}
             <Button>Proceed to buy</Button>
             </div>
           
            
        
        
    )
}

export default SubtotalComp
