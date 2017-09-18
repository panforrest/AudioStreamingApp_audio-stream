(function(){

  var stations = {}
  var slectedStations = null

  var selectStation = function(event){
    event.preventDefault()
    selectedStation = stations[event.target.id]
    console.log('Select Station: ' + JSON.stringify(selectedStation))

    $('selected-station-name').html(selectedStation.name)

    $('#btn-toggle').click()
  }

  

  var turbo = Turbo({site_id: '59bc88062b047800127690e1'})

  turbo.fetch('user', null, function(err, data){
    if (err){
      return
    }

    console.log('USERS: ' + JSON.stringify(data))
    users = data.results

    var stationsHtml = ''
    users.forEach(function(user, i){
    	var numTracks = (user.tracks) ? user.tracks.length : 0

	    stationsHtml += '<div class="col-12 col-md-4"><div class="pricing-1">'
	    stationsHtml += '<p class="plan-name">' + user.name + '</p><br>'
	    stationsHtml += '<img style="width:120px;height:120px;border-radius:60px" src="' + user.image + '=s120-c" /><hr />'
	    stationsHtml += '<small>' + numTracks + ' tracks</small><br>'
	    stationsHtml += '<small>Basic support</small><br>'
	    stationsHtml += '<small>Sync to cloud database</small><br><br>'
	    stationsHtml += '<p class="text-center py-3"><a id="'+ user.id +'" class="btn btn-primary" href="#">View tracks</a></p></div></div>'
      stations[user.id] = user
      
      setTimeout(function(){

        $('#'+user.id).click(selectStation)
        //   event.preventDefault()
        //   console.log('Select Station: ' + event.target.id)
        // })


      }, 500)
    })

    $('#stations').html(stationsHtml) 

  })

})()