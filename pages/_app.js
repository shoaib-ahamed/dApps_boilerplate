import { MoralisProvider } from 'react-moralis'
import 'tailwindcss/tailwind.css'
import { DataProvider } from '../store/GlobalState'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <MoralisProvider 
    appId="3Fb7oTtT1Cpxr9hpz3sbQwpyaZ9Cl0jtLZ7YNrfU"
    serverUrl= "https://1nrurymyv2by.usemoralis.com:2053/server"
    >
        <Component {...pageProps} />
      </MoralisProvider>
    </DataProvider>
  )
}

export default MyApp
