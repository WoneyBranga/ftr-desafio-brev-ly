import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Redirect } from './pages/redirect'
import { InvalidLink } from './pages/invalid-link'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shortCode" element={<Redirect />} />
        <Route path="/invalid-link" element={<InvalidLink />} />
      </Routes>
    </BrowserRouter>
  )
}
