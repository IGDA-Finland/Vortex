import Header from '../components/Header'
import { Button } from '../components/Button'
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi"

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grid grid-rows-2 grid-cols-1 py-12 xl:grid-rows-1 xl:grid-cols-5 xl:py-0 xl:h-screen xl:gap-24">
        <section className="xl:col-span-2 flex flex-col justify-center p-8">
          <p className="text-2xl mb-4 mx-2">Finland</p>
          <h1 className="title title-font">Game <br /> Industry</h1>
          <p className="mt-2 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor eros ut luctus dictum. Sed non nisl porttitor, mollis orci a, sagittis tellus.</p>
          <section className="mt-8">
            <Button content="Become a member" pill={true} className="text-lg px-8 border-2 border-slate-400 text-slate-600" />
          </section>
        </section>
        <section className="xl:col-span-3 flex flex-col justify-center">
          <section className="flex flex-col">
            <section className="grid grid-flow-col auto-cols-max overflow-x-auto gap-8 pr-8 no-scrollbar">
              <article className="bg-black h-96 w-64 rounded-xl shadow-2xl flex flex-col justify-end">
                <h3 className="title-font text-gray-100 p-4 text-4xl">IGDA Finland</h3>
              </article>
              <article className="bg-black h-96 w-64 rounded-xl shadow-2xl"></article>
              <article className="bg-black h-96 w-64 rounded-xl shadow-2xl"></article>
              <article className="bg-black h-96 w-64 rounded-xl shadow-2xl"></article>
              <article className="bg-black h-96 w-64 rounded-xl shadow-2xl"></article>
              <article className="bg-black h-96 w-64 rounded-xl shadow-2xl"></article>
            </section>
            <section className="flex items-center mt-12">
              <section className="grid grid-cols-2 gap-3">
                <Button icon={<FiChevronLeft size={36} />} pill={true} className="text-lg border-2 border-slate-400 text-slate-600" />
                <Button icon={<FiChevronRight size={36} />} pill={true} className="text-lg border-2 border-slate-400 text-slate-600" />
              </section>
              <section className="px-8 flex-grow">
                <label htmlFor="orgSearch" className="flex items-center border-b border-slate-400 py-2">
                  <FiSearch size={36} className="mr-4 text-slate-500" />
                  <input type="text" placeholder="Seach" id="orgSearch" className="text-3xl w-full outline-none" />
                </label>
              </section>
            </section>
          </section>
        </section>
      </main>
    </div>
  )
}

export default Home;