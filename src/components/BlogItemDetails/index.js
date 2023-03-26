// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogItemDetails extends Component {
  state = {blog: [], isLoading: true}

  componentDidMount() {
    this.getBlogDetails()
  }

  getBlogDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const blog = response.json()
    const updatedData = {
      id: blog.id,
      title: blog.title,
      avatarUrl: blog.avatar_url,
      topic: blog.topic,
      author: blog.author,
      imageUrl: blog.image_url,
      content: blog.content,
    }
    this.setState(prev => ({blog: updatedData, isLoading: !prev.isLoading}))
  }

  renderBlogItemDetails = () => {
    const {blog} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blog

    return (
      <div className="blog-info">
        <h1 className="blog-details-title">{title}</h1>
        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={title} />
          <p className="details-author-name">{author}</p>
        </div>
        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="blog-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }

  //   render() {
  //     const {blog, isLoading} = this.state
  //     const {title, avatarUrl, author, imageUrl, content} = blog

  //     return (
  //       {
  //             isLoading ? (<Loader type="TailSpin" color="#00BFFF" height={50} width={50} />):return(
  //                 <div className="blog-info">
  //         <h2 className="blog-details-title">{title}</h2>
  //         <div className="author-details">
  //           <img className="author-pic" src={avatarUrl} alt={author} />
  //           <p className="details-author-name">{author}</p>
  //         </div>
  //         <img className="blog-image" src={imageUrl} alt={title} />
  //         <p className="blog-content">{content}</p>
  //       </div>
  //             )
  //         }
  //     )
  //   }
}

export default BlogItemDetails
