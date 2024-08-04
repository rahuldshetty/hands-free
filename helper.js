const createMessage = (delivery, content) => {
    var messageList = document.getElementById('messages');

    // Create Avatar
    const imageTag = document.createElement('img');
    imageTag.classList.add('avatar');
    if (delivery == 'received'){
        // Bot
        imageTag.src = 'https://robohash.org/robocop'
    } else {
        // User
        imageTag.src = 'https://avatar.iran.liara.run/public/10'
        imageTag.style.marginLeft = '10px';
    }
    
    // Create inner Content Div
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    contentDiv.textContent = content;

    // Create Message Div
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(delivery);

    if (delivery == 'received'){
        // Bot
        messageDiv.appendChild(imageTag);
    }
    messageDiv.appendChild(contentDiv);
    if (delivery == 'sent'){
        // User
        messageDiv.appendChild(imageTag);
    }

    messageList.appendChild(messageDiv);

    window.scrollTo(0,document.body.scrollHeight);
    
    // console.log(content);
    // console.log(messageDiv, messageList, contentDiv)
}