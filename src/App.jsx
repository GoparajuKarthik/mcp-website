// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Header from './Header'
// import UserInfo from './UserInfo'
// import Content from './Content'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <div className='section'>
//       <Header/>
//       <UserInfo/>
//       <Content/>
//     </div>
//     </>
//   )
// }

// export default App


// UPDATE - 1

// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function App() {
//     const { caseNumber } = useParams();
//     const [caseData, setCaseData] = useState(null);

//     useEffect(() => {
//         axios.get(`http://localhost:5000/api/cases/${caseNumber}`)
//             .then(res => setCaseData(res.data))
//             .catch(err => console.error(err));
//     }, [caseNumber]);

//     if (!caseData) return <p>Loading...</p>;

//     return (
//         <div>
//             <h1>Case Details</h1>
//             <p><strong>Case Number:</strong> {caseData.caseNumber}</p>
//             <p><strong>Description:</strong> {caseData.description}</p>
//             <p><strong>Summary:</strong> {caseData.summary}</p>
//             <p><strong>Business Impact:</strong> {caseData.businessImpact}</p>
//             <p><strong>Version:</strong> {caseData.version}</p>
//             <p><strong>Team:</strong> {caseData.team}</p>
//             <p><strong>Engineer:</strong> {caseData.engineer}</p>
//         </div>
//     );
// }

// export default App;

// UPDATE - 2

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [cases, setCases] = useState([]);
    const [selectedCase, setSelectedCase] = useState(null);
    const [formData, setFormData] = useState({
        caseNumber: '',
        description: '',
        summary: '',
        businessImpact: '',
        version: '',
        team: '',
        engineer: ''
    });

    // Fetch all cases
    useEffect(() => {
        axios.get('http://localhost:5000/api/cases')
            .then(res => setCases(res.data))
            .catch(err => console.error(err));
    }, []);

    // Handle form input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit new case
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/cases', formData)
            .then(res => {
                setCases([...cases, res.data]);
                setFormData({
                    caseNumber: '',
                    description: '',
                    summary: '',
                    businessImpact: '',
                    version: '',
                    team: '',
                    engineer: ''
                });
            })
            .catch(err => console.error(err));
    };

    // Fetch case details
    const fetchCaseDetails = (caseNumber) => {
        axios.get(`http://localhost:5000/api/cases/${caseNumber}`)
            .then(res => setSelectedCase(res.data))
            .catch(err => console.error(err));
    };

    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            {/* Left Section */}
            <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
                <h3>Case IDs</h3>
                <ul>
                    {cases.map(c => (
                        <li key={c.caseNumber} style={{ cursor: 'pointer', color: 'blue' }}
                            onClick={() => fetchCaseDetails(c.caseNumber)}>
                            {c.caseNumber}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Section */}
            <div style={{ width: '70%', padding: '10px' }}>
                {selectedCase ? (
                    <div>
                        <h3>Case Details</h3>
                        <p><strong>Case Number:</strong> {selectedCase.caseNumber}</p>
                        <p><strong>Description:</strong> {selectedCase.description}</p>
                        <p><strong>Summary:</strong> {selectedCase.summary}</p>
                        <p><strong>Business Impact:</strong> {selectedCase.businessImpact}</p>
                        <p><strong>Version:</strong> {selectedCase.version}</p>
                        <p><strong>Team:</strong> {selectedCase.team}</p>
                        <p><strong>Engineer:</strong> {selectedCase.engineer}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h3>Add New Case</h3>
                        {Object.keys(formData).map(key => (
                            <div key={key}>
                                <input
                                    type="text"
                                    name={key}
                                    placeholder={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    style={{ margin: '5px', width: '90%' }}
                                />
                            </div>
                        ))}
                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default App;


