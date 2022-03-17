const reducer = (state = '', action) => {
  switch (action.type){
    case "select":
      return action.payload
    default:
      return state;
  }
}

export default reducer;