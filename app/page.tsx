"use client"

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <main className="h-screen flex justify-center items-center">
      <section className="bg-zinc-950 rounded-md p-4">
        <form className="w-full flex mb-2"
          onSubmit={async (e) => {
            e.preventDefault()
            setLoading(true)
            console.log(prompt);

            try {
              const res = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({ prompt }),
                headers: {
                  "Content-Type": "application/json"
                }
              })
              const data = await res.json()
              setImage(data.url)
            } catch (error) {
              console.log(error);
            }
            setLoading(false)
            setPrompt("")
          }}>
          <input
            disabled={loading}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Write your prompt"
            className="bg-zinc-900 flex-grow text-white px-3 py-2 my-2 rounded-tl-lg rounded-bl-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            disabled={loading || prompt.length <= 2}
            className="bg-sky-900 text-white px-3 py-2 my-2 rounded-tr-lg rounded-br-lg  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(loading) ? "Generating" : "Generate image"}
          </button>
        </form>

        {
          image && (
            <img src={image} alt="Generated image" loading="lazy" className="rounded-sm" />
          )
        }
      </section>
    </main>
  )
}
