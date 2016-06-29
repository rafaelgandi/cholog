jQuery(function ($) {
	var $form = $('#cholog_form'),
		$notes = $('#notes'),
		$submit = $('#submit'),
		root = $(document);
	
	function save(_notes, _callback) {
		$.post('/save', {
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
		}
	};
	root.on('submit', '#cholog_form', Events.onSave);
});