import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Home() {

  const [items, setItems] = useState()
  const [win, setWin] = useState(false)
  const [startTime] = useState(Date.now())
  const [finishTime, setFinishTime] = useState('')

  useEffect(() => {
    if (!items) {
      setItems(getRandom())
    }
  }, [items])

  const getRandom = () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const randomized = []
    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * values.length)
      randomized.push(values[randomIndex])
      values.splice(randomIndex, 1)
    }
    return [...randomized, '']
  }

  const move = (event) => {
    const value = +event.target.textContent
    const index = items.findIndex(el => el === value)
    const emptyIndex =
      items[index + 1] === '' ? index + 1 :
      items[index - 1] === '' ? index - 1 :
      items[index + 4] === '' ? index + 4 :
      items[index - 4] === '' ? index - 4 : -1
    if (emptyIndex >= 0) {
      setItems(moveElems(index, emptyIndex));
    }
  }
  
  const moveElems = (one, two) => {
    const arr = items.map(el => el)
    arr[one] = [arr[two], arr[two] = arr[one]][0];
    if (arr.every((el, index) => {
      return +el === index + 1 || index === 15
    })) {
      setFinishTime(Date.now())
      setWin(true)
    }
    return arr
  }

  const getRandomDOM = (arr) => {
    return arr.map((el) => {
      return (
        <div
          key={el}
          className={!el ? styles.grid__null : styles.grid__item}
          onClick={() => { move(el) }}
        >
          {el}
        </div>
      )
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid} onClick={!win ? (event) => {move(event)} : null}>
        { items &&
          items.map((el) => {
            return <div
              key={el}
              className={!el ? styles.grid__null : styles.grid__item}
            >
              {el}
            </div>
          })
        }
      </div>
      {win && 
        <>
          <div className={styles.grid__text}>Win! Refresh the page to start new game</div>
          <div className={styles.grid__text}>{`Your time: ${(finishTime - startTime) / 1000} s`}</div>
        </>
      }
    </div>
  )
}
