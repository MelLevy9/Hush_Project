import React, { useState } from 'react'
import { createGroup } from '../../services/groupService';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export default function CreateGroup() {
 

    const [group,setGroup] = useState({name: "write here", description: "write here"});
    const [isWriting, setIsWriting] = useState(false);
  
  
    const handleCreate = async () => {
      setIsWriting(true);
      const data = {
        name: group.name,
        description: group.description
      }
      try{
        const response = await createGroup(data);
        const createdGroup = response.data.created;
        setGroup(createdGroup);
        setIsWriting(false);
      } catch (error) {
        console.log('Error creating group:', error.message);
      }
      
    }
  
    const handleWritingToggle = () => {
      setIsWriting(!isWriting);
    };
  
    return (
        <div className='CreateGroup'>

             <ProtectedRoute allowedRoles={['admin']}>
                <div>
                {isWriting ? (
                    <button onClick={handleCreate}>Create Group</button>
                  ) : (
                    <button onClick={handleWritingToggle}>📝🪶<br/>Add a new group</button>
                  )}
                </div>
              </ProtectedRoute>
              {isWriting ? (
                  <div>
                    <label>Group Name:</label><br />
                    <textarea
                    className='titleInput'
                      type='text'
                      value={group.name}
                      onChange={(e) => setGroup({ ...group, name: e.target.value })}
                    />
                    <br /><br />
                    <label>Group Description:</label><br />
                    <textarea
                    className='contentInput'
                      type='text'
                      value={group.description}
                      onChange={(e) =>
                        setGroup({ ...group, description: e.target.value })
                      }
                    />
                    <br />
                  </div>
                  ) : (
                    <p></p>
                  )}

        </div>
    )
}
