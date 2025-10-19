import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./App.css"; 

const Dashboard = React.lazy(() => import('./pages/dashboard/dashboard'));
const Languages = React.lazy(() => import('./pages/languages/languages'));
const Artifacts = React.lazy(() => import('./pages/artifacts/artifacts'));
const LanguageDetail = React.lazy(() => import('./pages/languages/language_detail'));
const Handsets = React.lazy(() => import('./pages/handsets/handsets'));
const NotFound = React.lazy(() => import('./pages/not-found/not-found'));

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/languages" element={<Languages />}/>
                <Route path="/artifacts" element={<Artifacts />}/>
                <Route path="/languages/:id" element={<LanguageDetail />} />
                <Route path='/handsets' element={<Handsets />} />
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
