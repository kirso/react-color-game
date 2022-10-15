import { useState, useEffect } from 'react'
import './App.css'
const getRandomColor = () => {
	const hex = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
	]

	const color = new Array(6)
		.fill('')
		.map(() => hex[Math.floor(Math.random() * hex.length)])
		.join('')

	return `#${color}`
}

enum Result {
	Correct,
	Wrong,
}

function App() {
	const [color, setColor] = useState<string>('')
	const [answers, setAnswers] = useState<string[]>([])
	const [result, setResult] = useState<Result | undefined>(undefined)

	const generateColors = () => {
		getRandomColor()

		const actualColor = getRandomColor()
		setColor(actualColor)
		setAnswers(
			[actualColor, getRandomColor(), getRandomColor()].sort(
				() => 0.5 - Math.random()
			)
		)
	}

	useEffect(() => {
		generateColors()
	}, [])

	function handleAnswerClicked(answer: string) {
		if (answer === color) {
			setResult(Result.Correct)
			generateColors()
		} else {
			setResult(Result.Wrong)
		}
	}

	return (
		<div className='wrapper'>
			<div className='color-wrapper' style={{ background: color }}></div>
			<div className='btn-wrapper'>
				{answers.map((answer) => (
					<button
						onClick={() => handleAnswerClicked(answer)}
						className='btn'
						key={answer}
					>
						{answer}
					</button>
				))}
			</div>

			{result === Result.Wrong && <div className='wrong'>Wrong answer!</div>}
			{result === Result.Correct && <div className='right'>Correct Answer</div>}
		</div>
	)
}

export default App
