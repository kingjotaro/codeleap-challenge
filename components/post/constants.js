 export default function constants(postData, currentPage, postsPerPage) {
    
  

  let total = postData.length;
  let indexOfLastPost = total - (currentPage - 1) * postsPerPage;
  let indexOfFirstPost = Math.max(indexOfLastPost - postsPerPage, 0);
  let currentPosts = postData.slice(indexOfFirstPost, indexOfLastPost).reverse();

  return currentPosts
 };
 
 
  