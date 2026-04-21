import React from 'react'
import Images from 'next/image'
import { useState, useEffect } from 'react'
import { Stack, Autocomplete, TextField, Button } from "@mui/material"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

export default function Responsiveproduceorder({id,produce_name,case_cost,case_size,promo,produce_image,userCurrentOrder,setUserCurrentOrder,stock,count,Quantity,value,setValue,valueQty, setValueQty,increaseProduceItem,deleteQty,index,enterButton,getCurrentBalance}) {

    return(
        <div className='grid grid-rows-1 border border-black rounded'>
            {enterButton && getCurrentBalance(Quantity,case_cost,promo,stock,index,id)}
            <div className='border border-black rounded-full w-1/12 ml-1 mt-1'>
               <p className='text-center text-sm'>
                {count+1}
               </p> 
            </div>
            <div>
                <div className='grid grid-rows-1'>
                    <h1 className='uppercase font-instrument text-xl text-center'>
                        {produce_name}
                    </h1>
                </div>
            </div>

            <div className='grid grid-rows-1 place-items-center'>
                <Images alt={produce_name} src={produce_image} style={{width: "40%", height: "85%" }}/>
            </div>
            <div>
                <p className='text-center font-bold font-sans text-sm'>
                    CASE COST: ${case_cost}
                </p>
            </div>
            <div>
                <p className='text-center font-bold font-sans text-sm'>
                    CASE SIZE: {case_size}
                </p>
  
            </div>
            <div>
                <p className='text-center font-bold text-sm text-red-500 font-sans'>
                    PROMO PRICES: ${promo}
                </p>
            </div>
            <div>
                <p className='text-center text-orange-500 font-bebas text-sm/[17px] font-bold'>  {stock===false && "OUT OF STOCK"}</p>
            </div>

            <div className='flex justify-center border-t-1 border border-black w-full'>
                <div className='flex justify-center w-8/12 mt-2'>
                    <div className='inline-block'>
                    {stock===true ?
                        <Button
                            sx={{
                                fontSize: '0.75rem', // smaller font size
                                padding: '4px 10px', // custom padding
                                minWidth: '42px', // minimum width
                                height: '30px' // specific height
                              }}
                            variant='outlined' 
                            color='primary' 
                            size='small' 
                            onClick={(e)=>deleteQty(e,id,Quantity,case_cost,promo,stock,index)}>
                            <FontAwesomeIcon icon={faTrash} className="text-black text-sm p-1" />
                        </Button>

                        :

                        <Button className='bg-gray-200 opacity-50 cursor-not-allowed'
                            sx={{
                                fontSize: '0.75rem', // smaller font size
                                padding: '4px 10px', // custom padding
                                minWidth: '42px', // minimum width
                                height: '30px' // specific height
                              }}
                            disabled={true}
                            variant='outlined' 
                            color='primary' 
                            size='small' 
                            onClick={(e)=>deleteQty(e,id,Quantity,case_cost,promo,stock,index)}>
                            <FontAwesomeIcon icon={faTrash} className="text-black text-sm p-1" />
                        </Button> 
                
                    }

                    </div>
                        <div className='inline-block w-3/12'>
                            <Stack spacing={4}>
                                <Stack direction='row' spacing={2}>
                                    <TextField
                                          sx={{
                                            '& .MuiInputBase-input': { // Targeting the input element directly
                                              fontSize: '0.8rem', // Decreasing the font size
                                              height:'13px'
                                            }
                                          }} 
                                        className='bg-white' label='QY' size='small' value={Quantity} onChange={e=>setValueQty(e.target.value) }/>
                                </Stack>
                            </Stack>
                        </div>
                        <div className='inline-block'>
                            {stock===true ?  
                            
                                <Button className='text-black text-lg' 
                                        sx={{
                                            fontSize: '0.75rem', // smaller font size
                                            padding: '4px 10px', // custom padding
                                            minWidth: '42px', // minimum width
                                            height: '30px' // specific height
                                            }}
                                    variant='outlined' 
                                    color='primary' 
                                    size='small' 
                                    onClick={e=>increaseProduceItem(e,Quantity,id,case_cost,promo,stock,index)}>
                                    +
                                </Button>

                                :

                                <Button className='text-black text-lg bg-gray-200 opacity-50 cursor-not-allowed'
                                    sx={{
                                        fontSize: '0.75rem', // smaller font size
                                        padding: '4px 10px', // custom padding
                                        minWidth: '42px', // minimum width
                                        height: '30px' // specific height
                                        }}
                                    disabled={true}
                                    variant='outlined' 
                                    color='primary' 
                                    size='small' 
                                    onClick={e=>increaseProduceItem(e,Quantity,id,case_cost,promo,stock,index)}>
                                    +
                            </Button>
                        }

                        </div>
                    </div>            
            </div>

        </div>
    )
}