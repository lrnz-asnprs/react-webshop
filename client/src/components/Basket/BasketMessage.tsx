import React from "react";

type MessProps = {
  name: string
  logged: boolean
}


export function BasketMessage({name, logged} : MessProps) {
  if(name.length === 0 || !logged) {
    return(
    <h1 style={{textAlign: "center", paddingBottom: "20px"}}>Check out your shopping cart!</h1>
    )
  }
  return (
    <h1 style={{textAlign: "center"}}>Ready to check out, {name}?</h1> 

  )
}