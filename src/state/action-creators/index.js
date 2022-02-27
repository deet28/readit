
export const sortFeed = (type) => {
  return (dispatch) => {
    dispatch({
      type:"sort",
      payload:type
    })
  }
}


