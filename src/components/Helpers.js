
export function likePost(postID){
  const postCards = document.querySelectorAll('.Main-Body-Likes');
  
  for(let i = 0; i < postCards.length; i++){
    if (postCards[i].id == postID){ 
      likeSelectedPost(postID)
      return postCards[i].firstChild.nextSibling.textContent++;
    }
   
  }
} 

export function likeSelectedPost(input){
  const selectedCards = document.querySelectorAll('.Selected-Post-Likes');
  for(let i = 0; i<selectedCards.length; i++){
    if (selectedCards[i].id == input){
      return selectedCards[i].firstChild.nextSibling.textContent++;
    }
  }
}

export function dislikePost(postID){
  const postCards = document.querySelectorAll('.Main-Body-Likes');
  for(let i = 0; i < postCards.length; i++){
    if (postCards[i].id == postID){
      dislikeSelectedPost(postID)
      return postCards[i].firstChild.nextSibling.textContent--;
      }
    }
  }

  export function dislikeSelectedPost(input){
    const selectedCards = document.querySelectorAll('.Selected-Post-Likes');
    for(let i = 0; i<selectedCards.length; i++){
      if (selectedCards[i].id == input){
        return selectedCards[i].firstChild.nextSibling.textContent--;
      }
    }
  }

export function clearComment(){
  const comment = document.querySelector('.Selected-Body-Post-Comment');
  return comment.value = '';
}

