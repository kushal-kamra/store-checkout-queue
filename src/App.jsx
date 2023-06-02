import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [itemsInPersonCart, setItemsInPersonCart] = useState(0);
  const [lines, setLines] = useState([
    [10, 5, 2],[1],[2],[3],[4]
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prevLines => {
        return prevLines.map(line => {
          return [line[0] - 1, ...line.slice(1)].filter((value) => value > 0);
        })
      })
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  function addPersonToLine(e) {
    e.preventDefault();

    let leastItemsAmount = 1e9;
    let lineWithLeast;

    for (let line of lines) {
      const totalInLine = line.reduce((sum, value) => sum + value, 0);

      if (totalInLine < leastItemsAmount) {
        leastItemsAmount = totalInLine;
        lineWithLeast = line;
      }
    }

    if (!lineWithLeast) return;

    setLines(prevLines => prevLines.map(line => {
      if (line === lineWithLeast) {
        return [...line, itemsInPersonCart];
      } else {
        return line;
      }
    }))
  }

  return (
    <>
      <main className="App">
        <form onSubmit={addPersonToLine}>
          <input
            required
            type="number"
            value={itemsInPersonCart}
            onChange={(e) => setItemsInPersonCart(e.currentTarget.valueAsNumber || 0)}
          ></input>
          <button>Checkout</button>
        </form>
        <div className="lines">
          {lines.map((line, idx) => (
            <div key={idx} className="line">
            {line.map((numberOfItems, index) => (
              <div key={index}>{numberOfItems}</div>
            ))}
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default App;
