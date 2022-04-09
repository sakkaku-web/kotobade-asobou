import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { JapaneseWordle } from './game-components/JapaneseWordle'

// ReactDOM.render(
//   <React.StrictMode>
//     <JapaneseWordle word="test" maxAttempts={10} />
//   </React.StrictMode>,
//   document.getElementById('root')
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

export * from './game-components'
