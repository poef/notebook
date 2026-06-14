import "simplyview"
import "simplyflow"
import "@muze-nl/metro"
import theds from "@muze-nl/theds"
import notes from './notes.mjs'
import codeEditor from './code.mjs'
import noteEditor from './note.mjs'

const notebook = simply.app({
	routes: {
	},
	keys: {
		'Control-Alt-h': function() {
			this.actions.help()
			return false
		}
	},
	commands: {
	},
	actions: {
	},
	state: simply.state.signal({
	}),
	hooks: {
		start: async function() {
			this.state.notes = await this.api.notes()

			simply.bind({
				root: this.state
			})
			setTimeout(() => {
				simply.activate.addListener('code', function() {
					notebook.actions.codeEdit(this)
				})

				simply.activate.addListener('note', function() {
					notebook.actions.noteEdit(this)
				})
			})
		}
	},
	api: metro.jsonApi(
		window.location.href,
		{
			notes: function() {
				return this.get('notes.json')
			}
		}
	),
	components: {
		theds,
		notes,
		codeEditor,
		noteEditor
	}
})



export default notebook
