
export function likePost(postID){
  const postCards = document.querySelectorAll('.Main-Body-Likes');
  let id = postID;
  for(let i = 0; i < postCards.length; i++){
    if (postCards[i].id == id){ 
      likeSelectedPost(postID);
      return postCards[i].firstChild.nextSibling.textContent++;
    }
  }
} 

function likeSelectedPost(postID){
  const selectedCards = document.querySelectorAll('.Selected-Post-Likes');
  for(let i = 0; i < selectedCards.length; i++){
    if (selectedCards[i].id == postID){
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

function dislikeSelectedPost(input){
    const selectedCards = document.querySelectorAll('.Selected-Post-Likes');
    for(let i = 0; i<selectedCards.length; i++){
      if (selectedCards[i].id == input){
        return selectedCards[i].firstChild.nextSibling.textContent--;
      }
    }
}

export function likeComment(id){
  const commentDivs = document.querySelectorAll(".Selected-Body-Comment-Posts-Like-Parent");
  let cID = id
    for(let i = 0; i < commentDivs.length; i++){
      if (commentDivs[i].id == id){
        return commentDivs[i].firstChild.nextSibling.textContent++;
      }
  }
}

export function dislikeComment(id){
  const commentDivs = document.querySelectorAll(".Selected-Body-Comment-Posts-Like-Parent");
  let cID = id
    for(let i = 0; i < commentDivs.length; i++){
      if (commentDivs[i].id == id){
        return commentDivs[i].firstChild.nextSibling.textContent--;
      }
  }
}

export function clearComment(){
  const comment = document.querySelector('.Selected-Body-Post-Comment');
  return comment.value = '';
}

export function logIntoAccount(e){
  window.scrollTo(0, 0);
  const logInModal = document.querySelector('.Log-In-Modal');
  const modalTitle = document.querySelector('.Log-In-Title');
  const logInButton = document.querySelector('.Log-In-Login');
  const signUpButton = document.querySelector('.Log-In-Signup');
  const userName = document.querySelector('.Log-In-Username');
  const navHeader = document.querySelector('.Nav-Header');
  const smallHeader = document.querySelector(".Main-Header-Bar-Small");
  const largeHeader = document.querySelector(".Main-Header-Bar-Large");
  const mainBody = document.querySelector('.Main-Body-Div');
  const logInChange = document.querySelector('.Log-In-Change-Modal');
  const logInChangeText = document.querySelector('.Log-In-Change-Modal-Text')

  if (e.target.textContent == 'Sign Up' || e.target.textContent == 'SIGN UP'){
    modalTitle.textContent = 'Sign Up';
    logInButton.classList.add('Hidden');
    signUpButton.classList.remove('Hidden')
    userName.classList.remove('Hidden');
    logInChange.textContent = ('LOG IN');
    logInChangeText.textContent = 'Already a Readitor?'
  } else {
    modalTitle.textContent = 'Log In'
    logInChangeText.textContent = 'Not a Readitor yet?'
    logInChange.textContent = 'SIGN UP'
    logInButton.classList.remove('Hidden');
    signUpButton.classList.add('Hidden');
    userName.classList.add('Hidden');
  }
  logInModal.classList.remove('Hidden');
  navHeader.classList.add('Opaque');
  smallHeader.classList.add('Opaque');
  largeHeader.classList.add('Opaque');
  mainBody.classList.add('Opaque')
  document.body.style.overflow = 'hidden';
}

export function closeLogIn(){
  const logInModal = document.querySelector('.Log-In-Modal');
  const navHeader = document.querySelector('.Nav-Header');
  const smallHeader = document.querySelector(".Main-Header-Bar-Small");
  const largeHeader = document.querySelector(".Main-Header-Bar-Large");
  const mainBody = document.querySelector('.Main-Body-Div');
  logInModal.classList.add('Hidden');
  navHeader.classList.remove('Opaque');
  smallHeader.classList.remove('Opaque');
  largeHeader.classList.remove('Opaque');
  mainBody.classList.remove('Opaque')
  document.body.style.overflow = 'auto';
}

