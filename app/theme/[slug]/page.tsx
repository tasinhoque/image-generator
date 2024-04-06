"use client";

import { themes } from "@/app/constants";
import { Button, Grid, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface Props {
  params: {
    slug: string;
  };
}

export default function Theme({ params }: Props) {
  const { slug } = params;

  const [shortPrompt, setShortPrompt] = useState("");
  const [fullPrompt, setFullPrompt] = useState("");

  const selectedImage = themes.find((theme) => theme.id === parseInt(slug));

  const handleGenerateFullDescription = () => {
    setFullPrompt("Generating...");
    fetch(`/api/akezh`, {
      method: "POST",
      body: JSON.stringify({ shortPrompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFullPrompt("Generated!");
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-10">
        Generate an image
      </h1>
      <Grid container spacing={12}>
        <Grid item xl={3} lg={3} md={3} sm={4} xs={4}>
          <div className="flex flex-col gap-[8px] items-center">
            <Image
              style={{ width: 300, objectFit: "cover" }}
              className="rounded-lg"
              width={300}
              height={150}
              src={selectedImage?.src ?? "/type1.webp"}
              alt="winter"
            />
            <p>{selectedImage?.title ?? "Landscape"}</p>
          </div>
        </Grid>
        <Grid item xl={9} lg={9} md={9} sm={8} xs={8}>
          <div className="flex flex-col gap-[24px] items-center padding-24">
            <p className="text-2xl font-bold">
              What kind of image you wanna generate?
            </p>

            <TextField
              sx={{ width: "500px" }}
              id="outlined-multiline-static"
              label="Short prompt"
              multiline
              rows={4}
              placeholder="Type here..."
              value={shortPrompt}
              onChange={(e) => setShortPrompt(e.target.value)}
            />

            <Button
              style={{ textTransform: "capitalize" }}
              variant="contained"
              color="primary"
              onClick={handleGenerateFullDescription}
            >
              Generate detailed prompt
            </Button>

            {fullPrompt && (
              <div
                style={{ width: 500, backgroundColor: "#cccccc", padding: 16 }}
              >
                {fullPrompt}
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
