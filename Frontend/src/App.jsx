import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

import { Toaster } from 'react-hot-toast'
import Chef from './pages/Chef'
import Manager from './pages/Manager'
import { path } from './utils/path'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path={path.ROOT} element={<Home />}></Route>
					<Route path='/chef' element={<Chef />}></Route>
					<Route path='/manager' element={<Manager />}></Route>
				</Routes>
			</BrowserRouter>
			<Toaster />
		</>
	)
}

export default App
