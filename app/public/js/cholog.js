jQuery(function ($) {
	var $form = $('#cholog_form'),
		$notes = $('#notes'),
		$submit = $('#submit'),
		root = $(document);
	
	
	// Check if on mobile and inside an iframe, then redirect to the openshift site.
	// See: http://stackoverflow.com/a/14301832
	if ((typeof window.orientation !== 'undefined') && (window.self !== window.top)) {
		window.top.location.href = 'http://cholog-rafaelgandi.rhcloud.com/';
	}		

	var pusher = new Pusher(window.CHOLOG.pusherKey, {
      encrypted: true
    });
	var channel = pusher.subscribe(window.CHOLOG.realtimeChannel);

	function save(_notes, _callback) {
		$.post(window.CHOLOG.saveUri, {
			notes: _notes
		}, function (res) {
			if (!! res.error) {
				alert('Something went wrong');
			}
			_callback(res);
		});
	}	
		
	var Events = {
		onSave: function (e) {
			e.preventDefault();
			var $me = $(this);
			$notes.attr('disabled', true);
			$submit.text('Saving...').attr('disabled', true);
			save($notes.val(), function (res) {
				if (! res.error) {
					// on success
				}
				$notes.attr('disabled', false);
				$submit.text('Save').attr('disabled', false);
			});
			return false;
		},
		
		Rt: {
			onNewNote: function(data) {
				$('#notes').val(data.notes);
			}
		}
	};
	root.on('submit', '#cholog_form', Events.onSave);
	channel.bind('save', Events.Rt.onNewNote);
});