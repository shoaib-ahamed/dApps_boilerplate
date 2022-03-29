import Head from 'next/head'
import { useMoralis } from 'react-moralis'
import { Footer, Navbar, Services, Welcome } from '../components'


export default function Home() {

  const {isAuthenticated} = useMoralis()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen"> 
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
      <Services/>
      <Footer/>
    </div>     

    </div>
  )
}
