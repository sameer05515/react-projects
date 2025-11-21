import React, { useState } from 'react';
import ViewSwitcher from '../../../common/components/view-switcher/ViewSwitcher';

const ListView = ({ students }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">List View</h2>
      <ul className="list-disc list-inside space-y-2">
        {students.map(student => (
          <li key={student.id} className="text-gray-700">{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

const CardView = ({ students }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Card View</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map(student => (
          <div key={student.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">{student.name}</h3>
            <p className="text-gray-600">{student.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const TableView = ({ students }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Table View</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="p-3 text-left font-semibold text-gray-700">Name</th>
            <th className="p-3 text-left font-semibold text-gray-700">Address</th>
            <th className="p-3 text-left font-semibold text-gray-700">Age</th>
            <th className="p-3 text-left font-semibold text-gray-700">Major Subject</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="p-3 text-gray-700">{student.name}</td>
              <td className="p-3 text-gray-600">{student.address}</td>
              <td className="p-3 text-gray-700">{student.age}</td>
              <td className="p-3 text-gray-700">{student.major}</td>
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
