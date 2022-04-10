import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { OpacityTextRow } from '../components/OpacityTextRow'
import Header from '../components/Header'
import HomeBackground from '../components/HomeBackground'
import { Menu } from '../components/Menu'
import Navbar, { navbarLinks } from '../components/Navbar'
import Title from '../components/Title'
import useWindowSize from '../hooks/useWindowSize'
import ExperienceContent, { experiences } from '../components/ExperienceContent'
import Loading from '../components/Loading'
// @ts-ignore
import { Element } from 'react-scroll'

const Home: NextPage = () => {
  const [offset, setOffset] = useState(0)
  const { windowSize } = useWindowSize()
  const windowHeight = windowSize.height

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)

    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-black">
      <Loading/>
      <Menu/>
      <Header>
        <Navbar/>
      </Header>
      <HomeBackground/>
      <div>
        <Element name={navbarLinks.about.id} className="relative h-screen bg-gradient-to-b from-[#130605] via-[#000] to-[#000] text-white">
          <Title value="About"/>
          <div className={`px-10 ${windowHeight * 0.6 < offset ? 'opacity-100' : 'opacity-0'} transition-opacity ease-linear`}>
            <div className="text-xl mt-14 text-center leading-[50px]">
              <p>前端工程師</p>
              <p>在校就學時一年開發經驗</p>
              <p>實習時一年及四個以上大型專案合作開發經驗</p>
              <p>擅長使用 React</p>
              <p>不斷追逐著 Clean Code</p>
            </div>
            <div className="text-neutral-200 mt-14 text-center text-xl font-black ">
              <div className="mb-3">&ldquo; TypeScript / React / React Native / Redux / Next &rdquo; <br/></div>
              <div> &ldquo; styled-component / Tailwind CSS / Material UI &rdquo;</div>
            </div>
          </div>
          <OpacityTextRow count={6}>ABOUT</OpacityTextRow>
        </Element>
        <Element name={navbarLinks.experience.id} className="relative min-h-screen text-white">
          <Title value="Experience"/>
          {experiences.map((item, index) => (
            <ExperienceContent
              key={index}
              title={item.title}
              subTitle={item.subTitle}
              date={item.date}
              even={Boolean(index % 2)}
              index={index}
            >
              <span className="list-disc tracking-widest">
                {item.contents.map((content, index) =>
                  <p key={index}>{content}</p>
                )}
              </span>
            </ExperienceContent>
          ))}
        </Element>
      </div>
      <footer className="-translate-y-[50px] relative h-[500px] text-white">
        <OpacityTextRow count={6}>CLEAN</OpacityTextRow>
      </footer>
    </div>

  )
}

export default Home
