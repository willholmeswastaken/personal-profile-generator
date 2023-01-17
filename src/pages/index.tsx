import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import type { ChangeEvent } from "react";
import { useState } from "react";
import Link from "next/link";

const Home: NextPage = () => {
  const aiGenerationMutation = api.ai.generate.useMutation();
  const [profileContext, setProfileContext] = useState<string>('');

  const onGenerateProfile = (): void => {
    aiGenerationMutation.mutate(profileContext);
  }

  const onProfileContextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setProfileContext(e.target.value);

  return (
    <>
      <Head>
        <title>Personal Profile Generator</title>
        <meta name="description" content="Use AI to generate a personal profile about you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-[#23272a]">
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
          <header className="flex flex-row w-full pb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white pl-4 pt-4">
              PersonalProfileGenerator
            </h1>
          </header>
          <main className="flex flex-1 flex-col items-center justify-start">
            <div className="container flex flex-col items-center justify-center gap-y-4 px-4 py-16 ">
              <h1 className="sm:text-6xl text-5xl max-w-3xl font-bold text-white">
                Create a <span className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'>personal profile</span> about <span className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'>yourself</span> in <span className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'>seconds</span>
              </h1>
              <div className="flex flex-col gap-y-4 w-full pt-10 max-w-lg">
                <label className="text-xl text-white font-semibold" htmlFor="bioContext">Tell us a bit about yourself...</label>
                <textarea id="bioContext" value={profileContext} onChange={onProfileContextChange} className="focus:border-black focus:ring-black border border-slate-300 rounded-lg shadow-md w-full h-32 p-2" />
                <button type='button' onClick={onGenerateProfile} className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white shadow-md rounded-lg w-full h-10 flex flex-row items-center justify-center">
                  {
                    aiGenerationMutation.isLoading && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>)
                  }
                  Generate</button>
              </div>
              {
                aiGenerationMutation.isSuccess && (
                  <div className="border border-slate-300 rounded-md shadow max-w-lg w-full p-4 bg-white">
                    <p className="text-slate-800 text-md">{aiGenerationMutation.data}</p>
                  </div>
                )
              }
            </div>
          </main>
          <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3 text-white">
            <div>Powered by <Link href="https://openai.com/" target="_blank" rel="noreferrer" className="font-bold hover:underline transition underline-offset-2">OpenAI </Link>, Created by <Link href="https://willholmes.dev/" target="_blank" rel="noreferrer" className="font-bold hover:underline transition underline-offset-2">Will Holmes</Link>.</div>
            <div className="flex space-x-4 sm:pb-4">Inspired by&nbsp;<Link href="https://www.twitterbio.com/" target="_blank" rel="noreferrer" className="font-bold hover:underline transition underline-offset-2">TwitterBio</Link>.</div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
