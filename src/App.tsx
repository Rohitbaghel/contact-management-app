import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from "./components/Navbar";
import ContactList from "./pages/ContactList";
import ContactDetails from "./pages/ContactDetails";
import EditContact from "./pages/EditContact";
import MapAndChart from "./pages/MapAndChart";
import CreateContactForm from "./components/CreateContactForm";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className='flex flex-col lg:flex-row min-h-screen bg-gray-100'>
            <Navbar />
            <main className='flex-grow lg:ml-64 p-4 lg:p-8 mt-16 lg:mt-0'>
              <Routes>
                <Route path='/' element={<ContactList />} />
                <Route path='/create-contact' element={<CreateContactForm />} />
                <Route path='/contact/:id' element={<ContactDetails />} />
                <Route path='/edit-contact/:id' element={<EditContact />} />
                <Route path='/map-and-chart' element={<MapAndChart />} />
              </Routes>
            </main>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;