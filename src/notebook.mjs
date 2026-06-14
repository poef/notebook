import "simplyview"
import "simplyflow"
import "@muze-nl/metro"
import theds from "@muze-nl/theds"
import notes from './notes.mjs'
import codeEditor from './code.mjs'
import noteEditor from './note.mjs'
import { moveUp, moveDown } from './cursor.mjs'

const notebook = simply.app({
	routes: {
	},
	keys: {
		note: {
			'enter': (evt) => { // this will refer to Note
				notebook.actions.splitNote.call(notebook)
			},
			ArrowDown: (evt) => {
				const note = evt.target.closest('.block')
				let nextNote = note.nextElementSibling;
				while (nextNote && !nextNote.classList.contains('block')) {
				    nextNote = nextNote.nextElementSibling
				}
				return notebook.actions.moveDown.call(notebook, note, nextNote)
			},
			ArrowUp: (evt) => {
				const note = evt.target.closest('.block')
				let prevNote = note.previousElementSibling;
				while (prevNote && !prevNote.classList.contains('block')) {
				    prevNote = prevNote.nextElementSibling
				}
				return notebook.actions.moveUp.call(notebook, note, prevNote)
			},
			ArrowLeft: (evt) => notebook.actions.ClearCursorCache(),
			ArrowRight: (evt) => notebook.actions.ClearCursorCache()
		}
	},
	commands: {
	},
	actions: {
		splitNote: function(note, position) {
			// get contents after position -> note api
			// remove those from current note -> note api
			// create new note after current
			// add contents to that -> note api
		},
		mergeNotePrev: function(note, prev) {
			// check that previous entry is also a note
			// get contents of note
			// append these contents to the content of the previous note
			// remove note
		},
		mergeNoteNext: function(note, next) {
			// check that next entry is also a note
			// get contents of next note
			// append these to the content of this note
			// remove the next note
		},
		ClearCursorCache: function() {
			delete this.state.desiredX
			return false
		},
		moveDown: function(note, nextNote) {
			if (!this.state.desiredX) {
				const offset = note.noteEditor.selection.get()?.focus
				if (typeof offset !== 'undefined') {
					const pos = note.noteEditor.selection.offsetToPosition(offset)
					this.state.desiredX = pos.left
				}
			}
			return moveDown(note.noteEditor, nextNote?.noteEditor, this.state.desiredX)
		},
		moveUp: function(note, prevNote) {
			if (!this.state.desiredX) {
				const offset = note.noteEditor.selection.get()?.focus
				if (typeof offset !== 'undefined') {
					const pos = note.noteEditor.selection.offsetToPosition(offset)
					this.state.desiredX = pos.left
				}
			}
			return moveUp(note.noteEditor, prevNote?.noteEditor, this.state.desiredX)
		}
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
				simply.activate.addListener('code', async function() {
					const editor = await notebook.actions.codeEdit(this)
					this.noteEditor = editor
					this.addEventListener('input', function() {
						delete notebook.state.desiredX
						delete notebook.state.visualLines
					})
				})

				simply.activate.addListener('note', async function() {
					const editor = await notebook.actions.noteEdit(this)
					this.noteEditor = editor
					Object.assign(editor.keyboard, notebook.keys.note);
					this.addEventListener('input', function() {
						delete notebook.state.desiredX
						delete notebook.state.visualLines
					})
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
