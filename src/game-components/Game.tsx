import { useEffect, useState } from 'react'
import { Grid } from '../components/grid/Grid'
import { useAlert } from '../context/AlertContext'
import { t, WIN_MESSAGES } from '../constants/strings'

import {
  removeShareStatusFromLocalStorage,
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from '../lib/localStorage'
import { Bar } from '../components/keyboard/Bar'
import { Keyboard } from '../components/keyboard/Keyboard'
import { unicodeLength } from '../lib/words'
import GraphemeSplitter from 'grapheme-splitter'
import { toHiragana } from '@koozaki/romaji-conv'
import { REVEAL_TIME_MS } from '../constants/settings'

type Props = {
  word: string
  maxAttempts: number
}

export function Game({ word, maxAttempts }: Props) {
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()

  const [currentGuess, setCurrentGuess] = useState('')
  const [currentInputText, setCurrentInputText] = useState('')
  const [currentRowClass, setCurrentRowClass] = useState('')

  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)

  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== word) {
      removeShareStatusFromLocalStorage()
      return []
    }
    const gameWasWon = loaded.guesses.includes(word)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === maxAttempts && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(t('CORRECT_WORD_MESSAGE', `1`, word), {
        persist: true,
      })
    }
    return loaded.guesses
  })

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution: word })
  }, [guesses, word])

  useEffect(() => {
    const delayMs = REVEAL_TIME_MS * word.length

    if (isGameWon) {
      const winMessage = WIN_MESSAGES.ja[guesses.length - 1]

      showSuccessAlert(winMessage, {
        delayMs,
        // onClose: () => setIsStatsModalOpen(true),
      })
    }

    if (isGameLost) {
      showErrorAlert('残念', { delayMs })
    }
  }, [isGameWon, isGameLost, guesses, showSuccessAlert, showErrorAlert, word])

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= word.length &&
      guesses.length < maxAttempts &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
      setCurrentInputText(`${currentInputText}${value}`)
    }
  }

  const onDelete = () => {
    if (currentGuess === currentInputText) {
      setCurrentGuess(
        new GraphemeSplitter()
          .splitGraphemes(currentGuess)
          .slice(0, -1)
          .join('')
      )
    }
    setCurrentInputText(
      new GraphemeSplitter()
        .splitGraphemes(currentInputText)
        .slice(0, -1)
        .join('')
    )
  }

  const onEnter = () => {
    // convert romaji or katakana input to hiragana
    let currentInputTextInHiragana = toHiragana(currentInputText)
    let currentGuessInHiragana = new GraphemeSplitter()
      .splitGraphemes(currentInputTextInHiragana)
      .slice(0, word.length)
      .join('')

    setCurrentGuess(currentGuessInHiragana)
    setCurrentInputText(currentInputTextInHiragana)

    if (isGameWon || isGameLost) {
      return
    }

    if (currentInputTextInHiragana === '' || currentGuessInHiragana === '') {
      return
    }

    if (!(unicodeLength(currentInputTextInHiragana) === word.length)) {
      return showErrorAlert(
        t('NOT_ENOUGH_LETTERS_MESSAGE', currentInputTextInHiragana)
      )
    }

    if (!(unicodeLength(currentGuessInHiragana) === word.length)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(
        t('NOT_ENOUGH_LETTERS_MESSAGE', currentGuessInHiragana),
        {
          onClose: clearCurrentRowClass,
        }
      )
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    // if (isHardMode) {
    //   const firstMissingReveal = findFirstUnusedReveal(
    //     currentGuessInHiragana,
    //     guesses
    //   )
    //   if (firstMissingReveal) {
    //     setCurrentRowClass('jiggle')
    //     return showErrorAlert(firstMissingReveal, {
    //       onClose: clearCurrentRowClass,
    //     })
    //   }
    // }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * word.length)

    const winningWord = currentGuessInHiragana === word // isWinningWord(currentGuessInHiragana)

    if (
      unicodeLength(currentGuessInHiragana) === word.length &&
      guesses.length < maxAttempts &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuessInHiragana])
      setCurrentGuess('')
      setCurrentInputText('')
      //   saveShareStatusToLocalStorage(isHintMode, isHardMode)

      if (winningWord) {
        // setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === maxAttempts - 1) {
        // setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
        showErrorAlert(t('CORRECT_WORD_MESSAGE', `1`, word), {
          persist: true,
          delayMs: REVEAL_TIME_MS * word.length + 1,
        })
      }
    }
  }

  return (
    <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        isRevealing={isRevealing}
        currentRowClassName={currentRowClass}
        maxRows={maxAttempts}
        columns={word.length}
      />
      <Bar
        onDelete={onDelete}
        onEnter={onEnter}
        setCurrentGuess={setCurrentGuess}
        setCurrentInputText={setCurrentInputText}
        currentInputText={currentInputText}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        isRevealing={isRevealing}
      />
    </div>
  )
}
