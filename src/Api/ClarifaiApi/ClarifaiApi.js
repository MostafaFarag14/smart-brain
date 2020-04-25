import clarifai from 'clarifai'
const ApiKey = 'cca7108705bd4aa4bab80f82294a8739'
const modelId = 'a403429f2ddf4b49b307e318f00e528b'
const app = new clarifai.App({
  apiKey: ApiKey
})

const detect_faces = (imageUrl) => {
  return app.models.predict(clarifai.FACE_DETECT_MODEL, imageUrl)
}

const detect_celebrity = (imageUrl) => {
  return app.models.predict(clarifai.CELEBRITY_MODEL, imageUrl)
}
export default detect_faces