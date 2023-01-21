import type { ReactNode } from 'react'
import Header from '../layouts/header/Header'
import Footer from '@/layouts/footer'
import Sidebar from '@/layouts/sidebar'
import NowPlaying from '@/layouts/nowPlaying'
import Player from '@/components/Player'
import dynamic from 'next/dynamic'
import { usePlayerState } from '@/lib/player'



//import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode
  children: ReactNode
  title?: string
  nested?: boolean
}

const Main = (props: IMainProps) => (
  <div className="w-full min-h-screen px-1 text-white antialiased relative">
    {props.meta}
    <Header title={props.title} nested={props?.nested} />

    <div className="relative  md:grid md:grid-cols-12  w-full gap-0">
      <Sidebar />
      <div className="md:p-2 md:col-span-10   overflow-scroll  mb-[150px] md:mb-[100px]  px-1 ">
        {props.children}
      </div>
    </div>
    <Player />
    <div className="z-40 fixed bottom-0 left-0 w-full">
      <Footer />
    </div>
  </div>
)

export { Main }
