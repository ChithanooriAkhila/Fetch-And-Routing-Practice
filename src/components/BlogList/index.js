// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import BlogItem from '../BlogItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogList extends Component {
  state = {blogData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsList()
  }

  getBlogsList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedData = data.map(blog => ({
      id: blog.id,
      title: blog.title,
      avatarUrl: blog.avatar_url,
      topic: blog.topic,
      author: blog.author,
      imageUrl: blog.image_url,
    }))

    this.setState(prev => ({blogData: updatedData, isLoading: !prev.isLoading}))
  }

  render() {
    const {blogData, isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul>
            {blogData.map(blog => (
              <BlogItem blogDetails={blog} key={blog.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogList
