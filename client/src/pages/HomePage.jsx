import './Page.css'
import AllPosts from '../Components/AllPosts/AllPosts';

export default function PostsPage() {
  return (
    <div className='Posts Page'>
        <div className='pageTitle homeTitle'>Welcome To Hush</div>
        <AllPosts/>
    </div>
  )
}
