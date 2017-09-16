// your custom app logic goes here:

(function(){

  console.log('Hello Audio Stream')
  var currentUser = null

  var turbo = Turbo({site_id: '59bc88062b047800127690e1'})
  turbo.currentUser(function(err, data){
  	if (err){
  	  console.log('No One Logged In')
  	  return
  	}

    console.log('Current User: ' + JSON.stringify(data))
    currentUser = data.user
    $('#header-username').html(data.user.name)

    var tracksList = ''
    currentUser.tracks.forEach(function(track, i){
      tracksList += '<tr><td style="width:130px"><a target="_blank" href="' + track.url + '" ><img src="/dist/images/icon_play.png" alt="..." /></a></td>'
      tracksList += '<td><h5><a target="_blank" href="' + track.url + '">' + track.name + '</a></h5><p>Uploaded: ' + track.timestamp + '</p></td>'
      tracksList += '<td><h4 class="price">Share</h4></td></tr>'

    })

    console.log('Tracks List: ' + tracksList)

    $('#tracks-table').html(tracksList)

  })

  $('#btn-upload').click(function(event){
  	event.preventDefault()
  	console.log('Upload Track')

  	turbo.uploadFile(function(err, data){
  	  if (err){
  	  	alert('Error: ' + err.message)
  	  	return
  	  }

  	  console.log('Upload Complete: ' + JSON.stringify(data))
      //Upload Complete: {"confirmation":"success","result":{"site":"59bc88062b047800127690e1","name":"themepunch-script-1.mp3","type":"audio/mp3","url":"https://storage.turbo360.co/audio-stream--6xiqee/themepunch-script-1.mp3","size":184864,"timestamp":"2017-09-16T17:13:34.647Z","schema":"blob","id":"59bd5bbe2b047800127690f8"}}

  	  var file = data.result

  	  if (currentUser == null)
  	  	return
      
      //UPDATE CURRENT USER
      var tracks = currentUser.tracks || []
      tracks.push(file)

      turbo.update('user', currentUser, {tracks: tracks}, function(err, data){
      	if(err){
      	  alert('Error: ' + err.message)
      	  return
      	}

      	console.log('USER UPDATED: ' + JSON.stringify(data))
      	currentUser = data.result

	    var tracksList = ''
	    currentUser.tracks.forEach(function(track, i){
	      tracksList += '<tr><td style="width:130px"><a target="_blank" href="' + track.url + '" ><img src="/dist/images/icon_play.png" alt="..." /></a></td>'
	      tracksList += '<td><h5><a target="_blank" href="' + track.url + '">' + track.name + '</a></h5><p>Uploaded: ' + track.timestamp + '</p></td>'
	      tracksList += '<td><h4 class="price">Share</h4></td></tr>'

	    })       	
        $('#tracks-table').html(tracksList)

      })

  	  
  	})
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