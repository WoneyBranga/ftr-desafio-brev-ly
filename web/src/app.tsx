import logo from './assets/logo-brev-ly.svg'
import { LinkIcon, DownloadSimpleIcon } from '@phosphor-icons/react'
export function App() {

  return (

    <main className="h-dvh flex flex-col items-center justify-center p-2 bg-gray-200 ">

      <div>

        <div>
          <img className="w-24 h-[96.67px]" src={`${logo}`} />
        </div>

        <div className='flex items-start gap-6'>

          <div className="bg-white flex flex-col justify-start p-6 rounded-md h-[340px] w-[380px]">

            <div className="text-lg my-4">Novo Link</div>

            <label className="text-gray-500 text-xs my-2" htmlFor="">LINK ORIGINAL</label>
            <input className="text-md  p-4 outline-2 rounded-lg w-full outline-gray-200  text-gray-600" value="www.google.com" type="text" />
            <label className="text-gray-500 text-xs my-2" htmlFor="">LINK ENCURTADO</label>
            <input className="text-md  p-4 outline-2 rounded-lg w-full outline-gray-200  text-gray-600" value="brev.ly/a76ffsd76" type="text" />

            <div className='my-4 p-4 bg-blue-dark rounded-lg text-white text-center opacity-40'>Salvar link</div>

          </div>


          <div className="bg-white flex flex-col justify-center p-4 rounded-md h-[234px] w-[580px]">

            <div className='flex flex-row items-center justify-between m-4'>

              <div className="text-lg">Meus Links</div>

              <div className='flex flex-row items-center justify-center bg-gray-100 p-2 rounded text-gray-300 text-md'>
                <div>
                  <DownloadSimpleIcon />
                </div>
                <div>Baixar CSV</div>
              </div>

            </div>

            <hr className='border-gray-200' />

            <div className='flex flex-col items-center justify-center m-6'>
              <LinkIcon className='text-gray-400 h-8 w-8' />
              <div className='text-sm text-gray-400'>AINDA NÃO EXISTEM LINKS CADASTRADOS</div>
            </div>
          </div>


        </div>

      </div>
    </main>

  )
}

export default App
