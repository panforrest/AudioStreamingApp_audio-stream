// your custom app logic goes here:

(function(){

  console.log('Hello Audio Stream')

  var turbo = Turbo({site_id: '59bc88062b047800127690e1'})
  turbo.currentUser(function(err, data){
  	if (err){
  	  console.log('No One Logged In')
  	  return
  	}

    // console.log('Current User: ' + JSON.stringify(data))
    $('#header-username').html(data.user.name)

  })

  $('#btn-upload').click(function(event){
  	event.preventDefault()
  	console.log('Upload Track')
  })

  $('#button-join').on('click', function(event){ //SHORTCUT $('#button-join').click(function(event){
  	event.preventDefault()

    var visitor = {
  	  name: $('#input-name').val(),
  	  email: $('#input-email').val(),
      password: $('#input-password').val()
  	}

    if (visitor.name.length == 0){
    	alert('Please enter your name')
    	return
    }

    if (visitor.email.length == 0){
    	alert('Please enter your email')
    	return
    }

    if (visitor.password.length == 0){
    	alert('Please enter your password')
    	return
    }
  	
  	turbo.createUser(visitor, function(err, data){
  	  if (err){
  	  	alert('Error: ' + err.message)
  	  	return
  	  }

      console.log('Register: '+JSON.stringify(data))
      window.location.href = '/admin'
  	})

  })

})()