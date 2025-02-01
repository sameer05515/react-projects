import React, { useState } from 'react';
import ViewSwitcher from '../../../common/components/view-switcher/ViewSwitcher';

const ListView = ({ students }) => {
  return (
    <div>
      <h2>List View</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

const CardView = ({ students }) => {
  return (
    <div>
      <h2>Card View</h2>
      {students.map(student => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <p>{student.address}</p>
        </div>
      ))}
    </div>
  );
};

const TableView = ({ students }) => {
  return (
    <div>
      <h2>Table View</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Age</th>
            <th>Major Subject</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.address}</td>
              <td>{student.age}</td>
              <td>{student.major}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// const StudentList = ({ students }) => {
//   const [view, setView] = useState('list');
//   return (
//     <div>
//       <div>
//         <label>
//           <input
//             type="radio"
//             value="list"
//             checked={view === 'list'}
//             onChange={() => setView('list')}
//           />
//           List View
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="card"
//             checked={view === 'card'}
//             onChange={() => setView('card')}
//           />
//           Card View
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="table"
//             checked={view === 'table'}
//             onChange={() => setView('table')}
//           />
//           Table View
//         </label>
//       </div>
//       {view === 'list' && <ListView students={students}/>}
//       {view === 'card' && <CardView students={students}/>}
//       {view === 'table' && <TableView students={students}/>}
//     </div>
//   );
// };

const StudentList = ({ students }) => {
  const [selectedView, setSelectedView] = useState('list');

  const handleChangeView = event => {
    setSelectedView(event.target.value);
  };

  return (
    <div>
      <ViewSwitcher
        viewList={[
          { viewName: 'list', viewLabel: 'List View' },
          { viewName: 'card', viewLabel: 'Card View' },
          { viewName: 'table', viewLabel: 'Table View' }
        ]}
        onChange={handleChangeView}
        selectedView={selectedView}
      />
      {/* {selectedView === 'list' && renderListView()}
      {selectedView === 'card' && renderCardView()}
      {selectedView === 'table' && renderTableView()} */}
      {selectedView === 'list' && <ListView students={students} />}
      {selectedView === 'card' && <CardView students={students} />}
      {selectedView === 'table' && <TableView students={students} />}
    </div>
  )

};

export default StudentList;
