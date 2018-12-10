//make connection

var socket = io.connect('http://localhost:4000');

//Get DOM element

var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    typing = document.getElementById('typing');


    //Listen for button events
    btn.addEventListener('click',function(){

    	if(handle.value==null || handle.value==''){
    		document.getElementById('handle_error').innerHTML ='You must enter your username.';
    	}else if(message.value==null || message.value ==''){
    		document.getElementById('message_error').innerHTML='Please enter your message.';
    	}else{
    		socket.emit('chat',{
 			message: message.value,
 			handle: handle.value
    	});
    	}    	       
     });

   //Listen on handle for: keypress event
   handle.addEventListener('keypress',function(){
   	document.getElementById('handle_error').innerHTML='';
   });

   //Listen for typing: keypress event
   message.addEventListener('keypress',function(){   	
   	document.getElementById('message_error').innerHTML='';
   	   socket.emit('typing',handle.value);
   })
   //Listen for not typing: keyUp event
   message.addEventListener('keyup',function(){   	
   	document.getElementById('message_error').innerHTML='';
   	   socket.emit('Notyping','');

   })
    //Socket lsitens and get event data
    socket.on('chat',function(data){  
    // set empty for 'is typing message'  	
    	typing.innerHTML ='';
    	//output data
    	output.innerHTML += '<p style="padding-left: 3px;font-style:italic;"><strong>'+data.handle+':  </strong>'+ data.message+'</p>'
    	message.value ='';
    });

    //show 'is typing message'
    socket.on('typing',function(data){
    	typing.innerHTML = '<p style="color:green;"><em>'+data+' is typing a message....... <em></p>'
    });

    //show 'is not typing message'
    socket.on('Notyping',function(data){
    	typing.innerHTML = '<p style="color:red;"><em> stopped typing<em></p>'
    });