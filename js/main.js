
function createElemWithText (elementName = "p", textContent = "", className) {
    const newElement = document.createElement(elementName);
    newElement.textContent = textContent;
     
      //checks if class name was given
    if(className){
    newElement.classList.add(className);
    }
    
    return newElement;
    
    }
    
    function createSelectOptions (jsonData){
      if(!jsonData) return;
        const optionElements = [];
        for(const user of jsonData){
          const optionElem = document.createElement("option");
          optionElem.value = user.id;
          optionElem.textContent = user.name;
          optionElements.push(optionElem);
        }
        
        return optionElements;
       
     
     
    }
    
    
    function toggleCommentSection(postID){
      if (!postID) return;
        const commenSection = document.querySelector(`section[data-post-id= '${postID}']`);
        //checks if a section exists and was selected with given postID
        if(commenSection){
          commenSection.classList.toggle("hide");
          return commenSection;
        }else{
          return null;
        }
     
    
    }
    
    function toggleCommentButton(postID){
      if (!postID) return;
     
        const commentButton = document.querySelector(`button[data-post-id= '${postID}']`);
        //checks if a button exists and was selected with given postID
        if(commentButton){
          let buttonText = commentButton.textContent;
          buttonText === "Show Comments" ? commentButton.textContent = "Hide Comments" : commentButton.textContent = "Show Comments";
          return commentButton;
        }else{
          return null;
        }
     
    
    }
    
    
    function deleteChildElements (parentElement){
      //checks that passed parameter is an HTML element
      if(parentElement instanceof Element){
        let childElement = parentElement.lastElementChild;
        while(childElement){
          parentElement.removeChild(childElement);
          childElement = parentElement.lastElementChild;
       
        }
     
        return parentElement;
     
      }else{
        return undefined;
      }
     
    }
    
    function addButtonListeners(){
      const mainButtons = document.querySelectorAll('main button');
     
      if(mainButtons?.length){
       
     
        for(const button of mainButtons){
          if(button.hasAttribute("data-post-id")){
            let buttonPostId = button.dataset.postId;
            button.addEventListener("click", function(event) {toggleComments(event, buttonPostId)}, false);
          }else{
            continue;
          }
         
        }
       
        return mainButtons;
       
      }else{
       
        return mainButtons;
       
      }
    
    }
    
    
    function removeButtonListeners(){
      const mainButtons = document.querySelectorAll('main button');
       
        for(const button of mainButtons){
          let hasAttribute = button.hasAttribute("data-post-id");
        if(button.hasAttribute("data-post-id")){
            let buttonPostId = button.dataset.postId;
            button.removeEventListener("click", function(event) {toggleComments(event, buttonPostId)}, false);
          }else{
            continue;
          }
       
      }
     
      return mainButtons;
     
    }
    
    function createComments(commentsData){
      if(!commentsData) return;
       
        const fragmentElement = document.createDocumentFragment();
       
        //goes through each comment and creates and article, h3, and two p elements that get appended to the fragment
        for(const comment of commentsData){
          let articleElement = document.createElement("article");
          const h3Element = createElemWithText("h3", comment.name);
          const pBodyElement = createElemWithText("p", comment.body);
          const pEmailElement = createElemWithText("p", `From: ${comment.email}`);
          articleElement.append(h3Element);
          articleElement.append(pBodyElement);
          articleElement.append(pEmailElement);
          fragmentElement.append(articleElement);

        }
       
        return fragmentElement;
    }
    
    function populateSelectMenu(usersData){
      if(!usersData) return;
        const selectMenuElement = document.querySelector("#selectMenu");
        const optionElements = createSelectOptions(usersData);
        for (let i = 0; i < optionElements.length; i++){
          selectMenuElement.append(optionElements[i]);
        }
     
        return selectMenuElement;
       
     
       
    }
    
    async function getUsers(){
      try{
        const userData = await fetch("https://jsonplaceholder.typicode.com/users");
        if(!userData.ok){
          throw new Error("the User data was not received");
        }
       
        return await userData.json();
       
      }catch(err){
       
        console.error(err);
       
      }
     
    }
    
    async function getUserPosts(userID){
      if(!userID) return;
     
        try{
        const specifiedUserPostData= await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userID);
        if(!specifiedUserPostData.ok){
          throw new Error("User's post data was not recived");
        }
       
        return await specifiedUserPostData.json();
       
        }catch(err){
          console.error(err);
        }
     
     
     
    }
    
    async function getUser(userID){
      if(!userID)return;
     
        try{
        const specifiedUserData= await fetch("https://jsonplaceholder.typicode.com/users/" + userID);
        if(!specifiedUserData.ok){
          throw new Error("User's data was not recived");
        }
       
        return await specifiedUserData.json();
       
        }catch(err){
          console.error(err);
        }
     
    }
    
    async function getPostComments(postID){
      if(!postID) return;
        try{
        const postCommets= await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + postID);
        if(!postCommets.ok){
          throw new Error("Post comments were not recived");
        }
       
        return await postCommets.json();
       
        }catch(err){
          console.error(err);
        }
     
    }
    
    async function displayComments(postID){
      if(!postID) return;
        const commentsSection = document.createElement("section");
        commentsSection.dataset.postId = postID;
        commentsSection.classList.add("comments");
        commentsSection.classList.add("hide");
        const comments = await getPostComments(postID);
        const fragment = await createComments(comments);
        commentsSection.append(fragment);
        return commentsSection;
       
     
     
     
    }
    
    async function createPosts(postsData){
      if(!postsData) return;
       
        const fragment = document.createDocumentFragment();
         
        for(const post of postsData){
            let postArticle = document.createElement("article");
            const postH2 = createElemWithText("h2", post.title);
            const postBody = createElemWithText("p", post.body);
            const postIdP = createElemWithText("p", `Post ID: ${post.id}`);
            let author = await getUser(post.userId);
            const authorP = createElemWithText("p", `Author: ${author.name} with ${author.company.name}`);
            const companyTaglineP = createElemWithText("p", `${author.company.catchPhrase}`);
            const postButton = createElemWithText("button", "Show Comments");
            postButton.dataset.postId = post.id;
            postArticle.append(postH2);
            postArticle.append(postBody);
            postArticle.append(postIdP);
            postArticle.append(authorP);
            postArticle.append(companyTaglineP);
            postArticle.append(postButton);
            let section = await displayComments(post.id);
            postArticle.append(section);
            fragment.append(postArticle);
        }
         
       
       
        return fragment;
       
     
    }
    
    async function displayPosts(posts){
     
      const mainElement = document.querySelector("main");
      let element = (posts) ? await createPosts(posts) : createElemWithText("p", "Select an Employee to display their posts.", "default-text");
      mainElement.append(element);
      return element;
    
     
    }
    
    function toggleComments(event, postId){
      if(!(event && postId)) return;
        let sectionButtonArray = []
        event.target.listener = true;
        sectionButtonArray.push(toggleCommentSection(postId));
        sectionButtonArray.push(toggleCommentButton(postId));
        return sectionButtonArray;
     
     
    }
    
    async function refreshPosts(data){
      if(!data) return;
    
        let mainElement = document.querySelector("main");
        let removedButtons = removeButtonListeners();
        mainElement = deleteChildElements(mainElement);
        let displayedPosts = await displayPosts(data)
        let addedButtons = addButtonListeners();
        return [removedButtons, mainElement, displayedPosts, addedButtons];
     
    }
    
    async function selectMenuChangeEventHandler(event){
    
      if(event?.type != "change") return;
     
      let userId = event?.target?.value || 1;

      if (userId = "Employees"){
        userId = 1;
      }

      let selectMenu = event.target; 

      if(selectMenu != undefined){
        selectMenu.disabled = true;
      }
      
     
      let posts = await getUserPosts(userId);
     
      let refreshPostsArray = await refreshPosts(posts);

      if(selectMenu != undefined){
        selectMenu.disabled = false;
      }
     
      return [userId, posts, refreshPostsArray];
     
    }
    
    async function initPage(){
     
      let userJson = await getUsers();
     
      let selectElement = populateSelectMenu(userJson);
     
      return [userJson, selectElement];
     
     
    }
    
    function initApp(){
     
      initPage();
     
      const selectMenu = document.querySelector("#selectMenu");
     
      selectMenu.addEventListener("change", selectMenuChangeEventHandler, false);
     
     
    }
    
    document.addEventListener("DOMContentLoaded", (event) =>{
      initApp();
    });
    