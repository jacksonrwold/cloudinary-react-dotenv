import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

export default class PhotoReturn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gallery: []
        }
    }

    componentDidMount() {
        axios.get(`http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/list/react-test.json`)
            .then(res => {
                console.log(res.data.resources);
                this.setState({gallery: res.data.resources});
            })
    }

  render() {
    return (
      <div className='app'>
        <h1>DevCamp React Starter</h1>
        <h2>React Redux Router</h2>
        <CloudinaryContext cloudName="dpvu70dcx">
            {
                this.state.gallery.map(data => {
                    return (
                        <div className="responsive" key={data.public_id}>
                            <div className="img">
                                <a target="_blank" href={`https://res.cloudinary.com/dpvu70dcx/image/upload/${data.public_id}.jpg`}>
                                    <Image publicId={data.public_id}>
                                        <Transformation
                                            crop="scale"
                                            width="300"
                                            height="200"
                                            dpr="auto"
                                            responsive_placeholder="blank"
                                        />
                                    </Image>
                                </a>
                                <div className="desc">Created at {data.created_at}</div>
                            </div>
                        </div>
                    )
                })
            }
        </CloudinaryContext>
      </div>
    );
  }
}
