import React from 'react';
import { Table, Button } from 'react-bootstrap';

const SkillsList = props => {
  return ( 
  <div className="shadow">
    <Table responsive striped>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Category</th>
          <th>Available</th>
          <th><Button onClick={props.addSkill}><i class="fas fa-plus"></i> New</Button></th>
        </tr>
      </thead>
      <tbody>
      {props.userSkills.map(skill => {
        return (
          <tr key={skill.id}>
            <td>{skill.name}</td>
            <td>{skill.Category.name}</td>
            <td>{skill.active ? "Yes" : "No"}</td>
            <td>
              <Button onClick={()=>props.editSkill(skill)}><i class="fas fa-pen"></i> Edit</Button>
            </td>
          </tr>
        );
      })}      
      </tbody>
    </Table>
  </div>
  );
}
 
export default SkillsList;