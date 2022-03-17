export const sortFeed = (type) => {
  return (dispatch) => {
    dispatch({
      type:"sort",
      payload:type
    })
  }
}
export const selectCard = (type) => {
  return(dispatch)=>{
    dispatch({
      type:"select",
      payload:type
    })
  }
}


