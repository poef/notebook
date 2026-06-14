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

export function moveUp(note, previousNote=null, desiredX=null)
{
	if (!previousNote) {
		return false
	}
	if (!note.selection.moveUp()) {
		if (desiredX === null) {
			const caretPosition = note.selection.getCaretPosition()
			desiredX = caretPosition.left
		}

		const previousLines = previousNote.selection.getVisualLines()
		const lastLine = previousLines[previousLines.length - 1]
		if (!lastLine) {
			return false
		}

		previousNote.selection.setCaretPosition(lastLine, desiredX)
		return true
	}
}

export function moveDown(note, nextNote=null, desiredX=null)
{
	if (!nextNote) {
		return false
	}
	if (!note.selection.moveDown()) {
		if (desiredX === null) {
			const caretPosition = note.selection.getCaretPosition()
			desiredX = caretPosition.left
		}

		const nextLines = nextNote.selection.getVisualLines()
		if (!nextLines.length) {
			return false
		}
		const firstLine = nextLines[0]

		nextNote.selection.setCaretPosition(firstLine, desiredX)
		return true
	}
}
