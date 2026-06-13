import "simplyview"
import "simplyflow"
import "@muze-nl/metro"
import theds from "@muze-nl/theds"

const demo = simply.app({
	routes: {
		'#demo/:param': function(params) {

		}
	},
	commands: {
		demo: async function(el, value) {
			await this.actions.demo()
		}
	},
	actions: {
		demo: async function() {
			const result = await this.api.demo()
			this.state.demo = result.demo
		}
	},
	state: simply.state.signal({
		demo: 'initial content'
	}),
	hooks: {
		start: async function() {
			simply.bind({
				root: this.state
			})
		}
	},
	api: metro.jsonApi(
		window.location.href,
		{
			demo: function() {
				return this.get('demo.json')
			}
		}
	),
	components: {
		theds
	}
})

export default demo
globalThis.demo = demo