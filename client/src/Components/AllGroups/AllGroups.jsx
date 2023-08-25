import './AllGroups.css'
import React, { useEffect, useState } from 'react'
import { getAllGroups } from '../../services/groupService';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function AllGroups() {

  const [groups,setGroups] = useState(null);

  useEffect(() => {
    const fetchAllGroups = async () => {
      const response = await getAllGroups();
      const groupsArray = response.data;
      setGroups(groupsArray);
    };
    fetchAllGroups();
  },[])

  return (
    <div className='AllGroups'>
      {
        !groups
        ? 'Loading groups, Please wait ...'
        : <React.Fragment>
            <DropdownButton id="dropdown-basic-button" title="All Groups" size="sm">
              {
                groups.map((group) => (
                    <Dropdown.Item key={group._id} className="dropdownItem" href={`/groups/${group._id}`}>{group.name}</Dropdown.Item>
                ))
              }
            </DropdownButton>
          </React.Fragment>
      }
    </div>
  )
}
/*
<DropdownButton id="dropdown-basic-button" title="Dropdown" size="sm">
              <Dropdown.Item className="dropdownItem" href="/groups">one</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" href="/groups">two</Dropdown.Item>
              <Dropdown.Item className="dropdownItem" href="/groups">three</Dropdown.Item>
            </DropdownButton>
*/
