
export function likePost(postID){
  const postCards = document.querySelectorAll('.Main-Body-Likes');
  for(let i = 0; i < postCards.length; i++){
    if (postCards[i].id == postID){
      return postCards[i].firstChild.nextSibling.textContent++;
    }
  }
} 

export function dislikePost(postID){
  const postCards = document.querySelectorAll('.Main-Body-Likes');
  for(let i = 0; i < postCards.length; i++){
    if (postCards[i].id == postID){
      return postCards[i].firstChild.nextSibling.textContent--;
      }
    }
  }

export function clearComment(){
  const comment = document.querySelector('.Selected-Body-Post-Comment');
  return comment.value = '';
}

