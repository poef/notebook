import note from 'note'

export default {
	actions: {
		noteEdit: async function(editable) {
			if (!editable.dataset.simplyActivated) {
				editable.dataset.simplyActivated = true
				return note({
					editable
				})
			}
		}
	}
}