import {useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shuffle } from 'lucide-react'

type MemoryCard = {
  id: number,
  content: string,
  flipped: boolean,
  matched: boolean
}

const memoryCards: MemoryCard[] = [
  { id: 1, content: '🐶', flipped: false, matched: false },
  { id: 2, content: '🐱', flipped: false, matched: false },
  { id: 3, content: '🐭', flipped: false, matched: false },
  { id: 4, content: '🐹', flipped: false, matched: false },
  { id: 5, content: '🐰', flipped: false, matched: false },
  { id: 6, content: '🦊', flipped: false, matched: false },
  { id: 7, content: '🐶', flipped: false, matched: false },
  { id: 8, content: '🐱', flipped: false, matched: false },
  { id: 9, content: '🐭', flipped: false, matched: false },
  { id: 10, content: '🐹', flipped: false, matched: false },
  { id: 11, content: '🐰', flipped: false, matched: false },
  { id: 12, content: '🦊', flipped: false, matched: false },
]

const  App = () => {
  const [cards, setCards] = useState<MemoryCard[]>(memoryCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    shuffleCards()
  }, [])

  const shuffleCards = () => {
    const shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([])
    setMoves(0)
  }

  const handleCardSelect = (card: MemoryCard) => {
    if((card.flipped || card.matched) || flippedCards.length === 2) {
      return;
    }

    setCards(currentCards => {

      return currentCards.map(cardItem => {
        console.log("🚀 ~ handleCardSelect ~ cardItem:", cardItem)
        return cardItem.id === card.id ?  {...cardItem, flipped: true} : cardItem
      });
    })

    setFlippedCards(currentFlippedCards => [...currentFlippedCards, card.id]);

    if(flippedCards.length === 1) {
      setMoves(currentMove => currentMove + 1)

      const firstCard = cards.find(cardItem => cardItem.id === flippedCards[0])
      const secondCard = cards.find(cardItem => cardItem.id === card.id)

      if (firstCard?.content === secondCard?.content) {

        setCards(currentCards => currentCards.map(cardItem => {
          return cardItem.id === flippedCards[0] || cardItem.id === card.id ? {...cardItem, matched: true} : cardItem;
        }));
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(currentCards => currentCards.map(cardItem =>
            cardItem.id === flippedCards[0] || cardItem.id === card.id ? { ...cardItem, flipped: false } : cardItem
          ));

          setFlippedCards([])
        }, 1000)
      }

    }
  }

  const allMatched = cards.every(card => card.matched);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-primary">Memory Game</h1>
      <div className="mb-4 flex justify-between items-center w-full max-w-md">
       <Button onClick={shuffleCards} variant="outline" size="icon">
        <Shuffle className="h-4 w-4" />
        <span className="sr-only">Click me</span>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 max-w-md w-full">
        {cards.map(card => {
          return (
            <Card key={card.id}
            className={`h-24 flex items-center justify-center text-4xl cursor-pointer transition-all duration-300 ${
              card.flipped ? 'bg-primary text-primary-foreground' : 'bg-secondary'
            } ${card.matched ? 'opacity-50' : ''}`}
            onClick={() => handleCardSelect(card)}
            >
              {card.flipped || card.matched ? card.content : ''}
            </Card>
          )
        })}
      </div>
      {allMatched ? (
        <p className="mt-8 text-2xl font-bold text-primary">Congratulations! You won in {moves} moves!</p>
      ) : null}
    </div>
  )
}

export default App;
