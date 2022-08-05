import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Home() {

  const [items, setItems] = useState([])

  useEffect(() => {
    if (!items.length) {
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

  const move = (value) => {
    const index = items.findIndex(el => el === value)
    const emptyIndex =
      items[index + 1] === '' ? index + 1 :
      items[index - 1] === '' ? index - 1 :
      items[index + 4] === '' ? index + 4 :
      items[index - 4] === '' ? index - 4 : -1
    if (emptyIndex >= 0) {
      setItems(items => moveElems(items, index, emptyIndex));
    }
  }
  
  const moveElems = (arr, one, two) => {
    arr[one] = [arr[two], arr[two] = arr[one]][0];
    console.log(arr)
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
      <div className={styles.grid}>
        {
          items.map((el) =>
            <div
              key={el}
              className={!el ? styles.grid__null : styles.grid__item}
              onClick={() => { move(el) }}
            >
              {el}
            </div>
          )
        }
      </div>
    </div>
  )
}
