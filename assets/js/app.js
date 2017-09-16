// your custom app logic goes here:

(function(){

  console.log('Hello Audio Stream')

  var turbo = Turbo({site_id: '59bc88062b047800127690e1'})

  var visitor = {
  	name: '',
  	email: '',
  	password: ''
  }

  $('#button-join').click(function(event){
  	event.preventDefault()
  	console.log('Join button tapped')
  })

})()