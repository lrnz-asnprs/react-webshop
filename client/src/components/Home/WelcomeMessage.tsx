import React from "react";

type MessProps = {
  name: string
  logged: boolean
}


export function Message({name, logged} : MessProps) {
  if(name.length === 0 || !logged) {
    return(
    <div style={{textAlign: "center"}}>
    <h1>Welcome to the Food Shop!</h1>
    <h3>Would you like to log in?</h3>
    </div>
    )
  }
  return (
    <div style={{textAlign: "center"}}>
    <h1>Good to see you {name} :-)</h1> 
    <h3>Enjoy shopping!</h3> 
    </div>
  )
}
