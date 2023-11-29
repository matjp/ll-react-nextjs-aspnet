import { league_spartan } from '@/fonts'
import Link from 'next/link'

export default function NavBar() {
	return (
		<>
			<div className={`${league_spartan.className} flex bg-gray-700 justify-around uppercase text-white text-xl text-shadow text-right`}>
				<p className="flex p-8">
					LENDING LIBRARY
				</p>
				<nav className="flex self-center p-8">
					<ul className="flex">
						<li className="px-4 no-underline hover:underline hover:decoration-4"><Link href="/">HOME</Link></li>
						<li>•</li>
						<li className="px-4 no-underline hover:underline hover:decoration-4"><Link href="/mybooks">MY BOOKS</Link></li>
						<li>•</li>
						<li className="px-4 no-underline hover:underline hover:decoration-4"><Link href="/about">ABOUT</Link></li>
					</ul>
				</nav>
			</div>  
		</>
	)
}
