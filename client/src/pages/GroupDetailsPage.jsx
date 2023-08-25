import GroupDetails from '../Components/GroupDetails/GroupDetails';
import './Page.css'
import { useParams } from 'react-router-dom'

export default function GroupDetailsPage() {

  const { groupId } = useParams();

  return (
    <div className='GroupDetails Page'>
        <GroupDetails groupId={groupId}/>
    </div>
  )
}