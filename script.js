post ={
author : "aboba enjoyer",
author_icons : "posts/post_pictures/bochii.jpg",
placement: "Moscow, Russia",
text : "hello, today i want share with you some my picture",
picture: "posts/post_pictures/tayler.png",
like_counter: 491
}
IsOpenComm = false
const printBlock = document.querySelector('#full_comment');
IsLiked = Boolean(localStorage.getItem('IsLiked'));
Filter = new RegExp(/r"\d+"/g)

if (Array(localStorage.getItem('input_comments')) == 0){
    input_comments = comments
}else{
    //input_comments = comments
    input_comments = TakeFromLocalStorage(localStorage.getItem('input_comments'))
}

if (Number(localStorage.getItem('likes_count')) == 0 && !parsed){
    like_counter = 491
    parsed = true
}else{
    like_counter = Number(localStorage.getItem('likes_count'));
    parsed = false
}

document.getElementById("like_button").onclick = ()=>{
    if (IsLiked){
        like_counter--
        document.getElementById('like_counter').innerHTML = `${like_counter} likes`
        document.getElementById('like_pic').src = "/inst mini app/posts/post_pictures/unliked.png"
        IsLiked = false;
        localStorage.clear();
        localStorage.setItem('likes_count',like_counter)
        return IsLiked
    }else{
        like_counter++
        document.getElementById("like_counter").innerHTML = `${like_counter} likes`
        document.getElementById('like_pic').src = "/inst mini app/posts/post_pictures/liked.png"
        IsLiked= true;
        localStorage.clear();
        localStorage.setItem('IsLiked' , true)
        localStorage.setItem('likes_count',like_counter)
        return IsLiked
    }   
}
function SaveInLocalStorage(array){
    str = ``
    for ( i in array){
        str = str + `${Object.keys(array[i])}:'${Object.values(array[i])}';`
        
    }
    console.log(str)
    return str
}
function TakeFromLocalStorage(str){
    array = String(str).split(';')
    array_filtred = []
    for (i in array)
        array_filtred.push(array[i].split(':')) 
    array = []
    for (i in array_filtred){
        array.push(array_filtred[i].reduce(function(result, item, index, array) {
            result[array[0]] = array[1]; //a, b, c
            return result;
          }, {}))
    }
    console.log(array.slice(0,-1))
    return array.slice(0,-1)
}
 
const SendComment = function(){
    comment_input = document.getElementById('input_comment').value
    
    input_comments.push({Decoy:comment_input})
    localStorage.setItem('input_comments',SaveInLocalStorage(input_comments))
    console.log(TakeFromLocalStorage(localStorage.getItem('input_comments')))
    document.getElementById('full_comment').innerHTML = ''
    for (i in input_comments){
        message = `${Object.keys(input_comments[input_comments.length -1 - i])} : ${Object.values(input_comments[input_comments.length -1  - i])} <br>`
        printBlock.insertAdjacentHTML('beforeEnd',message)
    }
    printBlock.insertAdjacentHTML('beforeEnd',enter_place)
    document.getElementById('send_comment').onclick = SendComment
}

document.getElementById('comment').onclick = ()=>{
    document.getElementById('last_comment').innerHTML = ' '
    enter_place = `
    <input type='text' id='input_comment' placeholder='Say hello'>
    <button id='send_comment'>send</button>
    `
    if (!IsOpenComm){
        for (i in input_comments){
            message = `${Object.keys(input_comments[input_comments.length -1 - i])} : ${String(Object.values(input_comments[input_comments.length -1  - i])).replace(/['"]+/g, '')} <br>`
            printBlock.insertAdjacentHTML('beforeEnd',message)
        }
        IsOpenComm = true
        printBlock.insertAdjacentHTML('beforeEnd',enter_place)

        document.getElementById('send_comment').onclick = SendComment
    }else{
        IsOpenComm = false
        document.getElementById('full_comment').innerHTML = ' '
        document.getElementById('last_comment').innerHTML = `${Object.keys(input_comments[input_comments.length-1])} : ${String(Object.values(input_comments[input_comments.length-1])).replace(/['"]+/g, '')}`
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("like_counter").innerHTML = `${like_counter} likes`    
    if (!IsLiked){
        document.getElementById('like_pic').src = "/inst mini app/posts/post_pictures/unliked.png"
    }else if (IsLiked){
        document.getElementById('like_pic').src = "/inst mini app/posts/post_pictures/liked.png" 
    }

    document.getElementById('last_comment').innerHTML = `${Object.keys(input_comments[input_comments.length-1])} : ${String(Object.values(input_comments[input_comments.length-1])).replace(/['"]+/g, '')}`
})




