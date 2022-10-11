import { AppBar, MenuItem, Select, Toolbar, useTheme } from '@material-ui/core';
import { Fragment, useEffect, useRef, useState } from 'react';
import './App.css';
import Axios from 'axios'

const callImage = async () => {
  const result = await Axios.get(
    "https://jsonplaceholder.typicode.com/photos")
  return result?.data ?? []
}
const useImages = () => {
  const [images, setImages] = useState()
  useEffect(() => {
    callImage().then(images => {
      setImages(images.slice(0, 20))
    })
  }, [])

  return images
}

const App = () => {
  // access theme
  const { palette } = useTheme()
  const { primary, secondary } = palette

  const [title, setTitle] = useState("My Head")
  //assign color dari theme
  const [color, setColor] = useState(primary.main)

  const date = new Date()
  const dateRef = useRef(date)

  if (title === "Redirect") dateRef.current = date

  // retrive images
  const images = useImages()
  const [selectedImage, setSelectedImage] = useState()

  return (
    <div className="App">
      <Header title={title} color={color} sticky={true}
        counter={100} />
      {date.toISOString()}
      <br />
      {dateRef.current.toISOString()}
      <br />
      <button onClick={e => { setTitle("Redirect") }}>change title</button>
      <button onClick={e => { setColor(secondary.main) }}>change color</button>
      <br />
      {selectedImage ?
        <img src={selectedImage?.thumbnailUrl} alt="ppp"/> : ""}
      <br />
      <Select
        displayEmpty
        value={selectedImage?.id ?? ""}
        onChange={e => {
          const value = e.target.value
          const image = images?.find(({ id }) => id === value)
          setSelectedImage(image)
        }}>
        {
          images?.map(({ id, title }) =>
            <MenuItem key={id} value={id}>{title}</MenuItem>)
        }
      </Select>
    </div>
  )
}


const Header = (props) => {
  const { title, color = "#000000" } = props
  const style = {
    backgroundColor: color,
  }
  return (
    <>
      <AppBar>
        <Toolbar style={style}>
          {title}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}

export default App;
