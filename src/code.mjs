import helene from '@muze-nl/helene'
import heleneCSS from '@muze-nl/helene/src/helene.css' // use `esbuild loader:.css=text`

export default {
	css: {
		helene: heleneCSS
	},
	actions: {
		codeEdit: async function(textarea) {
			if (!textarea.dataset.simplyActivated) {
				textarea.dataset.simplyActivated = true
				return helene({
					textarea
				})
			}
		}
	}
}