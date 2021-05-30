import React, { useEffect, useState } from 'react'

const url = "https://api.cloudinary.com/v1_1/demo/image/upload";


export default function ImageUploader({ onFileSubmit, setLoading }) {
  const [image, setImage] = useState(null)
  const [imageURl, setImageURL] = useState(null)
  const handleImageInput = e => {
    setImage(e.target.files[0])
  }

  useEffect(() => {
    if (image) {
      setLoading(true)
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "docs_upload_example_us_preset");
      fetch(url,
        {
          method: 'POST',
          body: formData
        })
        .then(resp => resp.json())
        .then(data => {
          setImageURL(data.url)
        })
    }
  }, [image])

  useEffect(() => {
    if (image) {
      onFileSubmit(imageURl)
    }
  }, [imageURl])

  return (
    <div>
      <input type='file' onChange={handleImageInput}/>
    </div>
  )
}
