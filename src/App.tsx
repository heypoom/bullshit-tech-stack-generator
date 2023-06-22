import {useCallback, useEffect, useState} from 'react'
import {chunk} from 'lodash'
import {motion} from 'framer-motion'

import {
  AlwaysDefect,
  Forgive,
  TitForTat,
  AlwaysCooperate,
  GrimTrigger,
  Random,
} from './simulation/strategies'

import {Strategy} from './@types/Strategy'

import './App.css'

type Move = boolean
type S = Strategy<Move>

const PLAY_ROUNDS = 16

const strategyMap = {
  cooperate: AlwaysCooperate,
  defect: AlwaysDefect,
  'tit for tat': TitForTat,
  'grim trigger': GrimTrigger,
  'forgive(2)': Forgive(2),
  'rand(10%)': Random(0.1),
  'rand(50%)': Random(0.5),
  'rand(80%)': Random(0.8),
} as const satisfies Record<string, S>

type StrategyKey = keyof typeof strategyMap

const strategyKeys = Object.keys(strategyMap) as StrategyKey[]
const defaultStrategies: StrategyKey[] = ['rand(10%)', 'forgive(2)']

const Button = ({
  children,
  className = '',
  onClick,
}: {
  children?: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => (
  <motion.button
    initial={{y: 50}}
    animate={{y: 0}}
    className={`rounded-md ${className} text-2xl px-2 py-1 cursor-pointer`}
    onClick={onClick}
  >
    {children}
  </motion.button>
)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const adjustScroll = () =>
  window.scrollTo({behavior: 'smooth', top: document.body.scrollHeight})

function App() {
  const [game, setGame] = useState<boolean[]>([])
  const [strategies, setStrategies] = useState(defaultStrategies)

  const step = useCallback(
    () =>
      setGame((game) => {
        adjustScroll()

        const strategyKey = strategies[game.length % 2]
        const strategy = strategyMap[strategyKey]
        return [...game, strategy(game)]
      }),
    [strategies]
  )

  const play = useCallback(
    async (rounds: number) => {
      for (let i = 0; i < rounds * 2; i++) {
        await delay(12)
        step()
      }

      adjustScroll()
    },
    [step]
  )

  function handleStrategyChange(strategy: string, player: number) {
    strategies[player] = strategy as StrategyKey
    setStrategies([...strategies])
  }

  const coop = useCallback(() => setGame([...game, true]), [game])
  const defect = useCallback(() => setGame([...game, false]), [game])
  const reset = () => setGame([])

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === 'c') coop()
      if (e.key === 'd') defect()
      if (e.key === 's') step()
      if (e.key === 'p') play(PLAY_ROUNDS)
      if (!Number.isNaN(parseInt(e.key))) play(parseInt(e.key))
      if (e.key === 'r') reset()
    }

    window.addEventListener('keypress', handleKeyPress)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  }, [coop, defect, play, step])

  return (
    <div className="flex items-center justify-content min-h-[100vh] bg-black py-12">
      <div className="flex flex-col w-full justify-center items-center gap-y-4">
        <h1 className="text-3xl font-light pb-3 text-center">
          Prisoner's Dilemma
        </h1>

        {['A', 'B'].map((player, i) => (
          <div className="flex gap-x-2" key={player}>
            <div>Player {player}:</div>

            <select
              value={strategies[i]}
              onChange={(e) => handleStrategyChange(e.target.value, i)}
            >
              {strategyKeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="py-2 max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8 gap-x-6 gap-y-3">
            {chunk(game, 2).map((chunk, i) => (
              <div key={i} className="grid grid-cols-2 gap-x-3">
                {chunk.map((move, j) => (
                  <motion.div
                    key={j}
                    initial={{y: 70}}
                    animate={{y: 0}}
                    className={`
												flex
												text-center rounded-sm w-10 h-10
												${move ? 'bg-blue-500' : 'bg-red-500'}
											`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-[220px]" />

        <div className="flex flex-col items-center justify-center fixed bottom-0 gap-y-4 py-5">
          <div className="flex gap-x-4 h-12">
            <Button
              onClick={coop}
              className="w-12 bg-blue-500 focus:bg-blue-400 hover:bg-blue-600"
            />
            <Button
              onClick={defect}
              className="w-12 bg-red-500 focus:bg-red-400 hover:bg-red-600"
            />
          </div>

          <div className="flex gap-x-4">
            <Button
              onClick={() => play(PLAY_ROUNDS)}
              className="bg-green-600 hover:bg-green-700"
            >
              Play
            </Button>

            <Button
              onClick={step}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Step
            </Button>

            <Button onClick={reset} className="bg-gray-500 hover:bg-gray-600">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
