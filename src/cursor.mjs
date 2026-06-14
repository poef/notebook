import {
	offsetToPosition,
	getVisualLines,
	findLineIndex,
	findClosestOffsetInLine
} from 'note/src/selection.mjs'

export function sameLine(a, b)
{
	return a &&
		b &&
		a.start === b.start &&
		a.end === b.end
}

export function handleArrowUp(note, previousNote=null, desiredX=null)
{
	const selection = note.selection.get()

	if (!selection) {
		return false
	}

	const offset = selection.focus

	const lines = note.selection.getVisualLines()

	const lineIndex = findLineIndex(lines, offset)

	if (lineIndex === -1) {
		return false
	}
	
	// Previous line in same note.
	if (lineIndex > 0) {
		return false // allow browser to do its normal thing
	}

	const caretPosition = offsetToPosition(note.editor, offset)

	const previousLines = previousNote.selection.getVisualLines()

	const lastLine = previousLines[previousLines.length - 1]
	if (!lastLine) {
		return false
	}

	if (desiredX === null) {
		desiredX = caretPosition.left
	}

	previousNote.editor.focus()
	const targetOffset = findClosestOffsetInLine(lastLine, desiredX)

	previousNote.selection.set({focus:targetOffset})

	return true
}

export function handleArrowDown(note, nextNote=null, desiredX=null)
{
	if (!nextNote) {
		return false
	}

	const selection = note.selection.get()
	if (!selection) {
		return false
	}

	const offset = selection.focus

	const lines = note.selection.getVisualLines()
	
	const lineIndex = findLineIndex(lines, offset)
	if (lineIndex === -1) {
		return false
	}

	const caretPosition = offsetToPosition(note.editor,	offset)
	if (lineIndex < lines.length - 1) {
		return false
	}

	const nextLines = nextNote.selection.getVisualLines()
	if (!nextLines.length) {
		return false
	}
	const firstLine = nextLines[0]

	if (desiredX === null) {
		desiredX = caretPosition.left
	}

	nextNote.editor.focus()
	const targetOffset = findClosestOffsetInLine(firstLine, desiredX)

	nextNote.selection.set({focus: targetOffset})

	return true
}
