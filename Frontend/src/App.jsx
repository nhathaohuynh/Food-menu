import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import { path } from './utils/path'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={path.MAIN_LAYOUT} element={<Layout />}>
					<Route index element={<Home />}></Route>
				</Route>

				<Route path={path.LOGIN}>
					<Route index element={<Login />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
