"use client"

import { useState } from "react";

export default function Home() {
  const [prompt , setPrompt] = useState("");
  const [n, setN] = useState(1);
  const [size, setSize] = useState('256x256');
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <main className="h-screen flex justify-center items-center">
      <section className="bg-zinc-950 rounded-md p-4">
        <form className="w-full flex mb-2"
          onSubmit={async (e) => {
            e.preventDefault()
            setLoading(true)
            console.log(prompt,n,size);

            try {
              const res = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({ prompt,n,size }),
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

          <input
            disabled={loading}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            type="text"
            placeholder="Write your N (number of image)"
            className="bg-zinc-900 flex-grow text-white px-3 py-2 my-2 rounded-tl-lg rounded-bl-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <select
            id="sizeInput"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            >
            <option value="256x256">256x256</option>
            <option value="512x512">512x512</option>
            <option value="1024x1024">1024x1024</option>
          </select>

          <button
            disabled={loading || prompt.length <= 2}
            className="bg-sky-900 text-white px-3 py-2 my-2 rounded-tr-lg rounded-br-lg  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(loading) ? "Generating" : "Generate image"}
          </button>
        </form>

        {loading && <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'red' }}>Loading...</div>}

        {
          image && (
            <img src={image} alt="Generated image" loading="lazy" className="rounded-sm" />
          )
        }
      </section>
    </main>
  )
}
