import PostDetails from '../Components/PostDetails/PostDetails';
import './Page.css'
import { useParams } from 'react-router-dom'

export default function PostDetailsPage() {

  const { postId } = useParams();

  return (
    <div className='PostDetails Page'>
        <PostDetails postId={postId}/>
    </div>
  )
}