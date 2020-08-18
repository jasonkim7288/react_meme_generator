import React, { useState, useEffect, Fragment } from 'react'
import { Meme } from './components/meme'
import axios from 'axios'
import {v4 as uuid} from 'uuid'

const objectToQueryParam = (obj) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
  return '?' + params.join("&")
}

function App() {
  const [templates, setTemplates] = useState([])
  const [template, setTemplate] = useState(null)
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [meme, setMeme] = useState(null)

  useEffect(() => {
    axios.get('https://api.imgflip.com/get_memes')
      .then(res => {
        console.log('res:', res)
        setTemplates(res.data.data.memes)
      })
  }, [])

  if (meme) {
    return (
      <div className="text-center">
        <h1>Generated Meme</h1>
        <img
          className="p-5"
          style={{maxWidth:"900px", width:"100%"}}
          src={meme}
          alt="custom meme"/>
        <h3><a href="/">Go home</a></h3>
      </div>
    )
  }

  return (
    <div className="text-center">
      {
        template &&
        <form className="container" onSubmit={e => {
          e.preventDefault()
          const params = {
            template_id: template.id,
            text0: topText,
            text1: bottomText,
            username: process.env.REACT_APP_IMGFLIP_USERNAME,
            password: process.env.REACT_APP_IMGFLIP_PASSWORD
          }
          axios.get(`https://api.imgflip.com/caption_image${objectToQueryParam(params)}`)
            .then(res => {
              console.log('res:', res)
              setMeme(res.data.data.url)
            })
        }}>
          <h1>Generate a meme</h1>
          <div className="row">
            <Meme className="col-12 col-sm-6" template={template} picWidth={"300px"} />
            <div className="col-12 col-sm-6 p-5">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="top text"
                  value={topText}
                  onChange={e => setTopText(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="bottom text"
                  value={bottomText}
                  onChange={e => setBottomText(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">Create Meme</button>
              </div>
            </div>
          </div>
          <h3><a href="/">Go home</a></h3>
        </form>

      }
      {
        !template && (
          <Fragment>
            <h1>Meme Generator</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
            {
              templates.map(template => {
                return (
                  <Meme
                    key={uuid()}
                    template={template}
                    onClick={(e) => {
                      e.preventDefault()
                      setTemplate(template)
                    }}
                    picWidth={"100%"}
                  />
                )
              })
            }
            </div>
          </Fragment>
        )
      }
    </div>
  )
}

export default App
