import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
// import Homepage from './pages/Homepage'
import BlogListView from './pages/BlogListView'
import ProtectedRoute from './components/ProtectedRoute'
import BlogDetailView from './pages/BlogDetailView'
import CreateBlogPage from './pages/CreateBlogPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<BlogListView />} />
        <Route path='/create' element={
          <ProtectedRoute>
            <CreateBlogPage />
          </ProtectedRoute>
        } />
        <Route path='/blog/:blogId/' element={<BlogDetailView />} />
      </Routes>
    </BrowserRouter>
  )
}
