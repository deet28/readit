
const reducer = (state = 'Hot', action) => {
  switch (action.type){
    case "sort":
      return action.payload;
    default:
      return state
  }
}

export default reducer;