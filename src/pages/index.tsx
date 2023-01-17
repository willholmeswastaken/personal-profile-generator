import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import type { ChangeEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const Home: NextPage = () => {
  const aiGenerationMutation = api.ai.generate.useMutation();
  const [profileContext, setProfileContext] = useState<string>('');
  const onCopyToClipboard = (): void => {
    navigator.clipboard.writeText(aiGenerationMutation.data!)
      .then(() => toast.success('Profile copied to clipboard!'))
      .catch((err) => console.error(err));
  }

  const onGenerateProfile = (): void => {
    aiGenerationMutation.mutate(profileContext);
  }

  const onProfileContextChange = (e: ChangeEvent<HTMLTextAreaElement>) => setProfileContext(e.target.value);

  return (
    <>
      <Head>
        <title>AI Personal Profile Generator</title>
        <meta name="description" content="Use AI to generate a personal profile about you" />
        <meta property="og:title" content="AI Personal Profile Generator" />
        <meta property="og:image" content="https://og-image.vercel.app/**AI%20Personal%20Profile%20Generator**.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fhyper-bw-logo.svg" />
        <meta property="og:url" content="https://personal-profile-generator.vercel.app/" />
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
                <button type='button' disabled={aiGenerationMutation.isLoading} onClick={onGenerateProfile} className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white shadow-md rounded-lg w-full h-12 flex flex-row items-center justify-center">
                  {
                    aiGenerationMutation.isLoading && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>)
                  }
                  Generate</button>
              </div>
              {
                aiGenerationMutation.isSuccess && (
                  <div className="flex flex-col gap-y-4 border border-slate-300 rounded-md shadow max-w-lg w-full p-4 bg-white">
                    <p className="text-slate-800 text-md">{aiGenerationMutation.data}</p>
                    <button type='button' onClick={onCopyToClipboard} className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-90 text-white rounded-lg w-full h-10 flex flex-row items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                      </svg>

                      Copy to Clipboard
                    </button>
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
