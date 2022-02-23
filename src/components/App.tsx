import { useEffect, useState } from 'react'
import { PhantomProvider } from '../types/index'

const TEST_IMAGES = [
  'https://cdn.smehost.net/sonymusicru-ruprod/wp-content/uploads/2021/04/RIO-2048x2048.jpg',
  'https://cdn41.zvuk.com/pic?type=release&id=21131874&size=600x600&ext=jpg',
  'https://i.pinimg.com/originals/1c/f4/89/1cf489e7d69adcfb400be621dfa55668.jpg'
]

function App() {
  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  )
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const checkIfWalletIsConnected = async () => {
    try {
      if ('solana' in window) {
        const solanaProvider = window.solana

        if (window.solana.isPhantom) {
          console.log('Phantom wallet found!')
          setProvider(solanaProvider as PhantomProvider)
        }

        const response = await solanaProvider.connect({ onlyIfTrusted: true })
        console.log('Connected with Public Key:', response.publicKey.toString())
        setWalletAddress(response.publicKey.toString())
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const connectWallet = async () => {
    if (provider) {
      const response = await provider.connect()
      console.log('Connected with Public Key:', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  const renderNotConnectedContainer = () => (
    <button
      className="px-10 w-auto h-11 text-base font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg border-none cursor-pointer"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  )

  const renderConnectedContainer = () => (
    <div className="w-full">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-6 justify-center mx-4">
        {TEST_IMAGES.map((gif) => (
          <div
            className="flex relative flex-col justify-self-center self-center max-w-xs"
            key={gif}
          >
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col justify-center items-center px-8 min-h-screen text-white bg-gray-900">
      <h1 className="text-6xl font-bold">
        🎶 Blockchain russian rap leaderboard
      </h1>
      <h2 className="my-4 text-2xl">
        View your favorite albums in metaverse ✨
      </h2>
      {!walletAddress
        ? renderNotConnectedContainer()
        : renderConnectedContainer()}
    </div>
  )
}

export default App
